import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      priority: 1,
    },
    ...projectUrls,
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
  ];
}
