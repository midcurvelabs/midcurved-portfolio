import { MIDCURVED_ONELINER, VENTURES } from "@/lib/ventures";
import {
  MOBILE_PRINCIPLES,
  OPERATING_NODES,
  SYSTEM_NODES,
  VENTURE_LABELS,
  VENTURE_MARKS,
  VENTURE_PREVIEW_COPY,
} from "@/lib/venturePresentation";
import { InteractiveDice } from "./InteractiveDice";
import { LogoMark } from "./LogoMark";
import { VentureTimeline } from "./VentureTimeline";

export function Hero() {
  return (
    <header className="mc-hero">
      <div className="mc-hero__grain" aria-hidden />
      <div className="mc-hero__grid" aria-hidden />
      <div className="mc-hero__dust mc-hero__dust--left" aria-hidden />
      <div className="mc-hero__dust mc-hero__dust--right" aria-hidden />

      <nav className="mc-nav" aria-label="Primary navigation">
        <a className="mc-logo" href="#" aria-label="midcurved home">
          <LogoMark />
        </a>
        <div className="mc-nav__links">
          <a href="#tool-stack">Ventures</a>
          <a href="#channels">Channels</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="mc-nav__cta" href="#channels">
          Builder log
        </a>
      </nav>

      <div className="mc-hero__stage mc-desktop-hero">
        <InteractiveDice />

        <div className="mc-side-nodes mc-side-nodes--left" aria-hidden>
          {OPERATING_NODES.map((node) => (
            <span key={node}>{node}</span>
          ))}
        </div>

        <div className="mc-side-nodes mc-side-nodes--right" aria-hidden>
          {SYSTEM_NODES.map((node) => (
            <span key={node}>{node}</span>
          ))}
        </div>

        <svg
          className="mc-curve-signal"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M -20 430 C 95 390, 145 525, 260 460 C 355 405, 330 350, 500 410 C 640 458, 660 360, 755 410 C 848 462, 890 385, 1020 330" />
          <path className="mc-curve-signal__core" d="M 0 510 C 205 450, 260 545, 386 460 C 455 414, 500 410, 500 410 C 500 410, 548 416, 620 460 C 750 538, 805 452, 1000 510" />
        </svg>

        <svg
          className="mc-map"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="mc-map-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="22%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="78%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="mc-map__side">
            {OPERATING_NODES.map((_, index) => {
              const y = 54 + index * 44;
              return (
                <path
                  d={`M 184 ${y} C 230 ${y}, 226 174, 294 174`}
                  key={`left-${index}`}
                />
              );
            })}
            {SYSTEM_NODES.map((_, index) => {
              const y = 54 + index * 44;
              return (
                <path
                  d={`M 816 ${y} C 770 ${y}, 774 174, 706 174`}
                  key={`right-${index}`}
                />
              );
            })}
          </g>
          <g className="mc-map__ventures">
            <path d="M 500 410 C 422 432, 220 370, 105 510" />
            <path d="M 500 410 C 455 455, 352 405, 300 510" />
            <path d="M 500 410 C 500 450, 500 470, 500 510" />
            <path d="M 500 410 C 545 455, 648 405, 700 510" />
            <path d="M 500 410 C 578 432, 780 370, 895 510" />
            <path className="mc-map__trunk" d="M 500 346 L 500 510" />
            <path className="mc-map__rail" d="M 105 510 C 265 462, 380 462, 500 510 C 620 462, 735 462, 895 510" />
          </g>
          <g className="mc-map__pulses">
            <circle cx="294" cy="174" r="4" />
            <circle cx="706" cy="174" r="4" />
            <circle cx="500" cy="410" r="4" />
            <circle cx="105" cy="510" r="4" />
            <circle cx="300" cy="510" r="4" />
            <circle cx="500" cy="510" r="4" />
            <circle cx="700" cy="510" r="4" />
            <circle cx="895" cy="510" r="4" />
          </g>
        </svg>

        <section className="mc-hero-console" aria-labelledby="hero-title">
          <div className="mc-console__flare mc-console__flare--top" aria-hidden />
          <div className="mc-console__flare mc-console__flare--right" aria-hidden />
          <h1 id="hero-title">midcurved</h1>
          <p className="mc-hero-console__lead">Builder media studio + product lab.</p>
          <p className="mc-hero-console__copy">{MIDCURVED_ONELINER}</p>
          <div className="mc-hero-console__actions">
            <a className="mc-button mc-button--primary" href="#tool-stack">
              Explore ventures
              <span aria-hidden>→</span>
            </a>
            <a className="mc-button mc-button--ghost" href="#channels">
              Follow the work
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="mc-signal-row" aria-label="Midcurved principles">
            <span>AI-native</span>
            <span>Shipped in public</span>
            <span>Systems over hype</span>
            <span>Long-term compounding</span>
          </div>
        </section>

        <section className="mc-venture-preview" aria-label="Featured ventures">
          {VENTURES.map((venture) => (
            <a
              key={venture.id}
              className="mc-venture-node"
              href={venture.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="mc-venture-node__label">
                {VENTURE_LABELS[venture.id] ?? venture.mode}
              </span>
              <span className="mc-venture-node__mark">
                {VENTURE_MARKS[venture.id] ?? venture.name}
              </span>
              <span className="mc-venture-node__name">{venture.name}</span>
              <span className="mc-venture-node__copy">
                {VENTURE_PREVIEW_COPY[venture.id] ?? venture.oneLiner}
              </span>
              <span className="mc-venture-node__action">
                Explore <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </section>
      </div>

      <section className="mc-mobile-hero" aria-labelledby="mobile-hero-title">
        <div className="mc-mobile-hero__first">
          <div className="mc-mobile-rail" aria-hidden>
            <span />
            <span />
            <span />
          </div>

          <div className="mc-mobile-console">
            <div className="mc-console__flare mc-console__flare--top" aria-hidden />
            <div className="mc-console__flare mc-console__flare--right" aria-hidden />
            <div className="mc-mobile-console__topline">
              <span>
                <LogoMark />
              </span>
              <span>live system</span>
            </div>
            <div className="mc-mobile-dice" aria-hidden>
              <InteractiveDice />
            </div>
            <h1 id="mobile-hero-title">midcurved</h1>
            <p className="mc-mobile-console__lead">
              Builder media studio + product lab.
            </p>
            <p className="mc-mobile-console__copy">
              Apps, media, and proof shipped in public.
            </p>
            <div className="mc-mobile-console__actions">
              <a className="mc-button mc-button--primary" href="#tool-stack">
                Explore
                <span aria-hidden>→</span>
              </a>
              <a className="mc-button mc-button--ghost" href="#channels">
                Follow
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="mc-mobile-principles" aria-label="Midcurved principles">
            {MOBILE_PRINCIPLES.map((principle) => (
              <span key={principle}>{principle}</span>
            ))}
          </div>
        </div>

        <div className="mc-mobile-ventures">
          <div className="mc-mobile-section-label">live venture stack</div>
          <VentureTimeline compact />
        </div>
      </section>
    </header>
  );
}
