"use client";

import { useState, useRef, useEffect } from "react";

const subjects = [
  { value: "general", label: "General question" },
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
  { value: "partnership", label: "Partnership" },
  { value: "enterprise", label: "Enterprise inquiry" },
  { value: "other", label: "Other" },
];

function CustomSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = subjects.find((s) => s.value === value) ?? subjects[0]!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); return; }
    if (!open) return;
    const idx = subjects.findIndex((s) => s.value === value);
    if (e.key === "ArrowDown") { e.preventDefault(); onChange(subjects[Math.min(idx + 1, subjects.length - 1)]!.value); }
    if (e.key === "ArrowUp") { e.preventDefault(); onChange(subjects[Math.max(idx - 1, 0)]!.value); }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-lg card body-text focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all cursor-pointer text-left flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <svg
          className={`w-4 h-4 muted-text transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-lg card border border-cyan-500/10 py-1 shadow-xl shadow-black/20 overflow-hidden"
          style={{ backdropFilter: "blur(12px)" }}
        >
          {subjects.map((s) => (
            <li
              key={s.value}
              role="option"
              aria-selected={s.value === value}
              onClick={() => { onChange(s.value); setOpen(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") { onChange(s.value); setOpen(false); } }}
              tabIndex={0}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                s.value === value
                  ? "text-cyan-400 bg-cyan-500/10"
                  : "body-text hover:bg-cyan-500/5"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}

      <input type="hidden" name="subject" value={value} />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [subject, setSubject] = useState("general");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xaqdvrvy", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setSubject("general");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16 animate-in fade-in duration-500">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold heading mb-2">Message sent</h2>
        <p className="body-text mb-8">We'll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-3 text-sm font-semibold rounded-lg card body-text hover:border-cyan-500/20 transition-all cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium heading mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium heading mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium heading mb-2">
          Subject
        </label>
        <CustomSelect value={subject} onChange={setSubject} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium heading mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg card body-text placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
          placeholder="What can we help with?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending...
          </>
        ) : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
