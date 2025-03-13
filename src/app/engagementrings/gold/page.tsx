import React from "react";
import Image from "next/image";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const gold = () => {
  return (
    <>
      <div className="py-10 pb-10">
        <h2
          className={`capitalize text-[20px] md:text-3xl text-[#43825c] text-center font-bold mb-10 md:mb-16 ${philosopher.className}`}
        >
          Engagement Rings gold
          <Image
            src="/assets/divider.png"
            alt="line"
            width={1200}
            height={800}
            objectFit="contain"
            className="w-[100px] h-[10px] md:w-[150px] md:h-[15px] mt-4 mx-auto"
          />
        </h2>
      </div>
    </>
  );
};

export default gold;
