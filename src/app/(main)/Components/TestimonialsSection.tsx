"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  company: string;
  firstName: string;
  lastName: string;
  role: string;
  quote: string;
  rating: number;
}

interface TestimonialBlock {
  _id: string;
  testimonials: Testimonial[];
}

interface TestimonialHeader {
  title?: string;
  heading?: string;
  subHeading?: string;
}

interface Props {
  testimonialHeader: TestimonialHeader | null;
  testimonialBlocks: TestimonialBlock | null;
}

export default function TestimonialsSectionClient({
  testimonialHeader,
  testimonialBlocks,
}: Props) {
  if (!testimonialHeader || !testimonialBlocks) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {testimonialHeader.heading || "What Our Users Say"}
          </h2>
          <p className="text-lg text-gray-600">
            {testimonialHeader.subHeading ||
              "Hear from professionals who are growing and connecting with Contato."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonialBlocks?.testimonials?.map((testimonial, index) => {
            const avatar =
              (testimonial.firstName?.[0] || "") +
              (testimonial.lastName?.[0] || "");

            return (
              <Card
                key={testimonial._id || index}
                className="group border-0 bg-white shadow-lg rounded-2xl relative overflow-hidden cursor-pointer hover:shadow-[0_8px_25px_rgba(241,90,36,0.3)] transition-shadow duration-500"
              >
                <CardContent className="p-8 relative z-10">
                  <Quote className="w-8 h-8 text-[#f15A24]/30 mb-6" />

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#f15A24] text-[#f15A24]"
                      />
                    ))}
                  </div>

                  <blockquote className="text-gray-900 mb-6 leading-relaxed italic font-semibold">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-[#e45400] rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-md text-lg select-none">
                      {avatar.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.firstName} {testimonial.lastName}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-[#f15A24] font-semibold">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#f15A24] to-[#e45400] rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
