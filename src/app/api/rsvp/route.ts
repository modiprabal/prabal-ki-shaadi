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
      method: 'POST',
      body: JSON.stringify(body),
      // Note: Apps Script sometimes fails with strict application/json headers when fetched server-to-server depending on redirects
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Unknown error returned from Google Apps script');
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
