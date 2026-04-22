export type Mode = "left" | "middle" | "right";

export type Venture = {
  id: string;
  name: string;
  mode: Mode;
  accentVar: string;
  accentHex: string;
  oneLiner: string;
  href: string;
  hrefStatus: "confirmed" | "todo";
};

// Accent hex values match the --venture-* tokens in tokens.css.
// Kept here as literals so AccentBadge can inline them without CSS var resolution on the server.
export const VENTURES: Venture[] = [
  {
    id: "rikos",
    name: "TheRikOS",
    mode: "left",
    accentVar: "--venture-rikos",
    accentHex: "oklch(0.82 0.20 85)",
    oneLiner:
      "Newsletter + YouTube documenting how a Bulgaria-based founder runs health, wealth, relationships and self-mastery. Weekly, first-person, built in public.",
    href: "https://therikos.substack.com/",
    hrefStatus: "confirmed",
  },
  {
    id: "vibecode",
    name: "vibecode.fun",
    mode: "middle",
    accentVar: "--venture-vibecode",
    accentHex: "oklch(0.68 0.26 340)",
    oneLiner:
      "Native home for people shipping AI-assisted apps. Creator profiles, skills marketplace, first real payouts on the way.",
    href: "https://vibecode.fun",
    hrefStatus: "confirmed",
  },
  {
    id: "godmodepod",
    name: "GodModePod",
    mode: "middle",
    accentVar: "--venture-godmodepod",
    accentHex: "oklch(0.60 0.22 25)",
    oneLiner:
      "Weekly podcast + YouTube for builders in AI, crypto, web3. Three hosts, no fluff, clips shipping across every platform.",
    href: "https://godmodepod.com",
    hrefStatus: "confirmed",
  },
  {
    id: "beclaire",
    name: "BeClaire",
    mode: "middle",
    accentVar: "--venture-beclaire",
    accentHex: "oklch(0.68 0.18 245)",
    oneLiner:
      "Belgian AI consultancy. Scan operations, install AI workflows, hand teams a working stack that pays back in weeks.",
    href: "https://beclaire.be",
    hrefStatus: "confirmed",
  },
  {
    id: "accountability",
    name: "Accountability",
    mode: "right",
    accentVar: "--venture-accountability",
    accentHex: "oklch(0.82 0.20 85)",
    oneLiner:
      "A habit tracker that makes discipline feel like play. Cartoon mode by default, dark mode for nights. Streaks that actually feel good.",
    href: "https://accountability.midcurved.com",
    hrefStatus: "confirmed",
  },
  {
    id: "hotcold",
    name: "Hot & Cold",
    mode: "right",
    accentVar: "--venture-hotcold",
    accentHex: "oklch(0.82 0.20 85)",
    oneLiner:
      "Contrast therapy tracker. Log every cold plunge and sauna session, honestly. Watch what alternating ice and heat does to your week.",
    href: "#",
    hrefStatus: "todo",
  },
  {
    id: "predictmrr",
    name: "PredictMRR",
    mode: "middle",
    accentVar: "--venture-predictmrr",
    accentHex: "oklch(0.82 0.20 85)",
    oneLiner:
      "MRR prediction for SaaS founders. Stop guessing next month's number. Upload the CSV, get the range.",
    href: "#",
    hrefStatus: "todo",
  },
];

export const MIDCURVED_ONELINER =
  "Builder media studio and product lab. Apps, podcast, YouTube, newsletter — one brand, shipped in public.";
