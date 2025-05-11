"use client";

import React from "react";
import Slider from "react-slick";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Testimonial {
  id: number;
  name: string;
  profile: string;
  rating: number;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    profile: "",
    rating: 4.5,
    review:
      "Amazing quality and fast delivery! The customer support was excellent. Highly recommended.",
  },
  {
    id: 2,
    name: "Jane Smith",
    profile: "",
    rating: 5,
    review:
      "Absolutely love my ring! The resizing was perfect, and the engraving looks stunning.",
  },
  {
    id: 3,
    name: "Michael Brown",
    profile: "",
    rating: 4,
    review:
      "Great experience. The diamonds are certified, and the packaging was very elegant!",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    profile: "",
    rating: 4.5,
    review: "Very happy with my purchase! Will definitely shop again.",
  },
];

const Review = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="slider-container px-4 md:px-10 py-8 bg-[#f4f1f0] overflow-hidden">
      <h2
        className={`text-xl lg:text-3xl text-[#43825c] font-semibold text-center mb-6 ${philosopher.className}`}
      >
        Customer Reviews
      </h2>
      <Slider {...settings}>
        {testimonials.map((item) => (
          <div key={item.id} className="p-4">
            <div className="bg-white h-[300px] shadow-lg rounded-xl p-5">
              <div className="flex items-center mb-3">
                <Image
                  src={item.profile}
                  alt={item.name}
                  width={1200}
                  height={800}
                  className="w-12 h-12 rounded-full mr-3 border border-gray-300"
                />
                <div>
                  <p className={`text-lg font-medium ${philosopher.className}`}>
                    {item.name}
                  </p>
                  <div className="flex">{renderStars(item.rating)}</div>
                </div>
              </div>
              <p className={`text-gray-600 italic ${philosopher.className}`}>
                &ldquo;{item.review}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12">
        <div className="flex justify-center lg:justify-end">
          <Link
            href="https://g.page/r/CT0pdmR_GYTBEBI/review"
            className={`bg-[#9f7d48] text-[#f4f1f0] w-[300px] py-2 px-4 rounded-lg hover:bg-[#43825c] hover:text-[#f4f1f0] transition text-center flex items-center justify-center ${philosopher.className}`}
          >
            Write Review
          </Link>
        </div>
        <div className="flex justify-center lg:justify-start">
          <Link
            href="/reviews"
            className={`text-[#9f7d48] bg-[#f4f1f0] border-2 border-[#9f7d48] w-[300px] py-2 px-4 rounded-lg hover:bg-[#43825c] hover:border-[#43825c] hover:text-[#f4f1f0] transition text-center flex items-center justify-center ${philosopher.className}`}
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
