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
                aria-controls={`mc-console-panel-${phaseKey}`}
                aria-selected={activePhase === phaseKey}
                className="mc-console-tabs__button"
                id={`mc-console-tab-${phaseKey}`}
                key={phaseKey}
                onClick={() => setActivePhase(phaseKey)}
                role="tab"
                type="button"
              >
                {TOOL_PHASES[phaseKey].eyebrow}
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`mc-console-tab-${activePhase}`}
            className="mc-console-core"
            id={`mc-console-panel-${activePhase}`}
            role="tabpanel"
          >
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
