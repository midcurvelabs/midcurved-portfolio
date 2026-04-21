import { MIDCURVED_ONELINER } from "@/lib/ventures";

export function Hero() {
  return (
    <header
      style={{
        position: "relative",
        padding: "var(--space-9) 0 var(--space-8)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Yellow through-line — the Curve's signature */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 55%), radial-gradient(ellipse at 90% 80%, color-mix(in oklch, var(--accent-700) 18%, transparent), transparent 55%)",
          filter: "blur(60px)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "42%",
          width: "100%",
          height: "160px",
          zIndex: -1,
          opacity: 0.75,
          filter: "drop-shadow(0 0 24px var(--accent))",
        }}
      >
        <defs>
          <linearGradient id="mc-curve" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 170 C 200 170, 280 30, 500 30 C 720 30, 800 170, 1000 170"
          fill="none"
          stroke="url(#mc-curve)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--space-5)" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-mega)",
            color: "var(--accent-300)",
            marginBottom: "var(--space-4)",
          }}
        >
          midcurved · builder media studio + product lab
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display-middle)",
            fontSize: "var(--text-6xl)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--neutral-0)",
            marginBottom: "var(--space-5)",
            lineHeight: 1.05,
          }}
        >
          Shipped in public.
          <br />
          The curve is the system.
        </h1>
        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            maxWidth: "62ch",
            margin: 0,
          }}
        >
          {MIDCURVED_ONELINER}
        </p>
      </div>
    </header>
  );
}
