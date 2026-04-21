"use client";

import { useState, type FormEvent } from "react";
import posthog from "posthog-js";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      setErrorMsg("Form endpoint not configured yet.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      posthog.capture?.("contact_submit", { status: "success" });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something broke.");
      posthog.capture?.("contact_submit", { status: "error" });
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--space-3) var(--space-4)",
    background: "color-mix(in oklch, var(--neutral-0) 4%, transparent)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-md)",
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-ui)",
    outline: "none",
    transition: "border-color var(--dur-fast) var(--ease-out)",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-wide)",
    color: "var(--text-muted)",
    marginBottom: "var(--space-2)",
    display: "block",
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "grid",
        gap: "var(--space-4)",
        maxWidth: "640px",
      }}
    >
      <div>
        <label htmlFor="contact-name" style={labelStyle}>name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          style={fieldStyle}
        />
      </div>
      <div>
        <label htmlFor="contact-email" style={labelStyle}>email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          style={fieldStyle}
        />
      </div>
      <div>
        <label htmlFor="contact-message" style={labelStyle}>message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          style={{ ...fieldStyle, resize: "vertical", fontFamily: "var(--font-ui)" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          justifySelf: "start",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          padding: "var(--space-3) var(--space-6)",
          borderRadius: "var(--radius-full)",
          border: "none",
          background: "var(--accent)",
          color: "var(--neutral-1000)",
          cursor: status === "submitting" ? "wait" : "pointer",
          boxShadow: "var(--elev-glow)",
          transition: "transform var(--dur-fast) var(--ease-spring)",
        }}
      >
        {status === "submitting" ? "sending..." : "send"}
      </button>

      {status === "success" && (
        <div
          role="status"
          style={{
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in oklch, var(--status-success) 14%, transparent)",
            border: "1px solid color-mix(in oklch, var(--status-success) 35%, transparent)",
            color: "var(--neutral-50)",
            fontSize: "var(--text-sm)",
          }}
        >
          Got it. Rik will read this.
        </div>
      )}
      {status === "error" && (
        <div
          role="status"
          style={{
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in oklch, var(--accent) 10%, transparent)",
            border: "1px solid color-mix(in oklch, var(--accent) 30%, transparent)",
            color: "var(--neutral-50)",
            fontSize: "var(--text-sm)",
          }}
        >
          Send failed — {errorMsg || "try again or email rik@midcurved.com directly."}
        </div>
      )}
    </form>
  );
}
