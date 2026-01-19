export const runtime = 'edge';

import { NextResponse } from "next/server";

async function sendWithWeb3Forms(payload: { transcriptJson: any }) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { ok: false, reason: "no_key" };

  const body = {
    access_key: accessKey,
    subject: `NANO NUX Chat Transcript`,
    sender_name: "Website Chat",
    sender_email: process.env.EMAIL_TO || "no-reply@nanonux.com",
    // send structured JSON as the message body so the email contains a JSON model of the conversation
    message: JSON.stringify(payload.transcriptJson, null, 2),
    redirect: "",
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    return { ok: false, reason: "web3forms_error", detail: json };
  }

  return { ok: true };
}

async function generateAIReply(history: { role: string; content: string }[], latest: string) {
  // Try Google Gemini first if configured
  const geminiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  if (geminiKey) {
    try {
      // Use the Google Generative API chat endpoint pattern. The exact response shape may vary by model/version.
      const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/${encodeURIComponent(geminiModel)}:generateMessage?key=${encodeURIComponent(geminiKey)}`;
      const systemPrompt = `You are an expert customer service representative for NANO NUX, a premium tech consultancy specializing in:
- Custom software development (web, mobile, desktop, SaaS)
- AI-powered solutions and chatbots
- IoT & smart systems
- Cloud & backend architecture
- Digital transformation consulting
- UX/UI design and frontend development
- Business automation and workflow optimization
- E-commerce and marketplace platforms
- Emerging tech (blockchain, Web3, AR/VR)

Company values: Innovation, quality, client-centric approach, agile delivery, premium solutions.

Respond professionally, focus on NANO NUX services, answer client questions about capabilities, provide helpful insights about tech solutions, and guide prospects toward engagement. Keep responses concise and friendly.`;
      
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: latest },
      ];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        // Try several common response fields used by Google generative APIs
        const candidateText = json?.candidates?.[0]?.content || json?.candidates?.[0]?.message?.content || json?.output?.[0]?.content || json?.candidates?.[0]?.content?.[0] || null;
        if (candidateText) return String(candidateText).trim();
      } else {
        const err = await res.text().catch(() => "");
        console.error("Gemini API error:", err);
      }
    } catch (e) {
      console.error("Gemini request failed", e);
    }
  }

  // Next, try OpenAI if configured
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const messages = [
        { role: "system", content: "You are a helpful assistant for NANO NUX, a premium tech consultancy." },
        ...history,
        { role: "user", content: latest },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({ model: "gpt-3.5-turbo", messages }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("OpenAI error:", err);
      } else {
        const json = await res.json();
        const reply = json?.choices?.[0]?.message?.content;
        if (reply) return String(reply).trim();
      }
    } catch (e) {
      console.error("OpenAI request failed", e);
    }
  }

  // Fallback reply when no AI key is present or generation failed
  return `Thanks for reaching out! 👋

I'm Nano Nux's AI Assistant, here to help answer questions about our services and solutions. 

We specialize in:
• Custom software development & SaaS platforms
• AI-powered solutions
• IoT & smart systems
• Cloud architecture & backend development
• UX/UI design & frontend development
• Business automation & digital transformation
• E-commerce & Web3 solutions

What would you like to know about how NANO NUX can help your business? Feel free to ask about any of our services or schedule a consultation with our team at hello@nanonux.com.`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body || {};
    if (!message) return NextResponse.json({ error: "Missing message" }, { status: 400 });

    // Normalize provided history
    const aiHistory = Array.isArray(history)
      ? history.map((h: any) => ({ role: h.role === "assistant" ? "assistant" : "user", content: String(h.text ?? h.content ?? h) }))
      : [];

    const aiReply = await generateAIReply(aiHistory, message);

    // Build structured transcript JSON (array of message objects)
    const transcriptJson = {
      meta: { source: "nanonux-website chat", when: new Date().toISOString() },
      conversation: [
        ...aiHistory.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: message },
        { role: "assistant", content: aiReply },
      ],
    };

    // Forward to Web3Forms if configured
    if (!process.env.WEB3FORMS_ACCESS_KEY) {
      // still return the reply but indicate forwarding not configured
      return NextResponse.json({ ok: true, reply: aiReply, forwarded: false, message: "WEB3FORMS_ACCESS_KEY not set" }, { status: 200 });
    }

    const webRes = await sendWithWeb3Forms({ transcriptJson });
    if (!webRes.ok) {
      console.error("Web3Forms forward failed", webRes);
      // return reply but indicate forwarding failed
      return NextResponse.json({ ok: true, reply: aiReply, forwarded: false, detail: webRes }, { status: 200 });
    }

    return NextResponse.json({ ok: true, reply: aiReply, forwarded: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
