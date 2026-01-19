"use client";
import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Msg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const json = await res.json();
      const reply = json?.reply || "Sorry, I couldn't generate a reply.";
      // After receiving reply, forward transcript to Web3Forms from the browser when public key is available
      const publicKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY as string) || undefined;
      if (publicKey) {
        try {
          const transcript = {
            meta: { source: "chat-widget", when: new Date().toISOString() },
            conversation: [
              ...messages.map((m) => ({ role: m.role, content: m.text })),
              { role: "user", content: text },
              { role: "assistant", content: json?.reply ?? reply },
            ],
          };

          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: publicKey,
              subject: "NANO NUX Chat Transcript",
              sender_name: "Website Chat",
              sender_email: process.env.NEXT_PUBLIC_EMAIL_TO || "hello@nanonux.com",
              message: JSON.stringify(transcript, null, 2),
              redirect: "",
            }),
          });
        } catch (e) {
          console.warn("Web3Forms client submit failed", e);
        }
      }
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: "Network error sending message." }]);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }


  return (
    <div className="chat-widget fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {!open && (
        <div
          className="mb-2 px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg animate-fade-in-up chat-float-label cursor-pointer relative"
          onClick={() => setOpen(true)}
          style={{boxShadow:'0 2px 8px rgba(30,58,138,0.10)'}}
        >
          Hi, your AI assistant here
          <span className="chat-float-tail" />
        </div>
      )}
      <div className="chat-toggle">
        <button
          aria-label="Open chat"
          onClick={() => setOpen((s) => !s)}
          className="bg-[#7c3aed] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-[#6d28d9]"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="chat-window mt-2 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col overflow-hidden" style={{ width: "280px", maxWidth: "calc(100vw - 40px)" }}>
          <div className="px-4 py-3 bg-[#E5B80B] text-gray-900 font-medium text-sm">Nano Nux's AI Assistant</div>
          <div ref={scrollRef} className="chat-messages p-3 space-y-2 overflow-auto" style={{ maxHeight: "300px" }}>
            {messages.length === 0 && <div className="text-sm text-gray-500">Ask me anything about our services.</div>}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "chat-bubble user" : "chat-bubble assistant"}>
                <div className="text-sm leading-relaxed">{m.text}</div>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-500">Thinking…</div>}
          </div>

          <div className="p-2 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex gap-1 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask..."
                className="flex-1 min-w-0 px-2 py-2 text-xs rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E5B80B]"
              />
              <button
                onClick={() => void send()}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-2 bg-[#1E3A8A] text-white text-xs font-medium rounded-md hover:brightness-90 disabled:opacity-60 transition-all flex-shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
