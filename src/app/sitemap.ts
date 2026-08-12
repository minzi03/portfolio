import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { projects } from "@/data/projects";
import { articles } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const articleUrls = articles.map((a) => ({
    url: `${siteConfig.url}/writing/${a.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/experience`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      priority: 0.9,
    },
    ...projectUrls,
    {
      url: `${siteConfig.url}/writing`,
      lastModified: new Date(),
      priority: 0.7,
    },
    ...articleUrls,
    {
      url: `${siteConfig.url}/credentials`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/resume`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/stack`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
