"use client";
import React, { useState } from "react";

export default function ContactForm({ services }: { services: any[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services[0]?.category || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const publicKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      const publicTo = process.env.NEXT_PUBLIC_EMAIL_TO || "hello@nanonux.com";
      if (publicKey) {
        // Send directly from the browser to Web3Forms to avoid server-side WAF blocking
        const body = {
          access_key: publicKey,
          subject: `NANO NUX Contact: ${service || "General Inquiry"}`,
          sender_name: name,
          sender_email: email,
          message: `Service: ${service || "-"}\n\n${message}`,
          redirect: "",
        };

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => null);
        if (res.ok) {
          setStatus("Message sent — we'll get back to you shortly.");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          // fallback to server route
          console.warn("Web3Forms client submit failed, falling back to server", data);
          const fallback = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, service, message }),
          });
          const fdata = await fallback.json().catch(() => null);
          if (fallback.ok) {
            setStatus("Message sent — we'll get back to you shortly.");
            setName("");
            setEmail("");
            setMessage("");
          } else {
            setStatus(fdata?.error || fdata?.message || "Failed to send message.");
          }
        }
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, service, message }),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus("Message sent — we'll get back to you shortly.");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setStatus(data?.error || data?.message || "Failed to send message.");
        }
      }
    } catch (err) {
      setStatus("Network error — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
            placeholder="hello@nanonux.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Service Interested In</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
        >
          <option value="">Select a service</option>
          {services.map((s, i) => (
            <option key={i} value={s.category}>
              {s.category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Project Details</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
          placeholder="Tell us about your project..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#1E3A8A] text-white rounded-full text-lg font-semibold hover:bg-[#1e3a8ae6] transition-all hover:scale-105 shadow-lg disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && <div className="mt-4 text-center text-sm text-gray-700">{status}</div>}
    </form>
  );
}
