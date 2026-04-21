import { Hero } from "@/components/Hero";
import { VentureLink } from "@/components/VentureLink";
import { ChannelsStrip } from "@/components/ChannelsStrip";
import { AiAmbientPanel } from "@/components/AiAmbientPanel";
import { ContactForm } from "@/components/ContactForm";
import { VENTURES } from "@/lib/ventures";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 var(--space-5)",
};

const sectionPadding: React.CSSProperties = {
  padding: "var(--space-9) 0",
  borderTop: "1px solid var(--border-subtle)",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-mega)",
  color: "var(--accent-300)",
  marginBottom: "var(--space-4)",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-display-middle)",
  fontSize: "var(--text-4xl)",
  letterSpacing: "var(--tracking-tight)",
  color: "var(--neutral-0)",
  marginBottom: "var(--space-4)",
  maxWidth: "28ch",
};

const bodyText: React.CSSProperties = {
  color: "var(--text-secondary)",
  fontSize: "var(--text-base)",
  maxWidth: "62ch",
  lineHeight: 1.6,
};

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="ventures" style={sectionPadding}>
        <div style={container}>
          <div style={eyebrow}>ventures · built in public</div>
          <h2 style={sectionTitle}>Public portfolio.</h2>
          <p style={{ ...bodyText, marginBottom: "var(--space-7)" }}>
            Every venture is a node on the same system — apps, a podcast, a
            newsletter, a consultancy. Each one ships in public, and the list
            keeps growing.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {VENTURES.map((v) => (
              <VentureLink key={v.id} venture={v} />
            ))}
          </div>
        </div>
      </section>

      <section id="channels" style={sectionPadding}>
        <div style={container}>
          <div style={eyebrow}>channels · follow the work</div>
          <h2 style={sectionTitle}>Where it ships.</h2>
          <p style={{ ...bodyText, marginBottom: "var(--space-6)" }}>
            Long-form on YouTube and Substack, clips on IG and X, the podcast
            on Spotify. Pick your poison.
          </p>
          <ChannelsStrip />
        </div>
      </section>

      <section id="about" style={sectionPadding}>
        <div style={container}>
          <div style={eyebrow}>about · the operator</div>
          <h2 style={sectionTitle}>Rik ships in public.</h2>
          <p style={{ ...bodyText, marginBottom: "var(--space-5)" }}>
            Builder, ex-crypto operator, now full-time at the midcurve: where
            AI-native products meet native-media distribution. Consulting
            anchors the cashflow (BeClaire), the podcast and newsletter
            compound the audience, and the apps are the experiments that
            become the proof.
          </p>
          <p style={{ ...bodyText, marginBottom: "var(--space-7)" }}>
            Every build here uses the same design system. Every output is a
            byproduct of the work. The site you're reading is the first
            surface — the rest of the ventures are rolling onto it.
          </p>
          <AiAmbientPanel />
        </div>
      </section>

      <section id="contact" style={sectionPadding}>
        <div style={container}>
          <div style={eyebrow}>contact · low-friction</div>
          <h2 style={sectionTitle}>Send a signal.</h2>
          <p style={{ ...bodyText, marginBottom: "var(--space-6)" }}>
            Consulting inquiry, podcast pitch, collaboration, or a question
            about one of the ventures — all land in the same inbox. Short is
            fine.
          </p>
          <ContactForm />
        </div>
      </section>

      <footer
        style={{
          padding: "var(--space-7) 0",
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        <div
          style={{
            ...container,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-3)",
          }}
        >
          <span>midcurved · shipped in public</span>
          <span>the curve is the system</span>
        </div>
      </footer>
    </main>
  );
}
