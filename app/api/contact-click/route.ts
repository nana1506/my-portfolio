import { NextRequest, NextResponse } from "next/server";
import { logContactClick } from "@/lib/notion";

const CONTACT_EMAIL = "isnan.rizqikurniawan@gmail.com";
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=Analytics%20Opportunity%20/%20Inquiry`;

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

  // Redirect to mailto URL
  return NextResponse.redirect(MAILTO_URL, { status: 307 });
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
