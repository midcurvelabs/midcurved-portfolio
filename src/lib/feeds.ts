const REVALIDATE_SECONDS = 3600;

export type FeedCard = {
  tag: string;
  title: string;
  body: string;
  href?: string;
};

function firstMatch(re: RegExp, text: string): string | null {
  const m = re.exec(text);
  return m ? m[1] : null;
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "midcurved-portfolio/1.0" },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function firstItem(xml: string): string | null {
  const m = /<item\b[\s\S]*?<\/item>/i.exec(xml);
  return m ? m[0] : null;
}

function firstEntry(xml: string): string | null {
  const m = /<entry\b[\s\S]*?<\/entry>/i.exec(xml);
  return m ? m[0] : null;
}

export async function getSubstackCard(): Promise<FeedCard> {
  const fallback: FeedCard = {
    tag: "newsletter",
    title: "TheRikOS is live on Substack",
    body: "Weekly first-person OS. Subscribe for the next drop.",
    href: "https://therikos.substack.com/",
  };

  const xml = await fetchText("https://therikos.substack.com/feed");
  if (!xml) return fallback;

  const item = firstItem(xml);
  if (!item) return fallback;

  const titleRaw = firstMatch(/<title>([\s\S]*?)<\/title>/i, item);
  const linkRaw = firstMatch(/<link>([\s\S]*?)<\/link>/i, item);
  if (!titleRaw) return fallback;

  const title = decode(titleRaw);
  const href = linkRaw ? decode(linkRaw) : fallback.href;
  const numMatch = /#\s*0*(\d+)/.exec(title);
  const issueLabel = numMatch ? `Issue #${numMatch[1].padStart(3, "0")}` : title;

  return {
    tag: "newsletter",
    title: `${issueLabel} is live`,
    body: "Latest TheRikOS just landed on Substack. Read it, then subscribe for the next one.",
    href,
  };
}

export async function getPodcastCard(): Promise<FeedCard> {
  const fallback: FeedCard = {
    tag: "podcast",
    title: "GodModePod drops weekly",
    body: "Three hosts, no fluff, AI + crypto + web3. New episode every week.",
    href: "https://godmodepod.com",
  };

  const feedUrl = process.env.PODCAST_RSS_URL;
  if (!feedUrl) return fallback;

  const xml = await fetchText(feedUrl);
  if (!xml) return fallback;

  const entry = firstItem(xml) ?? firstEntry(xml);
  if (!entry) return fallback;

  const titleRaw = firstMatch(/<title[^>]*>([\s\S]*?)<\/title>/i, entry);
  const linkRaw =
    firstMatch(/<link>([\s\S]*?)<\/link>/i, entry) ??
    firstMatch(/<link[^>]*href="([^"]+)"/i, entry);
  if (!titleRaw) return fallback;

  const title = decode(titleRaw);
  const href = linkRaw ? decode(linkRaw) : fallback.href;
  const numMatch = /EP\s*0*(\d+)/i.exec(title);
  const epLabel = numMatch ? `EP${numMatch[1].padStart(2, "0")}` : title;

  return {
    tag: "podcast",
    title: `${epLabel} is live on GodModePod`,
    body: "Latest episode just dropped. Clips rolling out across every platform.",
    href,
  };
}
