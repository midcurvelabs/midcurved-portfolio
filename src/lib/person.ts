export const SITE_ORIGIN = "https://www.midcurved.com";
export const SITE_URL = `${SITE_ORIGIN}/`;

export const PERSON_NAME = "Rik Eerdekens";
export const PERSON_DESCRIPTION =
  "I build products. The dead ones stay on the board. Builder, operator, and creator. GodModePod, BeClaire, RikGPT, vibecode.fun.";

/** URLs this person controls. Do not add rikeerdekens.com (on hold) or beclaire.be until a founder block exists. */
export const SAME_AS = [
  SITE_URL,
  "https://www.linkedin.com/in/rik-eerdekens",
  "https://x.com/rikventure",
  "https://youtube.com/@rikgpt",
  "https://www.youtube.com/@godmodepod",
  "https://www.godmodepod.com/",
  "https://t.me/rikgpt",
] as const;

const PERSON_ID = `${SITE_URL}#person`;
const WEBSITE_ID = `${SITE_URL}#website`;

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON_NAME,
      alternateName: ["Rik", "RikGPT", "rikventure"],
      url: SITE_URL,
      email: "hello@midcurved.com",
      jobTitle: "Builder, operator, creator",
      description: PERSON_DESCRIPTION,
      sameAs: [...SAME_AS],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "midcurved",
      url: SITE_URL,
      description: PERSON_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
};
