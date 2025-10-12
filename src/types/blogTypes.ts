// types/blogPageHeader.ts

import { SanitySeo } from "./commonTypes";

export interface BlogPageHeader {
  _id: string;
  _type: "blogPageHeader";
  title: string; // internal title
  heading: string; // main heading
  subHeading: string; // supporting text
  seo?: SanitySeo;
}
