import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.bmrsolutions.example";
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/thank-you`, priority: 0.6 },
    { url: `${base}/insights/tge-field-guide`, priority: 0.6 },
    { url: `${base}/insights/hai-playbook`, priority: 0.6 },
    { url: `${base}/insights/aia-template`, priority: 0.6 },
  ];
}
