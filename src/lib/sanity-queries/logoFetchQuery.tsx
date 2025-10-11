// lib/sanity-queries/logoQuery.ts
import { client } from "@/lib/sanity";
import { LogoDocument } from "@/types/commonTypes";

export async function getLogo(): Promise<LogoDocument | null> {
  const query = `
    *[_type == "logoDocument"][0]{
      _id,
      title,
      mainLogo{
        image { _type, asset->{_id, url} },
        altText
      },
      smallLogo{
        image { _type, asset->{_id, url} },
        altText
      }
    }
  `;
  const result: LogoDocument | null = await client.fetch(query);
  return result;
}
