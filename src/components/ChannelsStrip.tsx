"use client";

import posthog from "posthog-js";
import { CHANNELS, CHANNEL_GROUPS, type Channel } from "@/lib/channels";
import { PlatformIcon } from "./PlatformIcon";

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <a
      className="mc-ch-card"
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
    >
      <PlatformIcon platform={channel.platform} size={16} />
      <span className="mc-ch-platform">{channel.platform}</span>
      <span className="mc-ch-handle">{channel.handle}</span>
      <span className="mc-ch-arrow" aria-hidden>→</span>
    </a>
  );
}

export function ChannelsStrip() {
  return (
    <div className="mc-ch-root">
      {CHANNEL_GROUPS.map((group) => {
        const items = CHANNELS.filter((c) => c.group === group.key);
        if (items.length === 0) return null;
        return (
          <div key={group.key} className="mc-ch-group">
            <div className="mc-ch-meta">
              <div className="mc-ch-label">{group.label}</div>
              <div className="mc-ch-blurb">{group.blurb}</div>
            </div>
            <div className="mc-ch-cards">
              {items.map((c) => (
                <ChannelCard key={c.id} channel={c} />
              ))}
            </div>
          </div>
        );
      })}
      <style>{`
        .mc-ch-root { display: grid; gap: var(--space-4); }
        .mc-ch-group { display: grid; gap: var(--space-2); align-items: start; }
        .mc-ch-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: var(--tracking-mega);
          color: var(--accent-300);
          margin-bottom: var(--space-1);
        }
        .mc-ch-blurb {
          color: var(--text-muted);
          font-size: var(--text-sm);
        }
        .mc-ch-cards {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .mc-ch-card {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          background: color-mix(in oklch, var(--neutral-0) 3%, transparent);
          color: inherit;
          text-decoration: none;
          transition: border-color var(--dur-fast) var(--ease-out),
                      background var(--dur-fast) var(--ease-out);
          flex: 0 0 auto;
        }
        .mc-ch-card:hover {
          border-color: var(--accent-700);
          background: color-mix(in oklch, var(--accent) 6%, transparent);
        }
        .mc-ch-platform {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          color: var(--text-muted);
        }
        .mc-ch-handle {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--neutral-0);
        }
        .mc-ch-arrow {
          color: var(--accent-300);
          font-size: var(--text-sm);
        }
        @media (min-width: 768px) {
          .mc-ch-root { gap: var(--space-5); }
          .mc-ch-group {
            grid-template-columns: 240px 1fr;
            gap: var(--space-5);
          }
        }
      `}</style>
    </div>
  );
}
