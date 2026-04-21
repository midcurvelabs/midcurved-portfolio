"use client";

import posthog from "posthog-js";
import { CHANNELS, CHANNEL_GROUPS, type Channel } from "@/lib/channels";
import { PlatformIcon } from "./PlatformIcon";

function ChannelCard({ channel }: { channel: Channel }) {
  const cardStyle: React.CSSProperties = {
    padding: "var(--space-4)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-subtle)",
    background: "color-mix(in oklch, var(--neutral-0) 3%, transparent)",
    transition: "border-color var(--dur-fast) var(--ease-out)",
    cursor: "pointer",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        posthog.capture?.("channel_click", {
          channel: channel.id,
          platform: channel.platform,
          group: channel.group,
          href: channel.href,
        })
      }
      style={cardStyle}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          marginBottom: "var(--space-2)",
        }}
      >
        <PlatformIcon platform={channel.platform} />
        {channel.platform}
      </span>
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-base)",
          color: "var(--neutral-0)",
        }}
      >
        {channel.handle}
        <span
          style={{ color: "var(--accent-300)", marginLeft: "var(--space-2)" }}
          aria-hidden
        >
          →
        </span>
      </span>
    </a>
  );
}

export function ChannelsStrip() {
  return (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      {CHANNEL_GROUPS.map((group) => {
        const items = CHANNELS.filter((c) => c.group === group.key);
        if (items.length === 0) return null;
        return (
          <div key={group.key}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-mega)",
                color: "var(--accent-300)",
                marginBottom: "var(--space-1)",
              }}
            >
              {group.label}
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-sm)",
                marginBottom: "var(--space-3)",
              }}
            >
              {group.blurb}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "var(--space-3)",
              }}
            >
              {items.map((c) => (
                <ChannelCard key={c.id} channel={c} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
