import Link from "next/link";
import React from "react";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  // Define sections with links
  const sections = [
    {
      title: "Quick Links",
      links: [
        { href: "/ready-to-ship", label: "Ready-to-Ship" },
        { href: "/engagement-rings", label: "Engagement Rings" },
        { href: "/lab-diamonds", label: "Lab Diamonds" },
        { href: "/moissanite", label: "Moissanite" },
        { href: "/sapphires", label: "Sapphires" },
        { href: "/womens-wedding-rings", label: "Women’s Wedding Rings" },
        { href: "/mens-wedding-rings", label: "Men’s Wedding Rings" },
        { href: "/education", label: "Education" },
      ],
    },
    {
      title: "Client Care",
      links: [
        { href: "/education", label: "FAQs" },
        { href: "/education", label: "shipping" },
        { href: "/education", label: "free resizing" },
        { href: "/education", label: "order status" },
        { href: "/education", label: "ring size guide" },
        { href: "/education", label: "ring care guide" },
        { href: "/education", label: "free engraving" },
      ],
    },
    {
      title: "About Us",
      links: [
        { href: "/our story", label: "our story" },
        { href: "/reviews", label: "reviews" },
        { href: "/education", label: "moissanite blog" },
        { href: "/education", label: "lab grown diamond blog" },
      ],
    },
    {
      title: "Contact Us",
      links: [
        { href: "/our story", label: "+91 9979117817" },
        { href: "/reviews", label: "clairediamonds@gmail.com" },
        { href: "/reviews", label: "get in touch" },
        { href: "/reviews", label: "feedback" },
      ],
    },
  ];

  return (
    <>
      <div className="mail py-16 px-6 md:px-20 bg-[#f4f1f0]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Title Section */}
          <div
            className={`title capitalize text-center md:text-right text-3xl md:text-4xl px-4 md:px-10 text-[#43825c] ${philosopher.className}`}
          >
            <span className="italic">stay in touch</span>
            <p className={`pt-4 text-[#9f7d48] text-sm ${philosopher.className}`}>
              Ring advice, straight to your inbox
            </p>
          </div>

          {/* Input Section */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Your email address"
              className="w-full border border-gray-300 rounded-lg p-3 pr-14 focus:outline focus:ring-2 focus:ring-[#9f7d48]"
            />
            <button
              className={`absolute h-full inset-y-0 right-0 px-5 bg-[#9f7d48] uppercase text-white rounded-r-lg hover:bg-[#876333] ${philosopher.className}`}
            >
              submit
            </button>
          </div>
        </div>
      </div>

      <div className="section bg-[#1a3f27] p-10">
        <div className="container mx-auto w-[1140px]">
          <div className="grid grid-cols-2 md:grid-cols-4 text-[#f4f1f0] font-sans">
            {sections.map((section, index) => (
              <div key={index} className="pl-20">
                <h4 className="mb-8 text-xs font-bold uppercase">
                  {section.title}
                </h4>
                {section.links?.length > 0 && (
                  <p className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className={`block text-xs hover:text-yellow-200 ${
                          link.label.includes("@") ? "" : "capitalize"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
