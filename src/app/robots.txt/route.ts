import { NextResponse } from "next/server";

export const GET = () => {
  const robotsTxt = `
User-agent: *
Disallow: /api/
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_WEBSITE_URL || "https://example.com"}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
