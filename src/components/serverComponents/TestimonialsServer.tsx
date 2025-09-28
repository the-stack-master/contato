import { client } from "@/lib/sanity";
import TestimonialsSectionClient from "@/app/(main)/Components/TestimonialsSection";

const testimonialHeaderQuery = `*[_type == "homeTestimonialHeader"][0]{
  _id,
  title,
  heading,
  subHeading
}`;

const testimonialBlocksQuery = `*[_type == "homeTestimonialBlocks"][0]{
_id,
    testimonials[]{
      _id,
      company,
      firstName,
      lastName,
      role,
      quote,
      rating
    }
  }`;

export default async function TestimonialsSectionServer() {
  const testimonialHeader = await client.fetch(testimonialHeaderQuery);
  const testimonialBlocks = await client.fetch(testimonialBlocksQuery);

  return (
    <TestimonialsSectionClient
      testimonialHeader={testimonialHeader}
      testimonialBlocks={testimonialBlocks}
    />
  );
}
