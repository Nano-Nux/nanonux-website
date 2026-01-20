import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendWithWeb3Forms(payload: { name: string; email: string; service?: string; message: string }) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { ok: false, reason: "no_key" };

  const body = {
    access_key: accessKey,
    subject: `NANO NUX Contact: ${payload.service || "General Inquiry"}`,
    sender_name: payload.name,
    sender_email: payload.email,
    message: `Service: ${payload.service || "-"}\n\n${payload.message}`,
    // disable redirect
    redirect: "",
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      // Use a browser-like User-Agent to reduce risk of WAF/Cloudflare blocking server-side requests
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    },
    body: JSON.stringify(body),
  });

  // Diagnostic: log response status and body (do not log secrets)
  try {
    const text = await res.text();
    console.log("[/api/contact] Web3Forms response status:", res.status);
    // Try to parse JSON for clearer error messages
    try {
      const parsed = JSON.parse(text);
      console.log("[/api/contact] Web3Forms response body:", parsed);
    } catch (e) {
      console.log("[/api/contact] Web3Forms response text:", text.slice(0, 1000));
    }
    if (!res.ok) return { ok: false, reason: "web3forms_error", detail: text };
  } catch (e) {
    console.error("[/api/contact] Failed reading Web3Forms response", e);
    return { ok: false, reason: "web3forms_fetch_error", detail: String(e) };
  }

  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Diagnostic logs (safe: do not print full secret values)
    try {
      console.log("[/api/contact] Received contact POST", {
        name,
        email,
        service,
        messagePreview: String(message).slice(0, 200),
      });
      const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
      console.log("[/api/contact] WEB3FORMS_ACCESS_KEY present:", !!web3Key, "length:", web3Key ? String(web3Key).length : 0);
      console.log("[/api/contact] EMAIL_TO:", process.env.EMAIL_TO || null);
    } catch (e) {
      console.error("[/api/contact] Diagnostics logging failed", e);
    }

    // If WEB3FORMS_ACCESS_KEY is provided, use Web3Forms (free tier supported by their API)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const webRes = await sendWithWeb3Forms({ name, email, service, message });
      if (webRes.ok) return NextResponse.json({ ok: true, message: "Email sent via Web3Forms" });
      // if web3forms failed, fall through to try SMTP (if configured)
    }

    // Check for SMTP configuration
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.EMAIL_TO || process.env.SMTP_USER;

    if (!host || !port || !user || !pass || !to) {
      // Neither SMTP nor Web3Forms configured — return 501 with helpful message and diagnostics
      const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
      return NextResponse.json(
        {
          ok: false,
          message:
            "Email sending is not configured. Set WEB3FORMS_ACCESS_KEY for Web3Forms or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS and EMAIL_TO for SMTP.",
          diagnostics: {
            WEB3FORMS_ACCESS_KEY_present: !!web3Key,
            WEB3FORMS_ACCESS_KEY_length: web3Key ? String(web3Key).length : 0,
            EMAIL_TO: process.env.EMAIL_TO || null,
          },
        },
        { status: 501 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
    });

    const mail = {
      from: `${name} <${email}>`,
      to,
      subject: `NANO NUX Contact: ${service || "General Inquiry"}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Service:</strong> ${service}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    };

    await transporter.sendMail(mail);
    return NextResponse.json({ ok: true, message: "Email sent via SMTP" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
