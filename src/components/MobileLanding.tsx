"use client";

import { useMemo, useState } from "react";
import { CHANNEL_GROUPS, CHANNELS } from "@/lib/channels";
import { SHIP_SEASON_VIDEOS } from "@/lib/shipSeason";
import {
  getFeaturedTool,
  getToolsByPhase,
  TOOL_PHASES,
  type ToolPhase,
  type ToolStackItem,
} from "@/lib/toolStack";
import { VENTURES } from "@/lib/ventures";
import {
  MOBILE_PRINCIPLES,
  VENTURE_LABELS,
  VENTURE_MARKS,
  VENTURE_PREVIEW_COPY,
} from "@/lib/venturePresentation";
import { ContactForm } from "./ContactForm";
import { LogoMark } from "./LogoMark";
import { PlatformIcon } from "./PlatformIcon";

const PHASES: ToolPhase[] = ["idea", "create", "grow"];
const MOBILE_VENTURE_ORDER = [
  "TheRikOS",
  "vibecode.fun",
  "GodModePod",
  "BeClaire",
  "Accountability",
];

const PROOF_STATS = [
  ["5M+", "views generated"],
  ["10K+", "total audience and growing"],
  ["30+", "apps shipped and compounding daily"],
];

function statusLabel(status: ToolStackItem["status"]) {
  if (status === "live") return "Live";
  if (status === "building") return "Building";
  return "Concept";
}

export function MobileLanding() {
  const [activePhase, setActivePhase] = useState<ToolPhase>("create");
  const phase = TOOL_PHASES[activePhase];
  const tools = useMemo(() => getToolsByPhase(activePhase).slice(0, 3), [activePhase]);
  const featured = getFeaturedTool(activePhase);
  const mobileVentures = MOBILE_VENTURE_ORDER.map((name) =>
    VENTURES.find((venture) => venture.name === name),
  ).filter((venture): venture is (typeof VENTURES)[number] => Boolean(venture));
  const [featuredVideo, ...fallbackVideos] = SHIP_SEASON_VIDEOS;

  return (
    <div className="mc-mobile-first">
      <header className="mc-mf-hero">
        <nav className="mc-mf-nav" aria-label="Mobile navigation">
          <a className="mc-mf-logo" href="#" aria-label="midcurved home">
            <LogoMark />
          </a>
          <div className="mc-mf-nav-links">
            <a className="mc-mf-nav-link" href="#mobile-ventures">
              Work
            </a>
            <a className="mc-mf-nav-link" href="#mobile-contact">
              Contact
            </a>
          </div>
        </nav>

        <div className="mc-mf-hero__body">
          <h1>midcurved</h1>
          <p>Apps, media, and proof shipped in public.</p>
          <div className="mc-mf-actions">
            <a className="mc-mf-button mc-mf-button--primary" href="#mobile-ventures">
              Explore work
            </a>
            <a className="mc-mf-button mc-mf-button--secondary" href="#mobile-channels">
              Follow
            </a>
          </div>
        </div>

        <div className="mc-mf-principles" aria-label="Midcurved principles">
          {MOBILE_PRINCIPLES.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </header>

      <section className="mc-mf-section" id="mobile-console">
        <div className="mc-mf-section-label">Tool stack</div>
        <h2>Idea. Create. Grow.</h2>
        <div className="mc-mf-tabs" role="tablist" aria-label="Tool stack phases">
          {PHASES.map((phaseKey) => (
            <button
              aria-selected={activePhase === phaseKey}
              key={phaseKey}
              onClick={() => setActivePhase(phaseKey)}
              role="tab"
              type="button"
            >
              {TOOL_PHASES[phaseKey].eyebrow}
            </button>
          ))}
        </div>

        <article className="mc-mf-phase-card">
          <span>{phase.eyebrow}</span>
          <h3>{phase.title}</h3>
          <p>{phase.description}</p>
          {featured ? (
            <a href={featured.href ?? "#mobile-contact"} className="mc-mf-feature">
              <strong>{featured.name}</strong>
              <small>{statusLabel(featured.status)} · {featured.parent}</small>
            </a>
          ) : null}
        </article>

        <div className="mc-mf-tool-list">
          {tools.map((tool) => (
            <a className="mc-mf-tool-row" href={tool.href ?? "#mobile-contact"} key={tool.id}>
              <span>{tool.label}</span>
              <strong>{tool.name}</strong>
              <small>{statusLabel(tool.status)} · {tool.parent}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="mc-mf-section" id="mobile-ventures">
        <div className="mc-mf-section-label">Live ventures</div>
        <h2>Five public nodes.</h2>
        <div className="mc-mf-ventures">
          {mobileVentures.map((venture) => (
            <a className="mc-mf-venture" href={venture.href} key={venture.id}>
              <span className="mc-mf-venture__mark">
                {VENTURE_MARKS[venture.id] ?? venture.name}
              </span>
              <span className="mc-mf-venture__body">
                <small>{VENTURE_LABELS[venture.id] ?? venture.mode}</small>
                <strong>{venture.name}</strong>
                <span>{VENTURE_PREVIEW_COPY[venture.id] ?? venture.oneLiner}</span>
              </span>
              <span className="mc-mf-arrow" aria-hidden>→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mc-mf-section" id="mobile-ship-season">
        <div className="mc-mf-section-label">Latest builds</div>
        <h2>Ship Season.</h2>
        <a className="mc-mf-video-feature" href={featuredVideo.href}>
          <span>{featuredVideo.kicker}</span>
          <strong>{featuredVideo.title}</strong>
          <small>{featuredVideo.publishedAt}</small>
        </a>
        <div className="mc-mf-video-list">
          {fallbackVideos.slice(0, 3).map((video) => (
            <a className="mc-mf-video-row" href={video.href} key={video.id}>
              <span aria-hidden />
              <strong>{video.title}</strong>
              <small>{video.kicker}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="mc-mf-section" id="mobile-channels">
        <div className="mc-mf-section-label">Channels</div>
        <h2>Where it ships.</h2>
        <div className="mc-mf-channel-groups">
          {CHANNEL_GROUPS.map((group) => {
            const channels = CHANNELS.filter((channel) => channel.group === group.key);
            if (channels.length === 0) return null;
            return (
              <div className="mc-mf-channel-group" key={group.key}>
                <h3>{group.label}</h3>
                {channels.map((channel) => (
                  <a className="mc-mf-channel-row" href={channel.href} key={channel.id}>
                    <PlatformIcon platform={channel.platform} size={16} />
                    <span>{channel.platform}</span>
                    <strong>{channel.handle}</strong>
                    <span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mc-mf-section" id="mobile-about">
        <div className="mc-mf-section-label">About</div>
        <h2>Rik ships in public.</h2>
        <p className="mc-mf-copy">
          Midcurved is the parent brand for AI-native apps, builder media, and
          public experiments that compound into proof.
        </p>
        <div className="mc-mf-proof">
          {PROOF_STATS.map(([value, label]) => (
            <div className="mc-mf-stat" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mc-mf-section mc-mf-contact" id="mobile-contact">
        <div className="mc-mf-section-label">Contact</div>
        <h2>Send a signal.</h2>
        <p className="mc-mf-copy">
          Consulting inquiry, podcast pitch, collaboration, or a question about
          one of the ventures. Short is fine.
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
