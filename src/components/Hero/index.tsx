"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "./Hero.module.css";
import { Cinzel } from "next/font/google";
import Link from "next/link";


interface SlideContent {
  link: string;
  id: number;
  image?: React.ReactNode;
  title: string;
  description: string;
}

const slidesData: SlideContent[] = [
  {
    id: 1,
    image: "slide1.jpg",
    title: "luxurios jewellery",
    link:'/engagementrings/solitierrings',
    description:
      "Experience elegance with our premium collection of luxurious jewellery.",
  },
  {
    id: 2,
    image: "slide2.jpg",
    title: "Dazzling Occasions",
    link:'/labdiamond',
    description:
      " Discover dazzling pieces that make every occasion unforgettable.",
  },
  {
    id: 3,
    image: "slide3.jpg",
    title: "Create Your Own Style",
    link:'/statement',
    description:
      " Craft your signature look with personalized jewellery designs.",
  },
  {
    id: 4,
    image: "slide4.jpg",
    title: "Ageless Beauty",
    link:'/classicrings',
    description: "Timeless designs that radiate sophistication and charm.",
  },
  {
    id: 5,
    image: "slide5.jpg",
    title: "High Quality jewellery",
    link:'/gemstones',
    description:
      "Elevate your style with meticulously crafted, high-quality jewellery.",
  },
  {
    id: 6,
    image: "slide6.jpg",
    title: " Exclusive Elegance",
    link:'/diamondbands',
    description: "Discover exclusive pieces to match your vibrant lifestyle.",
  },
  {
    id: 7,
    image: "slide7.jpg",
    title: "Stylish diamond Jewellery",
    link:'/moissanite',
    description: "Shine bright with sustainably crafted modern jewellery.",
  },
  {
    id: 8,
    image: "slide8.jpg",
    title: "Exclusive Elegance",
    link:'/bracelates',
    description: "Discover exclusive pieces to match your vibrant lifestyle.",
  },
  {
    id: 9,
    image: "slide9.jpg",
    title: "Minimal Stylish Collection",
    link:'/minimal',
    description: "Spark joy with fun and stylish jewellery for kids.",
  },
  {
    id: 10,
    image: "slide10.jpg",
    title: "Fashion Forward",
    link:'/pendants',
    description: "Jewellery that speaks to your unique sense of fashion.",
  },
  {
    id: 11,
    image: "slide11.jpg",
    title: "hip-hop collection",
    link:'/hiphop',
    description: "Unleash your bold side with our trendy hip hop jewellery.",
  },
  {
    id: 12,
    image: "slide12.jpg",
    title: "Modern Elegance",
    link:'/curvedrings',
    description: " Redefining elegance with modern jewellery masterpieces.",
  },
];

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Hero: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className={`hero w-full overflow-hidden ${styles["hero-bg"]}`}>
      <div className="container mx-auto px-2">
        <div className="hero-body w-full py-10 px-4 sm:px-8 md:px-0 md:py-20 xl:px-20 xl:py-20">
          <Slider {...settings}>
            {slidesData.map((slide, index) => (
              <div
                key={slide.id}
                className="px-16 mb-8 sm:mb-0 md:px-20 lg:px-0 xl:px-[0px]"
              >
                <div
                  className={`relative flex  flex-col content-center justify-between ${cinzel.className}`}
                >
                  <div
                    className="text-[#f5f5dc] absolute py-2 sm:py-8 left-[80px] top-0 w-[95%] 
                sm:left-[280px] sm:top-0 
                lg:left-[300px] lg:w-[85%]"
                  >
                    <div
                      className={`w-[95%] sm:w-[100px] md:w-[60%] lg:w-[100%] xl:w-[100%] text-center z-[999] text-[18px] sm:text-[30px] md:text-[40px] lg:text-[48px] xl:text-[60px] font-normal ${
                        index % 2 === 0 ? "lg:block" : "lg:hidden"
                      }`}
                    >
                      {slide.title}
                    </div>

                    <div
                      className={`w-[95%] sm:w-[80px] md:w-[70%] lg:w-[90%] md:pl-[20px] md:pr-[20px] sm:pl-[50px] sm:pr-[100px] lg:pl-[70px] text-center content-center mt-[10px] sm:mt-4 z-[999] text-xs sm:text-sm  font-normal
                      ${index % 2 === 0 ? "lg:block" : "lg:hidden"}`}
                    >
                      {slide.description}
                    </div>

                    <div
                      className={`w-[95%] sm:w-[100px] md:w-[90%] lg:w-[100%] text-center sm:ml-[-80px] lg:ml-[0px] mt-[10px] sm:mt-8 md:mt-12 lg:mt-16 z-[999] text-xs sm:text-md font-normal ${
                        index % 2 === 0 ? "lg:block" : "lg:hidden"
                      }`}
                    >
                      <Link href={slide.link}>
                      <button className="uppercase p-2 sm:px-6 sm:py-2 border border-white cursor-pointer hover:bg-[#9f7d48] transition-all duration-300">
                        shop now
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className={`lg:block hidden md:w-[350px] overflow-hidden md:h-[500px] relative z-[-1]
                     ${
                       index % 2 === 0
                         ? "rounded-full animate-move-down before:content-['']  before:absolute before:z-[100] before:top-[0px] before:left-[0px] before:w-[350px] before:h-[500px] before:border-2 before:border-white before:rounded-full"
                         : styles["clip-leaf"]
                     }
                  ${index % 2 === 0 ? "md:mr-[150px]" : "md:ml-[150px]"}`}
                >
                  <Image
                    src={`/assets/${slide.image}`}
                    width={1200}
                    height={800}
                    alt={slide.title}
                    className={`w-[350px] h-[500px] object-cover `}
                  />
                </div>
                <div
                  className={`lg:hidden relative w-[130px] h-[180px] sm:w-[180px] sm:h-[250] md:w-[300px] md:h-[400px] ml-[-60px] overflow-hidden rounded-full `}
                >
                  <Image
                    src={`/assets/${slide.image}`}
                    width={1200}
                    height={800}
                    alt={slide.title}
                    className="w-[150px] h-[200px] md:w-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
