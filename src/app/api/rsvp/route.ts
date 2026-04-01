import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.warn("Missing GOOGLE_SCRIPT_URL in .env.local");
      return NextResponse.json(
        { error: 'Missing Google Script URL in environment variables.' },
        { status: 500 }
      );
    }

    // Forward the payload to the Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status: ${response.status}`);
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      // If it's not JSON, it might just be the response from the script as text
      data = { result: responseText, success: responseText.toLowerCase().includes("success") };
    }

    if (data.result === "error" || data.status === "error" || (data.success === false)) {
      throw new Error(data.error || "Google Apps script returned an error");
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Google Sheets Script error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save RSVP to Google Sheets' },
      { status: 500 }
    );
  }
}
