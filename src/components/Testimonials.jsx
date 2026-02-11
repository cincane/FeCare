import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor diam, feugiat quis enim sed, ullamcorper semper ligula. Mauris consequat justo volutpat.",
      name: "Devid Smith",
      role: "Founder @democompany",
      image: "/images/testimonial.png",
      brand: "/images/brand-light-02.svg",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor diam, feugiat quis enim sed, ullamcorper semper ligula. Mauris consequat justo volutpat.",
      name: "John Doe",
      role: "CEO @techcorp",
      image: "/images/testimonial.png",
      brand: "/images/brand-light-03.svg",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
      {/* Section Title */}
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-4 max-w-3xl mx-auto">
          Client&apos;s Testimonials
        </h2>
        <p className="text-body dark:text-gray-300 max-w-2xl mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using.
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            loop={true}
            className="testimonial-slider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 lg:p-12 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <img
                      className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />

                    <div className="flex-1">
                      <svg
                        className="w-10 h-10 text-primary mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg text-dark dark:text-white mb-6 italic">
                        {testimonial.text}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-dark dark:text-white font-semibold mb-1">
                            {testimonial.name}
                          </span>
                          <span className="block text-body dark:text-gray-400 text-sm">
                            {testimonial.role}
                          </span>
                        </div>

                        <img
                          className="h-8 opacity-60 dark:invert"
                          src={testimonial.brand}
                          alt="Brand"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="flex justify-center gap-4 mt-8">
              <button className="swiper-button-prev-custom w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M3.52366 7.83336L7.99366 12.3034L6.81533 13.4817L0.333663 7.00002L6.81533 0.518357L7.99366 1.69669L3.52366 6.16669L13.667 6.16669L13.667 7.83336L3.52366 7.83336Z" />
                </svg>
              </button>
              <button className="swiper-button-next-custom w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                >
                  <path d="M10.4763 6.16664L6.00634 1.69664L7.18467 0.518311L13.6663 6.99998L7.18467 13.4816L6.00634 12.3033L10.4763 7.83331H0.333008V6.16664H10.4763Z" />
                </svg>
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
