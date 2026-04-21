export type ChannelGroup = "life" | "bridge" | "funnel" | "godmodepod";

export type Channel = {
  id: string;
  platform: string;
  handle: string;
  href: string;
  group: ChannelGroup;
};

export const CHANNEL_GROUPS: {
  key: ChannelGroup;
  label: string;
  blurb: string;
}[] = [
  {
    key: "life",
    label: "Life OS",
    blurb: "Personal pillars — health, wealth, relationships, self-mastery.",
  },
  {
    key: "bridge",
    label: "Personal ↔ AI bridge",
    blurb: "Personal handles with pro content mixed in.",
  },
  {
    key: "funnel",
    label: "Midcurved · AI work",
    blurb: "The AI build-in-public work — for operators and builders.",
  },
  {
    key: "godmodepod",
    label: "GodModePod · the show",
    blurb: "Three hosts, weekly, AI + crypto + web3.",
  },
];

export const CHANNELS: Channel[] = [
  // Personal + Midcurved parent brand
  {
    id: "youtube-midcurved",
    platform: "YouTube",
    handle: "@midcurved",
    href: "https://youtube.com/@midcurved",
    group: "funnel",
  },
  {
    id: "substack-therikos",
    platform: "Substack",
    handle: "TheRikOS",
    href: "https://therikos.substack.com/",
    group: "life",
  },
  {
    id: "x-rikventure",
    platform: "X",
    handle: "@rikventure",
    href: "https://x.com/rikventure",
    group: "bridge",
  },
  {
    id: "x-midcurved",
    platform: "X",
    handle: "@midcurved",
    href: "https://x.com/midcurved",
    group: "funnel",
  },
  {
    id: "ig-rikgone",
    platform: "Instagram",
    handle: "@rikgone",
    href: "https://instagram.com/rikgone",
    group: "bridge",
  },
  {
    id: "tt-rikventure",
    platform: "TikTok",
    handle: "@rikventure",
    href: "https://tiktok.com/@rikventure",
    group: "bridge",
  },

  // GodModePod
  {
    id: "youtube-godmodepod",
    platform: "YouTube",
    handle: "@godmodepod",
    href: "https://youtube.com/@godmodepod",
    group: "godmodepod",
  },
  {
    id: "spotify-godmodepod",
    platform: "Spotify",
    handle: "GodModePod",
    href: "https://open.spotify.com/show/1KjSfTfO957fSpD4MSrX8y",
    group: "godmodepod",
  },
  {
    id: "ig-godmodepod",
    platform: "Instagram",
    handle: "@godmodepod",
    href: "https://instagram.com/godmodepod",
    group: "godmodepod",
  },
  {
    id: "tt-godmodepod",
    platform: "TikTok",
    handle: "@godmodepod",
    href: "https://tiktok.com/@godmodepod",
    group: "godmodepod",
  },
];
