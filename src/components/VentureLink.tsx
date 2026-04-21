"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { GlassCard } from "./GlassCard";
import type { Venture } from "@/lib/ventures";

export function VentureLink({ venture }: { venture: Venture }) {
  const isExternal = venture.href.startsWith("http");
  const isTodo = venture.hrefStatus === "todo";

  const handleClick = () => {
    posthog.capture?.("venture_click", {
      venture: venture.id,
      mode: venture.mode,
      accent: venture.accentHex,
      href: venture.href,
      status: venture.hrefStatus,
    });
  };

  const content = (
    <GlassCard
      as="article"
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        cursor: isTodo ? "not-allowed" : "pointer",
        opacity: isTodo ? 0.72 : 1,
      }}
    >
      {/* Accent stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: "var(--space-5)",
          bottom: "var(--space-5)",
          width: "3px",
          borderRadius: "var(--radius-full)",
          background: venture.accentHex,
          boxShadow: `0 0 16px -2px ${venture.accentHex}`,
        }}
      />
      <div style={{ paddingLeft: "var(--space-4)" }}>
        <h3
          style={{
            fontFamily: "var(--font-display-middle)",
            fontSize: "var(--text-2xl)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--neutral-0)",
          }}
        >
          {venture.name}
        </h3>
      </div>
      <p
        style={{
          color: "var(--text-secondary)",
          margin: 0,
          paddingLeft: "var(--space-4)",
          fontSize: "var(--text-base)",
        }}
      >
        {venture.oneLiner}
      </p>
      <div
        style={{
          paddingLeft: "var(--space-4)",
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: isTodo ? "var(--text-muted)" : "var(--accent-300)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
      >
        {isTodo ? (
          <>
            <span>link: TODO</span>
            <span style={{ color: "var(--text-muted)" }}>· coming soon</span>
          </>
        ) : (
          <>
            <span>{venture.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
            <span aria-hidden>→</span>
          </>
        )}
      </div>
    </GlassCard>
  );

  if (isTodo) {
    return <div>{content}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={venture.href}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        style={{ color: "inherit", textDecoration: "none", display: "block", height: "100%" }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={venture.href}
      onClick={handleClick}
      style={{ color: "inherit", textDecoration: "none", display: "block", height: "100%" }}
    >
      {content}
    </Link>
  );
}
