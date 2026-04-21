import type { Mode } from "@/lib/ventures";

type Props = {
  mode: Mode;
  accent: string;
  label?: string;
};

const MODE_GLYPH: Record<Mode, string> = {
  left: "◻",
  middle: "◆",
  right: "◎",
};

export function AccentBadge({ mode, accent, label }: Props) {
  const text = label ?? mode.toUpperCase();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-mega)",
        padding: "var(--space-1) var(--space-3)",
        borderRadius: "var(--radius-full)",
        background: `color-mix(in oklch, ${accent} 12%, transparent)`,
        border: `1px solid color-mix(in oklch, ${accent} 35%, transparent)`,
        color: `color-mix(in oklch, ${accent} 70%, var(--neutral-50))`,
      }}
    >
      <span aria-hidden style={{ color: accent }}>
        {MODE_GLYPH[mode]}
      </span>
      {text}
    </span>
  );
}
