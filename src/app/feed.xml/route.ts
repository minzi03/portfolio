import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

export async function GET() {
  const posts = getAllBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nguyen Minh Duy — Data Engineering Blog</title>
    <description>Data engineering insights, tutorials, and deep dives into ETL, Lakehouse, CDC pipelines, and analytics.</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${siteConfig.email} (Nguyen Minh Duy)</managingEditor>
    <webMaster>${siteConfig.email} (Nguyen Minh Duy)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Nguyen Minh Duy</copyright>
    <category>Data Engineering</category>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tags.join("</category><category>")}</category>
      <content:encoded><![CDATA[${post.description}]]></content:encoded>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
