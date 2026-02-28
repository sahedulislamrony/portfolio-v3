"use client";

import { motion } from "framer-motion";
import { testimonials } from "../_lib/data";
import { Quote, Star, StarHalf } from "lucide-react";

export function TestimonialSection() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-primary text-primary"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-4 h-4 fill-primary text-primary" />,
      );
    }

    return stars;
  };

  return (
    <section className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            What clients say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Client Feedback
          </h2>
        </motion.div>

        {/* Scrolling Marquee */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[380px] flex-shrink-0 rounded-sm bg-card border border-foreground/5 p-6 hover:border-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
              >
                {/* Quote + Stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Quote className="w-6 h-6 text-primary/15" />
                </div>

                {/* Feedback */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{testimonial.feedback}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-foreground/5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
