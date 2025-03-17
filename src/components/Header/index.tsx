"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
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
                          href="tel:9979117817"
                          title="Call us on +91 9979117817"
                        >
                          <FaPhoneAlt className="w-5 h-5" />
                        </a>
                      </span>
                      <span className="addtocall font-sans hidden sm:flex">
                        +91 9979117817
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
                      >
                        <FaInstagram className="text-[#f4f1f0] hover:text-pink-400" />
                      </Link>
                      <Link
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF className="text-[#f4f1f0] hover:text-blue-400" />
                      </Link>
                      <Link
                        href="https://www.tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTiktok className="text-[#f4f1f0] hover:text-gray-700" />
                      </Link>
                      <Link href="mailto:your-email@example.com">
                        <MdEmail className="text-[#f4f1f0] text-2xl hover:text-[#43825c]" />
                      </Link>
                    </div>
                    {/* <span className="currency relative "> */}
                    {/* <button className="w-[150px] z-[999] font-sans sm:absolute sm:top-[-15px] sm:left-[-120px] absolute top-[-15px] left-[-110px]  px-2 rounded-full"> */}
                    <Currency />
                    {/* </button> */}
                    {/* </span> */}
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
                        className="border-b font-sans border-[#9f7d48] p-2 pr-10 w-full"
                      />
                      <FaSearch className="absolute right-3 text-[#43825c]" />{" "}
                    </div>
                  </form>
                </div>

                {/* Logo */}
                <div className="w-[180px] lg:w-1/3 ml-[35px] lg:ml-[-50px]">
                  <Link href="/" title="Claire Diamonds">
                    <Image
                      src="/assets/logo2.png"
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
                    <a
                      href="https://www.angelicdiamonds.com?target=cart"
                      title="Shopping Bag"
                    >
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
                      className="w-full font-sans border border-[#9f7d48]  p-2"
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
