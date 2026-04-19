import type { MetadataRoute } from "next";

const BASE_SITE_URL = "https://shortreeldrama.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_SITE_URL}/phimbo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_SITE_URL}/tintuc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_SITE_URL}/vechungtoi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
