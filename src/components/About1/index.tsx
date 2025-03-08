"use client"

import React from 'react'
import Image from "next/image";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const About1 = () => {
  return (
    <div className="bg-[#f4f1f0] text-center">
      <div className="container mx-auto px-4 lg:px-8">
      <div className="z-[1] grid grid-cols-1 md:grid-cols-2 md:gap-2 items-center">
            {/* Text Section */}
            <div
              className={`p-4 sm:p-6 md:p-8 text-left ${philosopher.className}`}
            >
              <h1 className="text-xl sm:text-2xl lg:text-4xl text-[#9f7d48] font-bold leading-tight">
                About Claire Diamonds
              </h1>
              <p className="text-gray-700 mt-2 sm:mt-6 sm:mb-2 lg:mb-8 mb-2 text-[14px] sm:text-base lg:text-xl leading-relaxed">
                At Claire Diamonds, we are passionate about crafting exquisite
                jewelry that embodies elegance, sophistication, and timeless
                beauty. With years of expertise in fine jewelry, we take pride
                in offering high-quality diamonds and gemstones, designed with
                precision and love.
              </p>

              {/* Button */}

              <div className="flex justify-center md:justify-start">
                <button className="capitalize px-6 py-3 bg-[#9f7d48] text-[#f4f1f0] text-sm md:text-xl font-semibold rounded-lg shadow-md transition-all hover:bg-[#43825c] hover:text-[#f4f1f0]">
                  make an enquiry
                </button>
              </div>
            </div>
            {/* image Section */}
            <div className="hidden lg:block relative md:mb-[200px] mt-[-40px] sm:mt-[0px]">
              <div className=" w-[130px] h-[140px] md:w-[200px] md:h-[170px] bg-[url('/assets/Diamond_Sprite.png')] bg-[length:110%] md:bg-[length:100%] mx-auto bg-[position:left_0px_top_-2837px] lg:bg-[position:left_3px_top_-2837px] sticky top-[240px] z-[99]"></div>
              <div className="mr-[9px] h-[156px] overflow-visible ">
                <Image
                  src={"/assets/about-ring.png"}
                  alt={"ring"}
                  width={1200}
                  height={800}
                  className="absolute overflow-hidden sm:top-[170px] md:top-[160px] lg:top-[140px] lg:right-[0px]"
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default About1
