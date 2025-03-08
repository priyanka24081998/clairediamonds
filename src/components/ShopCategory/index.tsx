"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface ImageData {
  id: number;
  src: string;
  alt: string;
  name: string;
  link: string;
}

const ShopCategory = () => {
  const images: ImageData[] = [
    {
      id: 1,
      src: "Lab_Diamond.webp",
      alt: "lab diamond",
      name: "Lab Diamond",
      link: "/shop/lab-diamond",
    },
    {
      id: 2,
      src: "Classic_Rings.webp",
      alt: "Moissanite diamond",
      name: "Moissanite Diamond",
      link: "/shop/moissanite",
    },
    {
      id: 3,
      src: "Curved_Wedding_Rings.webp",
      alt: "curved wedding",
      name: "Curved Wedding",
      link: "/shop/curved-wedding",
    },
    {
      id: 4,
      src: "Classic_Rings.webp",
      alt: "classic rings",
      name: "Classic Rings",
      link: "/shop/classic-rings",
    },
    {
      id: 5,
      src: "Ready-to-Ship.webp",
      alt: "ready to ship",
      name: "Ready to Ship",
      link: "/shop/ready-to-ship",
    },
    {
      id: 6,
      src: "statement-rings.webp",
      alt: "Statement",
      name: "Statement",
      link: "/shop/statement",
    },
    {
      id: 7,
      src: "Accent-rings.webp",
      alt: "accent",
      name: "Accent",
      link: "/shop/accent",
    },
  ];

  return (
    <section className="relative text-center py-4 sm:py-10 bg-[url('/assets/bg-brown.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/30"></div>
      <h2
        className={`text-[20px] md:text-3xl text-[#43825c] font-bold mb-10 md:mb-16 ${philosopher.className}`}
      >
        SHOP BY CATEGORY
        <Image
          src="/assets/divider.png"
          alt="line"
          width={1200}
          height={800}
          objectFit="contain"
          className="w-[100px] h-[10px] md:w-[150px] md:h-[15px] mt-4 mx-auto"
        />
      </h2>

      {/* Scrollable container */}
      <div className="px-6 relative z-50">
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide px-4">
          {images.map((image) => (
            <Link key={image.id} href={image.link || "#"} className="block">
              <div className="w-[250px] sm:w-[300px] overflow-hidden transform transition-all hover:shadow-lg">
                {/* Image Section */}
                <div className="h-[300px] w-full hover:scale-105 overflow-hidden">
                  <Image
                    src={`/assets/${image.src}`}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full  h-full"
                  />
                </div>

                {/* Card Content (No Vertical Scroll) */}
                <div className="relative z-10 p-4 text-left mb-4">
                  <p
                    className={`capitalize text-[#f4f1f0] text-xl font-semibold ${philosopher.className}`}
                  >
                    {image.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
