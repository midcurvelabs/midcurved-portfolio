import { Crosshair, FieldRule } from "@/components/FieldMarks";

const BOARD = [
  {
    rank: "01",
    name: "GodModePod",
    href: "https://godmodepod.com",
    status: "compounding",
    line: "Weekly AI, crypto, and builder show with cohost Ben.",
  },
  {
    rank: "02",
    name: "BeClaire",
    href: "https://beclaire.be",
    status: "compounding",
    line: "AI consultancy for European operators.",
  },
  {
    rank: "03",
    name: "RikGPT",
    href: "https://youtube.com/@rikgpt",
    status: "compounding",
    line: "Solo camera. Long-form and short-form from the same life.",
  },
  {
    rank: "04",
    name: "vibecode.fun",
    href: "https://vibecode.fun",
    status: "compounding",
    line: "Public workshop for people shipping AI-assisted apps.",
  },
  {
    rank: "05",
    name: "TestDrive",
    href: null,
    status: "in play",
    line: "Paid expert feedback and creator campaigns for indie products.",
  },
  {
    rank: "06",
    name: "SideKick",
    href: "https://sidekick.midcurved.com",
    status: "in play",
    line: "Voice interviewer for creators filming alone. Closed beta.",
  },
  {
    rank: "07",
    name: "DirtyLingo",
    href: null,
    status: "in play",
    line: "Adult Portuguese, the way people actually talk.",
  },
  {
    rank: "08",
    name: "Distance Games",
    href: "https://distancegames.midcurved.com",
    status: "in play",
    line: "LDR game for couples. Dogfooded.",
  },
  {
    rank: "09",
    name: "GodMode Studio",
    href: null,
    status: "in play",
    line: "Pre to post production studio for the show. Docket to content kit. Still being rebuilt.",
  },
] as const;

const GRAVEYARD = [
  {
    name: "Disk Doctor",
    year: "2026",
    blurb: "A Mac cleaner for AI junk. Fun video. Wrong business.",
    lesson: "If it does not feed the distribution surface, it is a sunk-cost trap.",
  },
  {
    name: "Favicon & Logo Generator",
    year: "2026",
    blurb: "Shipped. Converted. Then sat there looking like a company.",
    lesson: "A checkout is not a category.",
  },
  {
    name: "Idea Generator",
    year: "2026",
    blurb: "Folded into 30x30. Two products, one job.",
    lesson: "Do not ship a second front door for the same itch.",
  },
  {
    name: "Blockcareers",
    year: "2023",
    blurb: "Crypto job board. Co-founded it. Five months, no MVP. The developer never delivered.",
    lesson: "If you cannot see the work, there is no work.",
  },
  {
    name: "The hedge fund",
    year: "2023",
    blurb: "Same partner as Blockcareers. He brought capital, I tested trades. It never became a fund.",
    lesson: "A partner and a plan is not a company.",
  },
] as const;

const RECORD = [
  {
    name: "WeRate",
    meta: "2025",
    line: "Solana-native rating product. GTM and community with the team.",
  },
  {
    name: "Qualoo",
    meta: "CMO · 2024–2025",
    line: "Pre-seed DePIN. More operator than CMO. Left when the work drained more than it built.",
  },
  {
    name: "Alpaca Network",
    meta: "Advisor · 2024–2025",
    line: "Hands-on through token launch. $1.5M raise / $3M FDV.",
  },
  {
    name: "Enjinstarter",
    meta: "CMO · 2024",
    line: "Joined a burned community. Rebuilt sentiment with content and live programming.",
  },
  {
    name: "Blockcareers",
    meta: "Co-Founder · 2023",
    line: "Tried to build a crypto job board. It failed. Then a hedge fund with the same partner that never actually happened.",
  },
  {
    name: "Nomad years",
    meta: "2022",
    line: "Travel and content. Thailand and the road. No job. The year that broke the Belgian default.",
  },
  {
    name: "PAID Network",
    meta: "Head of Marketing & Community · 2021",
    line: "75+ Ignition launches in 11 months. Public account ~30k to ~135k.",
  },
  {
    name: "Boondoggle",
    meta: "Consultant → PM · 2019–2020",
    line: "Where the project-management journey started. Agency years. Process and clients.",
  },
] as const;

function pillClass(status: string) {
  return status === "compounding" ? "pill pill--live" : "pill pill--play";
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="shell nav__inner">
          <a className="nav__brand" href="#top">
            <Crosshair />
            midcurved
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#board">Board</a>
            <a href="#graveyard">Graveyard</a>
            <a href="#record">Record</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav__cta" href="mailto:hello@midcurved.com">
            Email Rik
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="shell">
            <p className="hero__meta mono">
              <Crosshair />
              rik eerdekens · ledger / 2026
            </p>
            <h1>I build products. The dead ones stay on the board.</h1>
            <p className="hero__sub">
              I&apos;m Rik. I used to market other people&apos;s launches. Now I
              ship my own: a weekly show, an AI consultancy, a builder platform,
              and a pile of experiments that earned their tombstones.
            </p>
            <div className="chips" aria-label="Career record">
              <div className="chip">
                <b>4</b>
                <span className="mono">compounding</span>
              </div>
              <div className="chip">
                <b>5</b>
                <span className="mono">in play</span>
              </div>
              <div className="chip">
                <b>5</b>
                <span className="mono">buried</span>
              </div>
            </div>
            <p className="hero__links mono">
              <a href="https://x.com/rikventure">@rikventure</a>
              <a href="https://godmodepod.com">GodModePod</a>
              <a href="https://youtube.com/@rikgpt">RikGPT</a>
              <a href="https://linkedin.com/in/rik-eerdekens">LinkedIn</a>
            </p>
          </div>
        </section>

        <div className="shell">
          <FieldRule className="rule" />
        </div>

        <section id="about" className="section">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              about
            </p>
            <h2>The midcurve is the job.</h2>
            <div className="prose">
              <p>I&apos;m a builder, operator, and creator.</p>
              <p>
                From Belgium → crypto CMO → nomad years → creator. I ran
                marketing and community for a crypto venture studio and various
                startups.
              </p>
              <p>
                Midcurved is the parent name. RikGPT is the solo camera.
                GodModePod is the weekly show with cohost Ben. BeClaire is how
                the lights stay on. vibecode.fun is the public workshop.
                Everything else is on the board below, including the ones I
                killed.
              </p>
            </div>
          </div>
        </section>

        <section id="now" className="section">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              now · 2026
            </p>
            <h2>What I am actually doing.</h2>
            <ol className="now-list">
              <li>
                <strong>BeClaire</strong>
                <span>AI workflows for real operators. Cash first.</span>
              </li>
              <li>
                <strong>GodModePod</strong>
                <span>Weekly AI / crypto / builder show. The public voice.</span>
              </li>
              <li>
                <strong>RikGPT</strong>
                <span>Long-form and short-form from the same life.</span>
              </li>
              <li>
                <strong>Creator stack</strong>
                <span>vibecode.fun + TestDrive. Tools and distribution.</span>
              </li>
            </ol>
            <p className="note">
              Side bets: DirtyLingo, Distance Games, SideKick. Everything else
              is parked or buried on purpose. Remote.
            </p>
          </div>
        </section>

        <section id="board" className="section">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              the leaderboard
            </p>
            <h2>Every product. Ranked by outcome.</h2>
            <p className="prose">
              Dead work stays on the list. It paid for the rows above it.
            </p>
            <div className="board">
              {BOARD.map((item) => {
                const inner = (
                  <>
                    <span className="row__rank mono">{item.rank}</span>
                    <span>
                      <span className="row__name">{item.name}</span>
                      <span className="row__line">{item.line}</span>
                    </span>
                    <span className={pillClass(item.status)}>{item.status}</span>
                  </>
                );
                return item.href ? (
                  <a key={item.rank} className="row" href={item.href}>
                    {inner}
                  </a>
                ) : (
                  <div key={item.rank} className="row">
                    {inner}
                  </div>
                );
              })}
            </div>
            <div className="parked">
              <p className="mono">also shipped / parked</p>
              <p>
                30x30 · Accountability OS · TheRikOS · Noyal · Banskonnect · PRD
                Generator · TAO Wiki · Creator Launch
              </p>
            </div>
          </div>
        </section>

        <section id="graveyard" className="section">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              the graveyard
            </p>
            <h2>Products I killed.</h2>
            <p className="prose">
              Not ideas. Things that had a name, a URL, or real weeks. Each one
              bought a sentence I still use.
            </p>
            <div className="cards">
              {GRAVEYARD.map((item) => (
                <article key={item.name} className="card">
                  <p className="mono">
                    receipt // killed · {item.year}
                  </p>
                  <h3>{item.name}</h3>
                  <p>{item.blurb}</p>
                  <p className="lesson">{item.lesson}</p>
                </article>
              ))}
            </div>
            <p className="note">
              The real skill is knowing when to quit. Timing is the product.
            </p>
          </div>
        </section>

        <section id="record" className="section record">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              the record
            </p>
            <h2>The years.</h2>
            <p className="prose">
              Jobs, a year on the road, a startup that died. Nothing skipped.
            </p>
            <div className="cards">
              {RECORD.map((item) => (
                <article key={item.name} className="card">
                  <h3>{item.name}</h3>
                  <span className="done mono">{item.meta}</span>
                  <p>{item.line}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="shell">
            <p className="kicker mono">
              <Crosshair />
              contact
            </p>
            <h2>Send the short version.</h2>
            <p className="prose">
              Consulting, podcast, a product you shipped, a product you killed.
            </p>
            <a className="mail" href="mailto:hello@midcurved.com">
              hello@midcurved.com
            </a>
            <p className="contact__links mono">
              <a href="https://x.com/rikventure">x.com/rikventure</a>
              <a href="https://godmodepod.com">godmodepod.com</a>
              <a href="https://youtube.com/@rikgpt">youtube.com/@rikgpt</a>
              <a href="https://linkedin.com/in/rik-eerdekens">LinkedIn</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", width: "100%" }}>
          <span className="mono">midcurved · rikventure</span>
          <span className="mono">© 2026 rik eerdekens</span>
        </div>
      </footer>
    </>
  );
}
