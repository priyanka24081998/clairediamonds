"use client";

import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { Philosopher } from "next/font/google";

// MUI
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  const isTablet = useMediaQuery("(max-width: 768px)");

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
        { href: "tel:+916354518849", label: "+91 6354518849" },
        {
          href: "mailto:clairediamondsjewellery@gmail.com",
          label: "clairediamondsjewellery@gmail.com",
        },
        { href: "/contact", label: "Get in Touch" },
        { href: "/feedback", label: "Feedback" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#1a3f27] relative md:py-6 py-4 overflow-hidden">


      {/* Footer Links */}
      <div className="lg:p-10 md:px-6 p-2">
        <div className="container mx-auto lg:px-4 max-w-screen-xl text-[#f4f1f0]">

          {/* ---------- SHOW GRID ON DESKTOP ---------- */}
          {!isTablet && (
            <div className="grid grid-cols-1 md:grid-cols-4">
              {sections.map((section, index) => (
                <div key={index}>
                  <h4 className="mb-4 text-sm font-bold uppercase">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className={`block px-2 text-sm md:text-xs hover:text-yellow-200 ${link.label.includes("@") ? "" : "capitalize"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ---------- SHOW ACCORDION ON MOBILE/TABLET ---------- */}
          {isTablet && (
            <div className="">
              {sections.map((section, index) => (
                <Accordion key={index} className="!bg-[#1a3f27] border-b border-gray-500">
                  <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />}>
                    <h4 className="text-sm text-white font-bold uppercase">{section.title}</h4>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className={`block px-2 text-white text-sm hover:text-yellow-200 ${link.label.includes("@") ? "" : "capitalize"
                              }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Subscribe Box */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f4f1f0] rounded-[20px] p-6 md:p-10 w-full max-w-[800px] shadow-lg">

            {/* Title */}
            <div
              className={`text-center md:text-left text-2xl md:text-3xl lg:text-4xl text-[#43825c] ${philosopher.className}`}
            >
              <span className="italic">Stay in Touch</span>
              <p className="pt-3 text-[#9f7d48] text-sm md:text-base">
                Ring advice, straight to your inbox
              </p>
            </div>

            {/* Email Input */}
            <div className="w-full">
              <div className="relative flex flex-col md:flex-row items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#9f7d48]"
                />
                <button
                  className={`w-full md:w-auto mt-2 md:mt-0 md:ml-2 bg-[#9f7d48] text-white px-6 py-3 uppercase rounded-lg hover:bg-[#876333] transition-colors ${philosopher.className}`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2
        className={`text-center pb-4 text-sm md:text-base md:text-center text-2xl md:text-[20px]  text-[#9f7d48] ${philosopher.className}`}
      >
        <span className="text-center">follow us on</span>
      </h2>
      <div className="rightside-container flex space-x-4 text-sm ">

        <div className="flex space-x-4 text-xl mx-auto">

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/clairediamondss/"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on instagram"
          >
            <FaInstagram className="text-[#f4f1f0] hover:text-pink-400" />
          </Link>

          {/* Facebook */}
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on facebook"
          >
            <FaFacebookF className="text-[#f4f1f0] hover:text-blue-400" />
          </Link>

          {/* Email */}
          <Link
            href="https://mail.google.com/mail/?view=cm&to=clairediamondsjewellery@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            title="send mail"
          >
            <MdEmail className="text-[#f4f1f0] text-2xl hover:text-[#43825c]" />
          </Link>

          {/* YouTube */}
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on youtube"
          >
            <FaYoutube className="text-[#f4f1f0] hover:text-red-500" />
          </Link>

          {/* Pinterest */}
          <Link
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on pinterest"
          >
            <FaPinterestP className="text-[#f4f1f0] hover:text-red-600" />
          </Link>

          {/* Twitter/X */}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on twitter"
          >
            <FaXTwitter className="text-[#f4f1f0] hover:text-gray-400" />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="visit on linkedin"
          >
            <FaLinkedinIn className="text-[#f4f1f0] hover:text-blue-500" />
          </Link>

        </div>
      </div>


    </footer>
  );
};

export default Footer;
