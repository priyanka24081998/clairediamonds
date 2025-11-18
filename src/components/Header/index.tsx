"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6"; 
import { MdEmail } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Currency from "./Currency";
import Profile from "./Profile";

const Header = () => {
  return (
    <>
      <div className="header w-full">
        <div className="">
          <div className="w-full bg-[#9f7d48] text-[#f4f1f0]">
            <div className="header-menu container mx-auto py-2">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  {/* Left Container */}
                  <div className="left-container text-sm">
                    {/* Mobile Menu & Phone */}
                    <div className="mobilemenutel flex items-center space-x-4">
                      <span className="mobiletel font-sans">
                        <a
                          href="https://wa.me/6354518849?text=Hello%20I%20have%20a%20question"
                          title="Message us on WhatsApp"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp className="w-5 h-5 hover:text-[#25D366]" />
                        </a>
                      </span>
                      <span className="addtocall font-sans hidden sm:flex">
                        +91 6354518849
                      </span>
                    </div>
                  </div>

                  {/* Right Container */}
                  <div className="rightside-container flex space-x-4 text-sm">
                    <div className="flex space-x-4 text-xl">
                      <Link
                        href="https://www.instagram.com/clairediamondss/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="visit on instagram"
                      >
                        <FaInstagram className="text-[#f4f1f0] hover:text-pink-400" />
                      </Link>
                      <Link
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="visit on facebook"
                      >
                        <FaFacebookF className="text-[#f4f1f0] hover:text-blue-400" />
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
                      <Link
                        href="https://mail.google.com/mail/?view=cm&to=clairediamondsjewellery@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="send mail"
                      >
                        {" "}
                        <MdEmail className="text-[#f4f1f0] text-2xl hover:text-[#43825c]" />
                      </Link>
                    </div>
                    <Currency />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* logo navbar */}

          <div className="bg-[#f4f1f0] py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                {/* Search Area */}
                <div className="hidden w-1/3 lg:flex items-center space-x-2">
                  <form action="" method="get" acceptCharset="utf-8">
                    <div className="relative flex items-center">
                      <input
                        id="searchbox0"
                        name="substring"
                        placeholder="Enter Search"
                        type="text"
                        className="border-b font-sans border-[#9f7d48] p-2 pr-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f7d48]"
                      />
                      <FaSearch className="absolute right-3 text-[#43825c]" />{" "}
                    </div>
                  </form>
                </div>

                {/* Logo */}
                <div className="w-[180px] lg:w-1/3 ml-[35px] lg:ml-[-50px]">
                  <Link href="/" title="Claire Diamonds">
                    <Image
                      src="/assets/claire-logo.png"
                      alt="Claire Diamonds"
                      width={1200}
                      height={800}
                      className="sm:w-[250px] sm:h-[120px] lg:w-[220px] w-[120px] h-[60px]"
                    />
                  </Link>
                </div>

                {/* Cart & Currency */}

                <div className="W-1/3 grid grid-cols-3 gap-x-4 flex items-center">
                  {/* Wishlist */}
                  <span className="wishlist">
                    <a href="" title="Your Wishlist">
                      <FaRegHeart className="w-8 h-8 sm:block hidden text-[#9f7d48]" />
                      <FaRegHeart className="w-6 h-6 sm:hidden block text-[#9f7d48]" />
                    </a>
                  </span>

                  {/* Cart Section */}
                  <span className="cartsection">
                    <a href="" title="Shopping Bag">
                      <HiOutlineShoppingBag className="w-8 h-8 sm:block hidden text-[#9f7d48]" />
                      <HiOutlineShoppingBag className="w-6 h-7 sm:hidden block text-[#9f7d48]" />
                      <span id="topminiquantyDiv"></span>
                    </a>
                    <div id="minicartMainDiv"></div>
                  </span>
                  <Profile />
                </div>
              </div>

              {/* Search Area */}
              <div className="searcharea lg:hidden  w-full  border border-gray-400 mt-2 rounded-[5px] flex items-center space-x-2 ">
                <form
                  action=""
                  method="get"
                  acceptCharset="utf-8"
                  className="w-full"
                >
                  <div className="relative flex w-full items-center">
                    <input
                      id="searchbox0"
                      name="substring"
                      placeholder="Enter Search"
                      type="text"
                      className="w-full font-sans border border-[#9f7d48] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f7d48]"
                    />
                    <FaSearch className="absolute right-3 text-[#43825c]" />{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
