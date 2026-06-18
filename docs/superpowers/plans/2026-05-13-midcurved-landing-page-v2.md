# Midcurved Landing Page V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Midcurved V2 landing page with the existing cinematic desktop hero, a new interactive Venture Console, mobile-first repaired layouts, a live ventures proof layer, a Ship Season video section, and updated public proof stats.

**Architecture:** Keep the current Next.js app router page and existing Midcurved design tokens. Add focused data modules for tools/videos/stats, new presentation components for the Venture Console and Ship Season, and repair responsive CSS so mobile uses purpose-built stacks instead of compressed desktop compositions.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, Tailwind v4 token imports, CSS modules via global Midcurved classes, PostHog client tracking where existing patterns apply.

---

## File Structure

- Modify: `src/app/page.tsx`
  - Owns page section order and imports.
- Modify: `src/components/Hero.tsx`
  - Preserve desktop hero; tighten mobile hero markup only if needed.
- Modify: `src/app/globals.css`
  - Main visual implementation for desktop and mobile sections.
- Create: `src/lib/toolStack.ts`
  - Data source for `idea`, `create`, and `grow` tools shown in the Venture Console.
- Create: `src/components/VentureConsole.tsx`
  - Client component with phase tabs and dynamic tool modules.
- Create: `src/lib/shipSeason.ts`
  - Data/helper layer for latest build videos. Start with stable fallback data; wire RSS/playlist fetch after visual section lands.
- Create: `src/components/ShipSeason.tsx`
  - Video proof section with one featured video and three secondary cards.
- Create: `src/components/ProofStats.tsx`
  - Small reusable proof stat row for the about block.
- Modify: `src/components/AiAmbientPanel.tsx`
  - Either keep as secondary recommendation panel or replace visually with proof stats depending on final layout density.
- Modify: `src/lib/ventures.ts`
  - Keep live venture list unchanged: TheRikOS, vibecode.fun, GodModePod, BeClaire, Accountability.

---

## Mobile UX Contract

Mobile is not a compressed desktop page. At `max-width: 760px`, each major section becomes a purpose-built vertical stack optimized for a `390x844` viewport.

### Mobile Page Flow

1. **Hero**
   - Compact nav/logo only.
   - Glass console fits fully inside viewport width.
   - Strong `midcurved` wordmark, short lead, concise copy.
   - One primary CTA plus one secondary CTA.
   - Principles strip below the console.
   - No desktop mind-map, desktop venture cards, or large dice.

2. **Venture Console**
   - Section intro first.
   - Sticky-feeling segmented control: `Idea / Create / Grow`.
   - One featured active-phase glass card.
   - Tool modules become a vertical list below the featured card.
   - Subtle vertical yellow rail replaces desktop circuit wiring.
   - Tap targets should be at least `44px` tall.

3. **Live Ventures**
   - Hide desktop venture grid.
   - Show connected vertical timeline only.
   - Each venture row includes mark, name, one-line copy, and action.

4. **Ship Season**
   - One large featured video card.
   - Three supporting video cards stacked below.
   - No embedded video player; thumbnail cards link out for speed.

5. **Channels**
   - Single-column grouped rows.
   - Each channel link fills width with icon, platform, handle, arrow.

6. **About / Proof / Contact**
   - About copy first.
   - Proof stats stack vertically: `5M+`, `10K+`, `30+`.
   - Ambient panel can appear below proof stats, but must not dominate the page.
   - Contact panel becomes one column.

### Mobile Acceptance Criteria

- No horizontal scrolling at `390x844`.
- No text clipped inside buttons, tabs, cards, or stat blocks.
- First mobile viewport clearly reads as Midcurved, not a cropped desktop hero.
- Venture Console remains understandable without seeing desktop.
- Screenshots required:
  - `/private/tmp/midcurved-mobile-hero-v2.png`
  - `/private/tmp/midcurved-mobile-console-v2.png`
  - `/private/tmp/midcurved-mobile-full-v2.png`

---

## Task 1: Create Tool Stack Data Model

**Files:**
- Create: `src/lib/toolStack.ts`

- [ ] **Step 1: Add phase and tool types**

Create `src/lib/toolStack.ts`:

```ts
export type ToolPhase = "idea" | "create" | "grow";

export type ToolStatus = "live" | "building" | "concept";

export type ToolStackItem = {
  id: string;
  phase: ToolPhase;
  name: string;
  label: string;
  status: ToolStatus;
  parent: string;
  description: string;
  href?: string;
  featured?: boolean;
};
```

- [ ] **Step 2: Add phase metadata**

Add this below the types:

```ts
export const TOOL_PHASES: Record<
  ToolPhase,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  idea: {
    eyebrow: "idea",
    title: "Find the signal.",
    description:
      "Tools for turning raw ideas into sharper concepts, specs, and founder-ready decisions.",
  },
  create: {
    eyebrow: "create",
    title: "Ship the thing.",
    description:
      "Build tools, production workflows, and AI-native systems that move from prompt to product.",
  },
  grow: {
    eyebrow: "grow",
    title: "Compound the work.",
    description:
      "Distribution, audience, accountability, and feedback loops that make each launch stronger.",
  },
};
```

- [ ] **Step 3: Add provisional tool data**

Add this below `TOOL_PHASES`:

```ts
export const TOOL_STACK: ToolStackItem[] = [
  {
    id: "idea-generator",
    phase: "idea",
    name: "Idea Generator",
    label: "Concept",
    status: "building",
    parent: "Midcurved",
    description: "Generate app ideas from audience signals, constraints, and founder taste.",
    featured: true,
  },
  {
    id: "prd-builder",
    phase: "idea",
    name: "PRD Builder",
    label: "Spec",
    status: "concept",
    parent: "vibecode.fun",
    description: "Turn promising ideas into tight product briefs and implementation-ready specs.",
  },
  {
    id: "market-map",
    phase: "idea",
    name: "Market Map",
    label: "Research",
    status: "concept",
    parent: "Midcurved",
    description: "Map competitors, positioning, and wedge opportunities before building.",
  },
  {
    id: "prototype-lab",
    phase: "create",
    name: "Prototype Lab",
    label: "Build",
    status: "building",
    parent: "Midcurved",
    description: "A repeatable sprint system for turning ideas into working prototypes.",
    featured: true,
  },
  {
    id: "vibecode",
    phase: "create",
    name: "vibecode.fun",
    label: "Community",
    status: "live",
    parent: "vibecode.fun",
    href: "https://vibecode.fun",
    description: "Native home for AI-assisted builders, profiles, tools, and future payouts.",
  },
  {
    id: "interview-sidekick",
    phase: "create",
    name: "Interview Sidekick",
    label: "Media",
    status: "concept",
    parent: "GodModePod",
    description: "AI prep and live support for sharper podcast interviews and creator research.",
  },
  {
    id: "launch-kit",
    phase: "grow",
    name: "Launch Kit",
    label: "Distribution",
    status: "building",
    parent: "Midcurved",
    description: "Reusable launch assets, copy, checklists, and channel plans for every build.",
    featured: true,
  },
  {
    id: "community-loop",
    phase: "grow",
    name: "Community Loop",
    label: "Audience",
    status: "concept",
    parent: "Midcurved",
    description: "Turn viewers, readers, and builders into an active feedback and shipping loop.",
  },
  {
    id: "metrics-room",
    phase: "grow",
    name: "Metrics Room",
    label: "Analytics",
    status: "concept",
    parent: "Midcurved",
    description: "Track views, signups, launches, and compounding proof across the studio.",
  },
];

export function getToolsByPhase(phase: ToolPhase) {
  return TOOL_STACK.filter((tool) => tool.phase === phase);
}

export function getFeaturedTool(phase: ToolPhase) {
  return getToolsByPhase(phase).find((tool) => tool.featured) ?? getToolsByPhase(phase)[0];
}
```

- [ ] **Step 4: Verify TypeScript imports**

Run:

```bash
PATH=/Users/rik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH node_modules/.bin/tsc --noEmit
```

Expected: TypeScript may still surface existing app issues, but `src/lib/toolStack.ts` should not introduce type errors.

---

## Task 2: Build Venture Console Component

**Files:**
- Create: `src/components/VentureConsole.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create client component shell**

Create `src/components/VentureConsole.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import {
  getFeaturedTool,
  getToolsByPhase,
  TOOL_PHASES,
  type ToolPhase,
  type ToolStackItem,
} from "@/lib/toolStack";

const PHASES: ToolPhase[] = ["idea", "create", "grow"];

function statusLabel(status: ToolStackItem["status"]) {
  if (status === "live") return "Live";
  if (status === "building") return "Building";
  return "Concept";
}

export function VentureConsole() {
  const [activePhase, setActivePhase] = useState<ToolPhase>("create");
  const tools = useMemo(() => getToolsByPhase(activePhase), [activePhase]);
  const featured = getFeaturedTool(activePhase);
  const phase = TOOL_PHASES[activePhase];

  return (
    <section id="tool-stack" className="mc-section mc-section--console">
      <div className="mc-section__shell">
        <div className="mc-section__kicker">tool stack · community operating system</div>
        <div className="mc-section__header mc-section__header--split">
          <h2>From idea to app to growth.</h2>
          <p>
            Midcurved is becoming a shared build console: tools, workflows, and
            ventures organized around the three phases every builder repeats.
          </p>
        </div>

        <div className="mc-console-map" data-phase={activePhase}>
          <div className="mc-console-map__wiring" aria-hidden />

          <div className="mc-console-tabs" role="tablist" aria-label="Tool stack phases">
            {PHASES.map((phaseKey) => (
              <button
                aria-selected={activePhase === phaseKey}
                className="mc-console-tabs__button"
                key={phaseKey}
                onClick={() => setActivePhase(phaseKey)}
                role="tab"
                type="button"
              >
                {TOOL_PHASES[phaseKey].eyebrow}
              </button>
            ))}
          </div>

          <div className="mc-console-core">
            <div className="mc-console-core__meta">{phase.eyebrow}</div>
            <h3>{phase.title}</h3>
            <p>{phase.description}</p>

            {featured ? (
              <a
                className="mc-console-feature"
                href={featured.href ?? "#contact"}
                target={featured.href ? "_blank" : undefined}
                rel={featured.href ? "noreferrer" : undefined}
              >
                <span className="mc-console-feature__status">
                  {statusLabel(featured.status)}
                </span>
                <span className="mc-console-feature__name">{featured.name}</span>
                <span className="mc-console-feature__copy">{featured.description}</span>
              </a>
            ) : null}
          </div>

          <div className="mc-console-modules">
            {tools.map((tool) => (
              <a
                className={`mc-console-module${
                  tool.id === featured?.id ? " is-active" : ""
                }`}
                href={tool.href ?? "#contact"}
                key={tool.id}
                target={tool.href ? "_blank" : undefined}
                rel={tool.href ? "noreferrer" : undefined}
              >
                <span className="mc-console-module__label">{tool.label}</span>
                <span className="mc-console-module__name">{tool.name}</span>
                <span className="mc-console-module__status">
                  {statusLabel(tool.status)} · {tool.parent}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add desktop Venture Console CSS**

Append to `src/app/globals.css` before the first mobile media query:

```css
.mc-section--console {
  padding-top: clamp(5rem, 9vw, 9rem);
}

.mc-console-map {
  position: relative;
  min-height: 620px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in oklch, var(--accent) 30%, var(--neutral-0) 8%);
  background:
    radial-gradient(ellipse at 50% 42%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 32rem),
    radial-gradient(ellipse at 18% 88%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 24rem),
    color-mix(in oklch, var(--neutral-1000) 74%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--neutral-0) 16%, transparent),
    0 0 90px -46px var(--accent);
}

.mc-console-map__wiring {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.62;
  background-image:
    radial-gradient(circle at 50% 52%, var(--accent) 0 4px, transparent 5px),
    linear-gradient(100deg, transparent 10%, color-mix(in oklch, var(--accent) 42%, transparent), transparent 58%),
    linear-gradient(color-mix(in oklch, var(--accent) 8%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklch, var(--accent) 8%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 44px 44px, 44px 44px;
  mask-image: radial-gradient(ellipse at 50% 50%, black, transparent 76%);
}

.mc-console-tabs {
  position: absolute;
  top: 1.4rem;
  left: 50%;
  z-index: 3;
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  padding: 0.35rem;
  transform: translateX(-50%);
  border: 1px solid color-mix(in oklch, var(--accent) 34%, transparent);
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--neutral-1000) 58%, transparent);
  backdrop-filter: blur(20px) saturate(1.35);
  -webkit-backdrop-filter: blur(20px) saturate(1.35);
}

.mc-console-tabs__button {
  min-width: 104px;
  min-height: 40px;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: color-mix(in oklch, var(--neutral-0) 68%, transparent);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.mc-console-tabs__button[aria-selected="true"] {
  background: var(--accent);
  color: var(--neutral-1000);
  box-shadow: 0 0 28px -10px var(--accent);
}

.mc-console-core {
  position: relative;
  z-index: 2;
  width: min(62vw, 660px);
  padding: clamp(1.4rem, 3vw, 2.4rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in oklch, var(--accent) 48%, var(--neutral-0) 16%);
  background:
    linear-gradient(180deg, color-mix(in oklch, var(--neutral-0) 10%, transparent), transparent 30%),
    color-mix(in oklch, var(--neutral-1000) 62%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--neutral-0) 30%, transparent),
    0 0 64px -22px var(--accent);
  text-align: center;
  backdrop-filter: blur(32px) saturate(1.45);
  -webkit-backdrop-filter: blur(32px) saturate(1.45);
}

.mc-console-core__meta,
.mc-console-feature__status,
.mc-console-module__label,
.mc-console-module__status {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.mc-console-core__meta,
.mc-console-feature__status,
.mc-console-module__label {
  color: var(--accent-300);
}

.mc-console-core h3 {
  margin-top: 0.5rem;
  color: var(--neutral-0);
  font-family: var(--font-display-middle);
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  line-height: 0.92;
}

.mc-console-core p {
  margin: 0.9rem auto 0;
  max-width: 46ch;
  color: color-mix(in oklch, var(--neutral-0) 70%, transparent);
}

.mc-console-feature {
  display: grid;
  gap: 0.35rem;
  margin: 1.4rem auto 0;
  max-width: 460px;
  padding: 1rem;
  border: 1px solid color-mix(in oklch, var(--accent) 35%, transparent);
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--accent) 9%, transparent);
  color: inherit;
  text-align: left;
}

.mc-console-feature__name {
  color: var(--neutral-0);
  font-family: var(--font-display-middle);
  font-size: var(--text-xl);
  font-weight: 800;
}

.mc-console-feature__copy {
  color: color-mix(in oklch, var(--neutral-0) 68%, transparent);
  font-size: var(--text-sm);
  line-height: 1.45;
}

.mc-console-modules {
  position: absolute;
  inset: 6.5rem 2rem 2rem;
  pointer-events: none;
}

.mc-console-module {
  position: absolute;
  width: 190px;
  min-height: 116px;
  display: grid;
  align-content: center;
  gap: 0.25rem;
  padding: 0.9rem;
  border: 1px solid color-mix(in oklch, var(--accent) 28%, var(--neutral-0) 8%);
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--neutral-1000) 58%, transparent);
  color: var(--neutral-0);
  pointer-events: auto;
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--neutral-0) 14%, transparent),
    0 0 34px -24px var(--accent);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
}

.mc-console-module:nth-child(1) { left: 4%; top: 10%; }
.mc-console-module:nth-child(2) { right: 6%; top: 13%; }
.mc-console-module:nth-child(3) { left: 8%; bottom: 18%; }
.mc-console-module:nth-child(4) { right: 9%; bottom: 17%; }

.mc-console-module.is-active {
  border-color: var(--accent);
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--neutral-0) 22%, transparent),
    0 0 46px -16px var(--accent);
}

.mc-console-module__name {
  font-family: var(--font-display-middle);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.05;
}

.mc-console-module__status {
  color: color-mix(in oklch, var(--neutral-0) 54%, transparent);
  line-height: 1.35;
}
```

- [ ] **Step 3: Add mobile Venture Console CSS**

Inside `@media (max-width: 760px)` add:

```css
.mc-console-map {
  min-height: auto;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-xl);
}

.mc-console-tabs {
  position: relative;
  top: auto;
  left: auto;
  width: 100%;
  transform: none;
}

.mc-console-tabs__button {
  min-width: 0;
}

.mc-console-core {
  width: 100%;
  padding: 1rem;
  text-align: left;
}

.mc-console-core h3 {
  font-size: clamp(2rem, 10vw, 2.8rem);
}

.mc-console-core p {
  margin-left: 0;
}

.mc-console-feature {
  max-width: none;
}

.mc-console-modules {
  position: relative;
  inset: auto;
  display: grid;
  gap: 0.75rem;
  pointer-events: auto;
}

.mc-console-module,
.mc-console-module:nth-child(n) {
  position: relative;
  inset: auto;
  width: 100%;
  min-height: 0;
}
```

- [ ] **Step 4: Verify interaction manually**

Start dev server:

```bash
PATH=/Users/rik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH node_modules/.bin/next dev --hostname 127.0.0.1 --port 3005
```

Expected: clicking `IDEA`, `CREATE`, and `GROW` changes modules and central copy.

---

## Task 3: Add Venture Console To Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import component**

Add:

```tsx
import { VentureConsole } from "@/components/VentureConsole";
```

- [ ] **Step 2: Place section after Hero**

Change the top of the returned `<main>` to:

```tsx
<main>
  <Hero />
  <VentureConsole />

  <section id="ventures" className="mc-section mc-section--ventures">
```

- [ ] **Step 3: Update ventures section copy**

Use this copy:

```tsx
<div className="mc-section__kicker">live ventures · proof layer</div>
<div className="mc-section__header">
  <h2>Live ventures.</h2>
  <p>
    The current public nodes in the Midcurved system: media, apps,
    podcasting, consulting, and accountability products shipped in public.
  </p>
</div>
```

- [ ] **Step 4: Verify order**

Open `http://127.0.0.1:3005` and confirm order:

Hero, Venture Console, Live Ventures, Channels, About, Contact, Footer.

---

## Task 4: Add Ship Season Video Section

**Files:**
- Create: `src/lib/shipSeason.ts`
- Create: `src/components/ShipSeason.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create fallback video data**

Create `src/lib/shipSeason.ts`:

```ts
export type ShipSeasonVideo = {
  id: string;
  title: string;
  kicker: string;
  href: string;
  publishedAt: string;
};

export const SHIP_SEASON_VIDEOS: ShipSeasonVideo[] = [
  {
    id: "ship-season-latest",
    title: "Building 30 apps in 30 days",
    kicker: "latest build",
    href: "https://www.youtube.com/",
    publishedAt: "Ship Season",
  },
  {
    id: "prd-generator",
    title: "Turning raw ideas into app specs",
    kicker: "idea",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
  {
    id: "prototype-sprint",
    title: "From prompt to working prototype",
    kicker: "create",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
  {
    id: "launch-loop",
    title: "Shipping, posting, learning, repeating",
    kicker: "grow",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
];
```

- [ ] **Step 2: Create ShipSeason component**

Create `src/components/ShipSeason.tsx`:

```tsx
import { SHIP_SEASON_VIDEOS } from "@/lib/shipSeason";

export function ShipSeason() {
  const [featured, ...videos] = SHIP_SEASON_VIDEOS;

  return (
    <section id="ship-season" className="mc-section mc-section--ship">
      <div className="mc-section__shell">
        <div className="mc-section__kicker">ship season · latest builds</div>
        <div className="mc-section__header mc-section__header--split">
          <h2>30 apps. 30 days.</h2>
          <p>
            The build log behind the system: long-form videos documenting the
            tools, decisions, experiments, and launches as they happen.
          </p>
        </div>

        <div className="mc-ship-grid">
          <a className="mc-ship-feature" href={featured.href} target="_blank" rel="noreferrer">
            <span className="mc-ship-card__kicker">{featured.kicker}</span>
            <span className="mc-ship-feature__play" aria-hidden>▶</span>
            <span className="mc-ship-card__title">{featured.title}</span>
            <span className="mc-ship-card__date">{featured.publishedAt}</span>
          </a>

          <div className="mc-ship-list">
            {videos.map((video) => (
              <a className="mc-ship-card" href={video.href} key={video.id} target="_blank" rel="noreferrer">
                <span className="mc-ship-card__thumb" aria-hidden />
                <span className="mc-ship-card__body">
                  <span className="mc-ship-card__kicker">{video.kicker}</span>
                  <span className="mc-ship-card__title">{video.title}</span>
                  <span className="mc-ship-card__date">{video.publishedAt}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add desktop Ship Season CSS**

Append before mobile media query:

```css
.mc-section--ship::before {
  background:
    radial-gradient(ellipse at 16% 16%, color-mix(in oklch, var(--accent) 15%, transparent), transparent 30rem),
    radial-gradient(ellipse at 86% 60%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 34rem);
}

.mc-ship-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.mc-ship-feature,
.mc-ship-card {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--accent) 32%, var(--neutral-0) 8%);
  background:
    linear-gradient(180deg, color-mix(in oklch, var(--neutral-0) 8%, transparent), transparent 42%),
    color-mix(in oklch, var(--neutral-1000) 60%, transparent);
  color: var(--neutral-0);
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--neutral-0) 18%, transparent),
    0 0 54px -34px var(--accent);
}

.mc-ship-feature {
  min-height: 420px;
  display: grid;
  align-content: end;
  gap: 0.6rem;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: var(--radius-2xl);
}

.mc-ship-feature::before,
.mc-ship-card__thumb::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 44% 42%, color-mix(in oklch, var(--accent) 38%, transparent), transparent 32%),
    linear-gradient(135deg, color-mix(in oklch, var(--accent) 18%, transparent), transparent 42%),
    repeating-linear-gradient(90deg, transparent 0 26px, color-mix(in oklch, var(--accent) 9%, transparent) 27px 28px);
  opacity: 0.78;
}

.mc-ship-feature > * {
  position: relative;
}

.mc-ship-feature__play {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--neutral-1000);
  box-shadow: 0 0 36px -10px var(--accent);
}

.mc-ship-card__kicker,
.mc-ship-card__date {
  color: var(--accent-300);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.mc-ship-card__title {
  color: var(--neutral-0);
  font-family: var(--font-display-middle);
  font-size: clamp(1.25rem, 2.3vw, 2rem);
  font-weight: 800;
  line-height: 1.02;
}

.mc-ship-list {
  display: grid;
  gap: 1rem;
}

.mc-ship-card {
  min-height: 126px;
  display: grid;
  grid-template-columns: 148px minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding: 0.8rem;
  border-radius: var(--radius-xl);
}

.mc-ship-card__thumb {
  position: relative;
  min-height: 96px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--accent) 10%, transparent);
}

.mc-ship-card__body {
  display: grid;
  gap: 0.35rem;
}
```

- [ ] **Step 4: Add mobile Ship Season CSS**

Inside `@media (max-width: 760px)` add:

```css
.mc-ship-grid {
  grid-template-columns: 1fr;
}

.mc-ship-feature {
  min-height: 300px;
  border-radius: var(--radius-xl);
}

.mc-ship-card {
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 0.75rem;
}

.mc-ship-card__thumb {
  min-height: 76px;
}
```

- [ ] **Step 5: Import and place after ventures**

In `src/app/page.tsx`, add:

```tsx
import { ShipSeason } from "@/components/ShipSeason";
```

Place after the ventures section and before channels:

```tsx
<ShipSeason />
```

---

## Task 5: Update About Proof Stats

**Files:**
- Create: `src/components/ProofStats.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create ProofStats component**

Create `src/components/ProofStats.tsx`:

```tsx
const STATS = [
  {
    value: "5M+",
    label: "views generated",
  },
  {
    value: "10K+",
    label: "total audience and growing",
  },
  {
    value: "30+",
    label: "apps shipped and compounding daily",
  },
];

export function ProofStats() {
  return (
    <div className="mc-proof-stats" aria-label="Midcurved proof stats">
      {STATS.map((stat) => (
        <div className="mc-proof-stat" key={stat.value}>
          <span className="mc-proof-stat__value">{stat.value}</span>
          <span className="mc-proof-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Place stats in about section**

In `src/app/page.tsx`, import:

```tsx
import { ProofStats } from "@/components/ProofStats";
```

Inside the about text column, after the two paragraphs, add:

```tsx
<ProofStats />
```

- [ ] **Step 3: Add stat CSS**

Append before mobile media query:

```css
.mc-proof-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.mc-proof-stat {
  display: grid;
  gap: 0.25rem;
  padding: 0.9rem;
  border-radius: var(--radius-lg);
  border: 1px solid color-mix(in oklch, var(--accent) 24%, transparent);
  background: color-mix(in oklch, var(--neutral-1000) 44%, transparent);
}

.mc-proof-stat__value {
  color: var(--accent);
  font-family: var(--font-display-middle);
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  font-weight: 800;
  line-height: 0.95;
}

.mc-proof-stat__label {
  color: color-mix(in oklch, var(--neutral-0) 66%, transparent);
  font-size: var(--text-sm);
  line-height: 1.35;
}
```

- [ ] **Step 4: Add mobile stat CSS**

Inside `@media (max-width: 760px)` add:

```css
.mc-proof-stats {
  grid-template-columns: 1fr;
}
```

---

## Task 6: Repair Mobile Hero And Mobile Stack

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Keep desktop hero untouched**

Do not change `.mc-desktop-hero` markup except for bug fixes.

- [ ] **Step 2: Reduce mobile first viewport density**

In `src/app/globals.css`, inside `@media (max-width: 760px)`, update:

```css
.mc-mobile-hero__first {
  min-height: auto;
  width: min(100%, calc(100vw - 1.4rem));
  max-width: calc(100vw - 1.4rem);
  justify-content: start;
  padding: 2rem 0 1.25rem;
}

.mc-mobile-console {
  padding: 0.95rem;
  border-radius: 1rem;
}

.mc-mobile-console h1 {
  font-size: clamp(2.45rem, 11vw, 3rem);
  line-height: 0.88;
}

.mc-mobile-console__lead {
  max-width: 16ch;
  font-size: clamp(1.18rem, 6vw, 1.55rem);
}

.mc-mobile-console__copy {
  max-width: 29ch;
  font-size: 0.9rem;
}

.mc-mobile-console__actions {
  grid-template-columns: 1fr;
}
```

- [ ] **Step 3: Add mobile section rhythm**

In `src/app/globals.css`, inside `@media (max-width: 760px)`, make the full page read as a deliberate mobile stack:

```css
.mc-section {
  padding: 3.4rem 0;
}

.mc-section__shell {
  width: min(100% - 1.4rem, 1200px);
}

.mc-section__header,
.mc-section__header--split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
  margin-bottom: 1.35rem;
}

.mc-section h2,
.mc-contact-panel h2,
.mc-about-grid h2 {
  max-width: 10ch;
  font-size: clamp(2.15rem, 11vw, 3.15rem);
}

.mc-section p,
.mc-about-grid p,
.mc-contact-panel p {
  max-width: 34ch;
  font-size: 0.96rem;
  line-height: 1.55;
}
```

- [ ] **Step 4: Make mobile Venture Console feel like a tool stack, not a shrunken map**

In `src/app/globals.css`, inside `@media (max-width: 760px)`, verify or add:

```css
.mc-section--console {
  padding-top: 3.8rem;
}

.mc-console-map {
  overflow: visible;
}

.mc-console-map__wiring {
  inset: 4.2rem 1.25rem 1.2rem;
  opacity: 0.72;
  background:
    linear-gradient(180deg, var(--accent), color-mix(in oklch, var(--accent) 24%, transparent), transparent);
  width: 1px;
  left: 1.5rem;
  right: auto;
  box-shadow: 0 0 18px color-mix(in oklch, var(--accent) 56%, transparent);
  mask-image: none;
}

.mc-console-tabs {
  position: sticky;
  top: 0.65rem;
  z-index: 6;
}

.mc-console-module {
  min-height: 84px;
  padding-left: 1rem;
}
```

Expected: on mobile the console is a clear sequence: intro, phase tabs, active featured card, then tool rows.

- [ ] **Step 5: Make mobile Live Ventures the canonical venture stack**

In `src/app/globals.css`, inside `@media (max-width: 760px)`, ensure:

```css
.mc-venture-grid {
  display: none;
}

.mc-section-venture-timeline {
  display: grid;
}

.mc-venture-timeline {
  padding-left: 1.15rem;
}

.mc-venture-timeline__item {
  grid-template-columns: 48px minmax(0, 1fr);
  padding: 0.75rem;
}

.mc-venture-timeline__action {
  grid-column: 2;
  justify-self: start;
}
```

Expected: the mobile ventures section is a vertical timeline, not a card grid.

- [ ] **Step 6: Confirm no horizontal overflow**

Run Chrome screenshot:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=390,844 --screenshot=/private/tmp/midcurved-mobile-hero-v2.png http://127.0.0.1:3005
```

Expected: no section exceeds the 390px viewport width; hero CTA text fits.

- [ ] **Step 7: Confirm mobile Venture Console**

Temporarily scroll or capture the console area:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=390,1200 --screenshot=/private/tmp/midcurved-mobile-console-v2.png http://127.0.0.1:3005#tool-stack
```

Expected: `Idea / Create / Grow` tabs are visible, tool rows fit, and active-phase content can be understood without desktop context.

- [ ] **Step 8: Confirm mobile full-page rhythm**

Capture a taller mobile page:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=390,1800 --screenshot=/private/tmp/midcurved-mobile-full-v2.png http://127.0.0.1:3005
```

Expected: hero, Venture Console, Live Ventures, and Ship Season appear as clean stacked sections with consistent spacing.

---

## Task 7: Final QA

**Files:**
- All modified files

- [ ] **Step 1: Run lint**

Run:

```bash
PATH=/Users/rik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH node_modules/.bin/eslint
```

Expected: no lint errors.

- [ ] **Step 2: Run build**

Run:

```bash
PATH=/Users/rik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH node_modules/.bin/next build
```

Expected: production build completes.

- [ ] **Step 3: Capture desktop screenshot**

Run:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,1000 --screenshot=/private/tmp/midcurved-desktop-v2.png http://127.0.0.1:3005
```

Expected: hero remains strong; Venture Console appears directly below; no broken layout at first fold.

- [ ] **Step 4: Capture mobile screenshot**

Run:

```bash
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=390,844 --screenshot=/private/tmp/midcurved-mobile-v2.png http://127.0.0.1:3005
```

Expected: mobile hero is purpose-built; Venture Console is a vertical stack; no horizontal overflow.

- [ ] **Step 5: Manual interaction pass**

Verify:

- `IDEA`, `CREATE`, `GROW` tabs update content.
- External venture links still work.
- Ship Season cards open YouTube placeholder links.
- Contact section is still reachable.
- Mobile tap targets are at least 44px tall where practical.

---

## Execution Notes

- Preserve current desktop hero visual direction.
- Do not redesign vibecode.fun or other venture websites.
- Keep live venture list unchanged.
- Start Ship Season with fallback video data today; replace with YouTube playlist/RSS fetch once the playlist source is known.
- Prefer `4` videos in the section: one featured plus three supporting.
- About proof stats must use:
  - `5M+` views generated
  - `10K+` total audience and growing
  - `30+` apps shipped and compounding daily
