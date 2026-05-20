import type { MetadataRoute } from "next";
import { getAirportPagePaths } from "@/app/lib/airports-data";
import { getAirlinePagePaths } from "@/app/lib/airlines-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://darbiy.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const airportPages = getAirportPagePaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const airlinePages = getAirlinePagePaths().map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...airportPages,
    ...airlinePages,
  ];
}
