import { client } from "@/sanity/lib/client";
import { GET_LATEST_POSTS_FOR_RSS } from "@/sanity/lib/queries";

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET(request: Request) {
    const origin = new URL(request.url).origin;

    const posts = await client.fetch(GET_LATEST_POSTS_FOR_RSS);

    const items = (posts ?? [])
        .map((post) => {
            const link = `${origin}/${post.authorUsername}/${post.slug}`;
            return `    <item>
      <title>${escapeXml(post.title ?? "Untitled")}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description ?? "")}</description>
      <category>${escapeXml(post.category ?? "")}</category>
      <pubDate>${new Date(post._createdAt).toUTCString()}</pubDate>
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Large</title>
    <link>${origin}</link>
    <description>Think Large. Write Larger.</description>
    <language>en</language>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
