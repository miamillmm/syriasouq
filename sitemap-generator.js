import fs from "fs";
import path from "path";
import { SitemapStream } from "sitemap"; // Import the SitemapStream correctly

const sitemapUrls = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/search?make=All&model=null", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.6 },
  { url: "/term-and-use", changefreq: "monthly", priority: 0.6 },
  { url: "/privacy-policy", changefreq: "monthly", priority: 0.6 },
  // Add more routes if necessary
];

// Create a writable stream to the file where the sitemap will be saved
const writeStream = fs.createWriteStream(path.resolve("public", "sitemap.xml"));

// Create the SitemapStream instance
const sitemapStream = new SitemapStream({ hostname: "https://syriasouq.com" });

// Pipe the data to the file stream
sitemapStream.pipe(writeStream);

// Add the URLs to the sitemap
sitemapUrls.forEach((url) => sitemapStream.write(url));

// Close the stream after writing all URLs
sitemapStream.end();

writeStream.on("finish", () => {
  console.log("Sitemap generated successfully!");
});
