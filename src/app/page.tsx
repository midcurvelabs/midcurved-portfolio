import { Hero } from "@/components/Hero";
import { ChannelsStrip } from "@/components/ChannelsStrip";
import { AiAmbientPanel } from "@/components/AiAmbientPanel";
import { ContactForm } from "@/components/ContactForm";
import { ProofStats } from "@/components/ProofStats";
import { ShipSeason } from "@/components/ShipSeason";
import { VentureConsole } from "@/components/VentureConsole";
import { MobileLanding } from "@/components/MobileLanding";

export default function Home() {
  return (
    <main>
      <MobileLanding />
      <div className="mc-desktop-page">
        <Hero />
        <VentureConsole />

        <ShipSeason />

        <section id="channels" className="mc-section">
          <div className="mc-section__shell">
            <div className="mc-section__kicker">channels · follow the work</div>
            <div className="mc-section__header mc-section__header--split">
              <h2>Where it ships.</h2>
              <p>
                Long-form on YouTube and Substack, clips on IG and X, the podcast
                on Spotify. Choose the surface that matches how you follow the work.
              </p>
            </div>
            <div className="mc-panel">
              <ChannelsStrip />
            </div>
          </div>
        </section>

        <section id="about" className="mc-section">
          <div className="mc-section__shell">
            <div className="mc-section__kicker">about · the operator</div>
            <div className="mc-about-grid">
              <div>
                <h2>Rik ships in public.</h2>
                <p className="mc-desktop-copy">
                  Builder, ex-crypto operator, now full-time at the midcurve:
                  where AI-native products meet native-media distribution.
                  Consulting anchors the cashflow, the podcast and newsletter
                  compound the audience, and the apps become the proof.
                </p>
                <p className="mc-desktop-copy">
                  Every build here uses the same design system. Every output is a
                  byproduct of the work. Midcurved is the parent console for the
                  ventures rolling out underneath it.
                </p>
                <p className="mc-mobile-only">
                  Builder media, AI-native apps, and public experiments under one
                  parent brand.
                </p>
                <ProofStats />
              </div>
              <AiAmbientPanel />
            </div>
          </div>
        </section>

        <section id="contact" className="mc-section mc-section--contact">
          <div className="mc-section__shell">
            <div className="mc-contact-panel">
              <div>
                <div className="mc-section__kicker">contact · low-friction</div>
                <h2>Send a signal.</h2>
                <p>
                  Consulting inquiry, podcast pitch, collaboration, or a question
                  about one of the ventures. Short is fine.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="mc-footer">
          <div className="mc-section__shell">
            <span>midcurved · shipped in public</span>
            <span>the curve is the system</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
