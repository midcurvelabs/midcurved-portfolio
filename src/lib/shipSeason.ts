export type ShipSeasonVideo = {
  id: string;
  title: string;
  kicker: string;
  href: string;
  publishedAt: string;
};

export const SHIP_SEASON_VIDEOS: ShipSeasonVideo[] = [
  {
    id: "ship-season-latest",
    title: "Building 30 apps in 30 days",
    kicker: "latest build",
    href: "https://www.youtube.com/",
    publishedAt: "Ship Season",
  },
  {
    id: "prd-generator",
    title: "Turning raw ideas into app specs",
    kicker: "idea",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
  {
    id: "prototype-sprint",
    title: "From prompt to working prototype",
    kicker: "create",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
  {
    id: "launch-loop",
    title: "Shipping, posting, learning, repeating",
    kicker: "grow",
    href: "https://www.youtube.com/",
    publishedAt: "Build log",
  },
];
