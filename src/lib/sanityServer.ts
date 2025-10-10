// lib/sanityServer.ts
import { createClient } from "@sanity/client";

// Server-only client — write permissions
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-10-10",
  token: process.env.SANITY_WRITE_TOKEN, // ✅ only server
  useCdn: false,
});
