import { createSitemap } from "sitemap";
import fs from "fs";
import path from "path";

const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/job-position/:offerId", changefreq: "weekly", priority: 0.8 },
  { url: "/job-offer/:id", changefreq: "weekly", priority: 0.8 },
  { url: "/applicant/:id", changefreq: "monthly", priority: 0.6 },
  { url: "/login", changefreq: "monthly", priority: 0.5 },
  { url: "/signup", changefreq: "monthly", priority: 0.5 },
];

const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

const sm = createSitemap({
  hostname: "https://localhost:5173",
  cacheTime: 600000,
  urls: pages,
});

fs.writeFileSync(sitemapPath, sm.toString());

console.log("Sitemap generated successfully!");
