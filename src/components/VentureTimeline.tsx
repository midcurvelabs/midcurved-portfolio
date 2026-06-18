import { VENTURES } from "@/lib/ventures";
import {
  VENTURE_LABELS,
  VENTURE_MARKS,
  VENTURE_PREVIEW_COPY,
} from "@/lib/venturePresentation";

type Props = {
  className?: string;
  compact?: boolean;
};

export function VentureTimeline({ className = "", compact = false }: Props) {
  return (
    <div
      className={`mc-venture-timeline${compact ? " mc-venture-timeline--compact" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {VENTURES.map((venture) => (
        <a
          className="mc-venture-timeline__item"
          href={venture.href}
          key={venture.id}
          rel="noreferrer"
          target="_blank"
        >
          <span className="mc-venture-timeline__node" aria-hidden />
          <span className="mc-venture-timeline__mark">
            {VENTURE_MARKS[venture.id] ?? venture.name}
          </span>
          <span className="mc-venture-timeline__body">
            <span className="mc-venture-timeline__meta">
              {VENTURE_LABELS[venture.id] ?? venture.mode}
            </span>
            <span className="mc-venture-timeline__name">{venture.name}</span>
            <span className="mc-venture-timeline__copy">
              {VENTURE_PREVIEW_COPY[venture.id] ?? venture.oneLiner}
            </span>
          </span>
          <span className="mc-venture-timeline__action">
            Explore <span aria-hidden>→</span>
          </span>
        </a>
      ))}
    </div>
  );
}
