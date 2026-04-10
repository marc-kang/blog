import { MetadataRoute } from "next";
import { posts } from "#site/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${siteConfig.url}/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...postEntries,
  ];
}
