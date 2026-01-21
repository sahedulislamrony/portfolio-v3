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
          className="w-5 h-5 fill-yellow-500 text-yellow-500"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-500 text-yellow-500"
        />,
      );
    }

    return stars;
  };

  return (
    <section className="py-24 w-full bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter"
        >
          CLIENT FEEDBACK
        </motion.h2>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[400px] p-8 border border-border bg-card relative group hover:border-primary/50 transition-colors duration-300 flex-shrink-0"
              >
                <Quote className="w-10 h-10 text-primary/20 mb-6 absolute top-6 right-6" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed">
                      "{testimonial.feedback}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                      {/* Placeholder for avatar if needed, or initials */}
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
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
