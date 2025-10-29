"use client";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserTestimonials } from "@/types/homeTypes";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  testimonialData: UserTestimonials | null;
}

export default function TestimonialsSectionClient({ testimonialData }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!testimonialData) return null;

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {testimonialData?.sectionHeading || "What Our Users Say"}
          </motion.h2>
          <p className="text-lg text-gray-600">
            {testimonialData?.sectionDescription ||
              "Hear from professionals who are growing and connecting with Contato."}
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonialData?.testimonials?.map((testimonial, index) => {
                const avatar = testimonial.authorInitials || "";

                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 py-4"
                  >
                    <Card className="group border-0 bg-white shadow-lg rounded-2xl relative overflow-hidden cursor-pointer hover:shadow-[0_8px_25px_rgba(241,90,36,0.3)] transition-shadow duration-500">
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
                          &ldquo;{testimonial.testimonialText}&rdquo;
                        </blockquote>

                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#f15A24] to-[#e45400] rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-md text-lg select-none">
                            {avatar.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {testimonial.authorName}
                            </div>
                            {testimonial?.authorTitle ? (
                              <div className="text-sm text-[#f15A24] font-semibold">
                                {testimonial.authorTitle}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </CardContent>

                      {/* Decorative overlay */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#f15A24] to-[#e45400] rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-[#f15A24] hover:text-white text-[#f15A24] p-2 rounded-full shadow-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-[#f15A24] hover:text-white text-[#f15A24] p-2 rounded-full shadow-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonialData?.testimonials?.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  selectedIndex === i
                    ? "bg-[#f15A24]"
                    : "bg-gray-300 hover:bg-[#f15A24]/50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
