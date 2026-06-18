export type ShipSeasonVideo = {
  id: string;
  title: string;
  kicker: string;
  href: string;
  publishedAt: string;
};

export const SHIP_SEASON_VIDEOS: ShipSeasonVideo[] = [
  {
    id: "ship-season-channel",
    title: "Building AI apps in public",
    kicker: "ship season",
    href: "https://youtube.com/@midcurved",
    publishedAt: "Ship Season",
  },
  {
    id: "vibecode-fun",
    title: "30 AI apps in 30 days",
    kicker: "day 1",
    href: "https://youtu.be/AHCeoALqn_I",
    publishedAt: "Build log",
  },
  {
    id: "accountability-os",
    title: "The accountability app",
    kicker: "day 3",
    href: "https://youtu.be/AnD4xEtOpoE",
    publishedAt: "Build log",
  },
  {
    id: "disk-doctor",
    title: "Claude filled my Mac with junk",
    kicker: "day 6",
    href: "https://youtu.be/tzFLcGf-z5s",
    publishedAt: "Build log",
  },
];
