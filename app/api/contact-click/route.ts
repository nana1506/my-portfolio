import { NextRequest, NextResponse } from "next/server";
import { logContactClick } from "@/lib/notion";

const CONTACT_EMAIL = "isnan.rizqikurniawan@gmail.com";
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=Analytics%20Opportunity%20/%20Inquiry`;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const referrer = request.headers.get("referer") || "direct";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  try {
    await logContactClick({
      timestamp,
      referrer,
      userAgent,
    });
  } catch (error) {
    console.error("Failed to log contact click in GET:", error);
  }

  // Use HTML + Location header redirect compatible with all browsers and mailto: schemes
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0;url=${MAILTO_URL}">
    <title>Redirecting to Email...</title>
  </head>
  <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0A0A0B; color: #F4F4F5;">
    <div style="text-align: center;">
      <p style="font-size: 16px; margin-bottom: 12px;">Opening your email client...</p>
      <a href="${MAILTO_URL}" style="color: #2DD4BF; font-size: 14px; text-decoration: underline;">Click here if your email client doesn't open automatically</a>
    </div>
    <script>
      window.location.href = "${MAILTO_URL}";
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Location: MAILTO_URL,
    },
  });
}

export async function POST(request: NextRequest) {
  const referrer = request.headers.get("referer") || "direct";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const timestamp = new Date().toISOString();

  let bodyData: any = {};
  try {
    bodyData = await request.json();
  } catch {
    // optional body payload
  }

  try {
    await logContactClick({
      timestamp: bodyData.timestamp || timestamp,
      referrer: bodyData.referrer || referrer,
      userAgent: bodyData.userAgent || userAgent,
    });
  } catch (error) {
    console.error("Failed to log contact click in POST:", error);
  }

  return NextResponse.json({
    success: true,
    email: CONTACT_EMAIL,
    mailto: MAILTO_URL,
  });
}
