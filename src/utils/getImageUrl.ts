import { urlFor } from "@/lib/sanity";

export interface ImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
}

const getImageUrl = (image: string | ImageAsset) => {
  // If it's already a string URL
  if (typeof image === "string") return image;

  // If it's a Sanity image object
  if (image && image.asset) return urlFor(image).url();

  // Fallback
  return "/placeholder.png";
};

export default getImageUrl;
