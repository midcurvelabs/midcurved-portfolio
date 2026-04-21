import { getPodcastCard, getSubstackCard, type FeedCard } from "@/lib/feeds";

const PRODUCT_CARD: FeedCard = {
  tag: "product",
  title: "Claim your vibecode.fun handle",
  body: "Builder profiles are open. Lock in your name before launch.",
  href: "https://vibecode.fun",
};

export async function AiAmbientPanel() {
  const [newsletter, podcast] = await Promise.all([
    getSubstackCard(),
    getPodcastCard(),
  ]);
  const SUGGESTIONS: FeedCard[] = [newsletter, podcast, PRODUCT_CARD];
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-6) var(--space-5)",
        background: "oklch(0.13 0.010 85)",
        color: "var(--neutral-100)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(ellipse at 30% 10%, color-mix(in oklch, var(--accent) 30%, transparent), transparent 60%), radial-gradient(ellipse at 80% 90%, color-mix(in oklch, var(--accent-700) 25%, transparent), transparent 60%)",
          filter: "blur(60px)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          background: "oklch(0.22 0.010 85)",
          border: "1px solid oklch(0.30 0.010 85)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--space-4) var(--space-5)",
          marginBottom: "var(--space-4)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--neutral-200)",
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>you → </span>
        what should I read first on midcurved?
      </div>

      <div
        style={{
          background: "color-mix(in oklch, var(--accent) 8%, transparent)",
          backdropFilter: "blur(32px) saturate(1.5)",
          WebkitBackdropFilter: "blur(32px) saturate(1.5)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-5)",
          boxShadow:
            "0 0 80px -12px color-mix(in oklch, var(--accent) 45%, transparent)",
          border: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-mega)",
            color: "var(--accent-300)",
            marginBottom: "var(--space-3)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent)",
              boxShadow: "0 0 12px var(--accent)",
              animation: "mc-pulse 2.4s var(--ease-in-out) infinite",
            }}
          />
          midcurved · what to read first
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {SUGGESTIONS.map((s) => {
            const cardStyle: React.CSSProperties = {
              background: "color-mix(in oklch, var(--neutral-0) 6%, transparent)",
              border: "1px solid color-mix(in oklch, var(--neutral-0) 12%, transparent)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4)",
              color: "var(--neutral-100)",
              display: "block",
              textDecoration: "none",
              transition: "border-color var(--dur-fast) var(--ease-out)",
            };
            const Tag = s.href ? "a" : "div";
            const hrefProps = s.href
              ? { href: s.href, target: "_blank", rel: "noreferrer" }
              : {};
            return (
            <Tag
              key={s.tag}
              {...hrefProps}
              style={cardStyle}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  color: "var(--accent-300)",
                }}
              >
                {s.tag}
              </span>
              <h4
                style={{
                  fontFamily: "var(--font-display-middle)",
                  fontSize: "var(--text-lg)",
                  color: "var(--neutral-0)",
                  marginTop: "var(--space-2)",
                }}
              >
                {s.title}
              </h4>
              <p
                style={{
                  margin: "var(--space-2) 0 0",
                  color: "color-mix(in oklch, var(--neutral-0) 70%, transparent)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {s.body}
              </p>
            </Tag>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "var(--space-4)",
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in oklch, var(--accent) 14%, transparent)",
            color: "var(--neutral-50)",
            fontSize: "var(--text-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-3)",
            flexWrap: "wrap",
          }}
        >
          <span>
            <strong>Personalized for you</strong> · based on which venture you
            clicked first
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--accent-300)",
            }}
          >
            calm AI · no spam
          </span>
        </div>
      </div>

      <style>{`@keyframes mc-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
