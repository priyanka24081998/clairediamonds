import React from "react";
import { Philosopher } from "next/font/google";
import {
  FaTruck,
  FaHeadset,
  FaShieldAlt,
  FaGem,
  FaPenFancy,
} from "react-icons/fa";
import { GiLinkedRings } from "react-icons/gi";
// Import icons

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Feature Data
const feature = [
  {
    id: 1,
    icon: <FaTruck />,
    name: "Free Shipping",
    description: "Enjoy free and fast shipping on all orders.",
  },
  {
    id: 2,
    icon: <FaHeadset />,
    name: "Top Notch Support",
    description: "Our expert team is here to assist you 24/7.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    name: "Secure Payments",
    description: "Shop with confidence using encrypted transactions.",
  },
  {
    id: 4,
    icon: <FaGem />,
    name: "Certified Diamond",
    description: "Every diamond is certified for authenticity and quality.",
  },
  {
    id: 5,
    icon: <GiLinkedRings />,
    name: "Free Resizing",
    description: "We offer free resizing to ensure a perfect fit.",
  },
  {
    id: 6,
    icon: <FaPenFancy />,
    name: "Free Engraving",
    description: "Personalize your jewelry with free custom engraving.",
  },
];

const Features = () => {
  return (
    <div className="section py-10 bg-[url('/assets/home_banner_image.webp')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 px-4 md:px-8">
          {feature.map((item) => (
            <div
              key={item.id}
              className="card p-2 sm:p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-md flex flex-col items-center"
            >
              {" "}
              <div className="text-[#43825c] text-4xl">{item.icon}</div>{" "}
              {/* Icon Styling */}
              <p
                className={`mt-2 text-[#f4f1f0] text-center text-sm  lg:text-[18px] font-semibold ${philosopher.className}`}
              >
                {item.name}
              </p>{" "}
              <p
                className={`mt-2 text-[#f4f1f0] text-center text-xs lg:text-base font-normal ${philosopher.className}`}
              >
                {item.description}
              </p>
              {/* Name */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
