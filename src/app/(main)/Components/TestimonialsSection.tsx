import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Product Manager",
      company: "Tech Innovations",
      avatar: "SJ",
      rating: 5,
      quote:
        "Contato transformed how I access expert content and connect with peers. The app is intuitive and keeps me inspired daily.",
    },
    {
      name: "Michael Chen",
      title: "Content Creator",
      company: "MediaWorks",
      avatar: "MC",
      rating: 5,
      quote:
        "The premium videos and community posts give me fresh ideas and valuable insights. Contato is my go-to app for growth.",
    },
    {
      name: "Emily Rodriguez",
      title: "Entrepreneur",
      company: "Startup Hub",
      avatar: "ER",
      rating: 5,
      quote:
        "With Contato, I stay connected with a vibrant network and always have the latest content at my fingertips.",
    },
    {
      name: "David Park",
      title: "Community Lead",
      company: "ConnectNow",
      avatar: "DP",
      rating: 5,
      quote:
        "The app’s engagement features and analytics help me build and nurture my professional community effortlessly.",
    },
    {
      name: "Lisa Thompson",
      title: "Marketing Specialist",
      company: "BrightFuture",
      avatar: "LT",
      rating: 5,
      quote:
        "Contato’s secure platform and seamless integrations have streamlined my daily workflows and boosted productivity.",
    },
    {
      name: "James Wilson",
      title: "Product Designer",
      company: "Creative Minds",
      avatar: "JW",
      rating: 5,
      quote:
        "The personalized content recommendations and user-friendly design make Contato an indispensable tool in my toolkit.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from professionals who are growing and connecting with Contato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
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
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {testimonial.title}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
