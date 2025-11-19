"use client";

import React from "react";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const About = () => {
  return (
    <>
      <div className="py-6 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10 items-center">
            {/* Video Section */}
            <div className="w-full flex justify-center">
             
            </div>

            {/* Text Section */}
            <div
              className={`p-2 md:p-6 lg:p-8 text-left ${philosopher.className}`}
            >
              <h1 className="text-xl sm:text-2xl lg:text-4xl text-[#9f7d48] font-bold leading-tight">
                Your Story, Our Craft
              </h1>
              <p className="text-gray-700 mt-2 sm:mt-6 sm:mb-2 mb-4 lg:mb-8 text-[14px] sm:text-base lg:text-xl leading-relaxed">
                Tell us your love story, and our in-house jewellers will turn it
                into the perfect custom ring. Whether you have a design in mind
                or need some ideas, we&apos;ll help you bring your vision to
                life. Alternatively, build your ring online today with Claire
                Diamond&apos;s online engagement ring builder, and choose from a
                range of stone shapes, metal colours, band types, and setting
                styles.
              </p>

              {/* Button */}
              <div className="flex justify-center  md:justify-start">
                <button className="block px-6 py-3 bg-[#9f7d48] text-[#f4f1f0] text-sm md:text-xl font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-[#43825c] hover:text-white">
                  Customize Your Ring
                </button>
              </div>
              
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default About;
