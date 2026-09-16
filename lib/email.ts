import https from "node:https";

export interface ContactEmailPayload {
  name?: string;
  email?: string;
  company?: string;
  collaborationType?: string;
  message?: string;
  timestamp?: string;
  referrer?: string;
  userAgent?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
}

/**
 * Sends an email notification to the site owner when a new collaboration inquiry is submitted.
 * Uses the Resend REST API via Node HTTPS.
 */
export async function sendContactEmailNotification(
  payload: ContactEmailPayload
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipientEmail =
    process.env.NOTIFICATION_EMAIL_TO?.trim() || "isnan.rizqikurniawan@gmail.com";
  const fromEmail =
    process.env.NOTIFICATION_EMAIL_FROM?.trim() || "Portfolio Notification <onboarding@resend.dev>";

  console.log("[Email Notification] Starting dispatch check...", {
    hasApiKey: Boolean(apiKey),
    apiKeyPrefix: apiKey ? apiKey.substring(0, 6) + "..." : "none",
    to: recipientEmail,
    from: fromEmail,
    senderName: payload.name,
  });

  // If no API key is provided, log gracefully and skip without throwing
  if (!apiKey || apiKey.startsWith("re_your_") || apiKey === "") {
    console.warn(
      "[Email Notification Skipped] RESEND_API_KEY is not set or placeholder in environment. Submission details:",
      {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        collaborationType: payload.collaborationType,
      }
    );
    return {
      success: false,
      skipped: true,
      error: "RESEND_API_KEY not configured",
    };
  }

  const senderName = payload.name || "Anonymous Visitor";
  const senderEmail = payload.email || "No email provided";
  const company = payload.company || "Not specified";
  const collaborationType = payload.collaborationType || "General Collaboration";
  const message = payload.message || "No message provided";
  const timeString = payload.timestamp
    ? new Date(payload.timestamp).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "short",
      }) + " (WIB)"
    : new Date().toLocaleString();

  const subject = `🚀 New Inquiry: ${senderName} (${collaborationType})`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; color: #ffffff; text-align: left; }
    .badge { display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
    .title { font-size: 20px; font-weight: 800; margin: 0; line-height: 1.3; }
    .subtitle { font-size: 13px; color: #94a3b8; margin-top: 6px; }
    .body-content { padding: 28px; }
    .meta-grid { display: table; width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .meta-row { display: table-row; }
    .meta-label { display: table-cell; padding: 8px 12px 8px 0; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.03em; width: 30%; border-bottom: 1px solid #f4f4f5; }
    .meta-value { display: table-cell; padding: 8px 0; font-size: 14px; font-weight: 500; color: #18181b; border-bottom: 1px solid #f4f4f5; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
    .reply-btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; margin-top: 12px; }
    .footer { padding: 20px 28px; background-color: #fafafa; border-top: 1px solid #e4e4e7; font-size: 11px; color: #a1a1aa; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Portfolio Contact Form</div>
      <h1 class="title">New Collaboration Message</h1>
      <div class="subtitle">Received via your portfolio website</div>
    </div>
    <div class="body-content">
      <table class="meta-grid">
        <tr class="meta-row">
          <td class="meta-label">Sender Name</td>
          <td class="meta-value"><strong>${escapeHtml(senderName)}</strong></td>
        </tr>
        <tr class="meta-row">
          <td class="meta-label">Email Address</td>
          <td class="meta-value"><a href="mailto:${escapeHtml(senderEmail)}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${escapeHtml(senderEmail)}</a></td>
        </tr>
        <tr class="meta-row">
          <td class="meta-label">Company / Org</td>
          <td class="meta-value">${escapeHtml(company)}</td>
        </tr>
        <tr class="meta-row">
          <td class="meta-label">Topic / Type</td>
          <td class="meta-value"><span style="background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 12px;">${escapeHtml(collaborationType)}</span></td>
        </tr>
        <tr class="meta-row">
          <td class="meta-label">Received At</td>
          <td class="meta-value">${escapeHtml(timeString)}</td>
        </tr>
      </table>

      <div style="font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.03em; margin-top: 20px;">
        Message Content
      </div>
      <div class="message-box">
${escapeHtml(message)}
      </div>

      ${
        payload.email
          ? `<div style="text-align: center; margin-top: 28px;">
               <a href="mailto:${escapeHtml(senderEmail)}?subject=Re:%20Collaboration%20Inquiry%20-%20${encodeURIComponent(collaborationType)}" class="reply-btn">
                 Reply to ${escapeHtml(senderName)} &rarr;
               </a>
             </div>`
          : ""
      }
    </div>
    <div class="footer">
      <strong>Referrer:</strong> ${escapeHtml(payload.referrer || "Direct")}<br>
      <strong>User Agent:</strong> ${escapeHtml(payload.userAgent || "Unknown")}<br>
      <em>Tip: You can hit "Reply" in your email client to directly reply to ${escapeHtml(senderEmail)}.</em>
    </div>
  </div>
</body>
</html>
`;

  const textContent = `New Collaboration Message from Portfolio:

Sender: ${senderName}
Email: ${senderEmail}
Company: ${company}
Type: ${collaborationType}
Time: ${timeString}

Message:
${message}

---
Referrer: ${payload.referrer || "Direct"}
User Agent: ${payload.userAgent || "Unknown"}
`;

  try {
    const postData = JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: payload.email || undefined,
      subject,
      html,
      text: textContent,
    });

    const sendPromise = new Promise<SendEmailResult>((resolve) => {
      const req = https.request(
        {
          hostname: "api.resend.com",
          port: 443,
          path: "/emails",
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
          },
          timeout: 10000,
        },
        (res) => {
          let responseBody = "";
          res.on("data", (chunk) => {
            responseBody += chunk;
          });
          res.on("end", () => {
            try {
              const data = JSON.parse(responseBody);
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                console.log("[Email Notification Success] Dispatched to Resend! ID:", data.id);
                resolve({ success: true, id: data.id });
              } else {
                console.warn("[Email Notification Error] Resend API error:", data);
                resolve({
                  success: false,
                  error: data.message || `HTTP ${res.statusCode}`,
                });
              }
            } catch {
              console.warn("[Email Notification Error] Non-JSON response:", responseBody);
              resolve({
                success: Boolean(res.statusCode && res.statusCode >= 200 && res.statusCode < 300),
                error: `HTTP ${res.statusCode}`,
              });
            }
          });
        }
      );

      req.on("error", (err) => {
        console.warn("[Email Notification Error] Network error dispatching email:", err?.message || err);
        resolve({ success: false, error: err?.message || "Network error" });
      });

      req.on("timeout", () => {
        req.destroy();
        console.warn("[Email Notification Error] Request timeout");
        resolve({ success: false, error: "Request timeout" });
      });

      req.write(postData);
      req.end();
    });

    return await sendPromise;
  } catch (err: any) {
    console.warn("[Resend Notice] Unexpected error in email dispatch:", err?.message || err);
    return {
      success: false,
      error: err?.message || "Unexpected error",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
