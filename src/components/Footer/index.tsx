import Link from "next/link";
import React from "react";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
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
        { href: "/education", label: "Shipping" },
        { href: "/education", label: "Free Resizing" },
        { href: "/education", label: "Order Status" },
        { href: "/education", label: "Ring Size Guide" },
        { href: "/education", label: "Ring Care Guide" },
        { href: "/education", label: "Free Engraving" },
      ],
    },
    {
      title: "About Us",
      links: [
        { href: "/our-story", label: "Our Story" },
        { href: "/reviews", label: "Reviews" },
        { href: "/education", label: "Moissanite Blog" },
        { href: "/education", label: "Lab Grown Diamond Blog" },
      ],
    },
    {
      title: "Contact Us",
      links: [
        { href: "tel:+919979117817", label: "+91 9979117817" },
        { href: "mailto:clairediamonds@gmail.com", label: "clairediamonds@gmail.com" },
        { href: "/contact", label: "Get in Touch" },
        { href: "/feedback", label: "Feedback" },
      ],
    },
  ];

  return (
    <footer className="w-full overflow-hidden bg-[#f4f1f0]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={`text-center md:text-right text-3xl md:text-4xl text-[#43825c] ${philosopher.className}`}>
            <span className="italic">Stay in Touch</span>
            <p className="pt-4 text-[#9f7d48] text-sm">Ring advice, straight to your inbox</p>
          </div>
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full border border-gray-300 rounded-lg p-3 pr-14 focus:outline-none focus:ring-2 focus:ring-[#9f7d48]"
            />
            <button className={`absolute h-full inset-y-0 right-0 px-5 bg-[#9f7d48] uppercase text-white rounded-r-lg hover:bg-[#876333] ${philosopher.className}`}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3f27] p-10">
        <div className="container mx-auto  lg:px-4 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-[#f4f1f0]">
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="mb-4 text-sm font-bold uppercase">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className={`block px-2 text-sm md:text-xs hover:text-yellow-200 ${link.label.includes("@") ? "" : "capitalize"}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
