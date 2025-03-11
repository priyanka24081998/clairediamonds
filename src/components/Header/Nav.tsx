"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Philosopher } from "next/font/google";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
// import styles from './nav.module.css'

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Nav: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenus((prev) => (prev === index ? null : index));
  };

  // Define Types
  interface NavSubItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }
  interface NavCategory {
    category: string;
    items: NavSubItem[];
  }
  interface NavItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
    subItems?: (NavSubItem | NavCategory)[];
  }

  const navItems: NavItem[] = [
    {
      name: "Engagement Rings",
      href: "/engagementrings",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Solitaire Rings",
              href: "/engagementrings/classic-styles",
              icon: "solitaire-ring.svg",
            },
            {
              name: "Shoulder Rings",
              href: "/engagementrings/halo-rings",
              icon: "shoulder-ring.svg",
            },

            {
              name: "Halo Rings",
              href: "/engagementrings/halo-rings",
              icon: "halo-ring.svg",
            },
            {
              name: "Three Stone Rings",
              href: "/engagementrings/halo-rings",
              icon: "three-stone-ring.svg",
            },
            {
              name: "Curved Rings",
              href: "/engagementrings/halo-rings",
              icon: "two-stone-ring.svg",
            },
            {
              name: "Cluster Rings",
              href: "/engagementrings/halo-rings",
              icon: "cluster-ring.svg",
            },
            {
              name: "Tension Rings",
              href: "/engagementrings/halo-rings",
              icon: "tension-ring.svg",
            },
            {
              name: "Bezel Rings",
              href: "/engagementrings/halo-rings",
              icon: "bezel-ring.svg",
            },
            {
              name: "Vintage Rings",
              href: "/engagementrings/halo-rings",
              icon: "vintage-ring.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagementrings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagementrings/princess",
              icon: "princess.svg",
            },
            {
              name: "Emerald",
              href: "/engagementrings/princess",
              icon: "emerald.svg",
            },
            {
              name: "Asscher",
              href: "/engagementrings/princess",
              icon: "asscher.svg",
            },
            {
              name: "Oval",
              href: "/engagementrings/princess",
              icon: "oval.svg",
            },
            {
              name: "Pear",
              href: "/engagementrings/princess",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/engagementrings/princess",
              icon: "heart.svg",
            },
            {
              name: "Marquise",
              href: "/engagementrings/princess",
              icon: "marquise.svg",
            },
            {
              name: "Cushion",
              href: "/engagementrings/princess",
              icon: "cushion.svg",
            },
            {
              name: "Radiant",
              href: "/engagementrings/princess",
              icon: "radiant.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagementrings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagementrings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagementrings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagementrings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagementrings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagementrings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagementrings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagementrings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagementrings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Diamond Bands",
      href: "/diamondbands",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Trilogy Rings",
              href: "/engagement-rings/classic-styles",
              icon: "three-stone-ring.svg",
            },
            {
              name: "Five Stone Rings",
              href: "/engagement-rings/halo-rings",
              icon: "five-stone-ring.svg",
            },
            {
              name: "Seven Stone Rings",
              href: "/engagement-rings/halo-rings",
              icon: "seven-stone-ring.svg",
            },
            {
              name: "Half Eternity Rings",
              href: "/engagement-rings/halo-rings",
              icon: "half-eternity.svg",
            },
            {
              name: "Full Eternity Rings",
              href: "/engagement-rings/halo-rings",
              icon: "full-eternity.svg",
            },
            {
              name: "Eternity Rings",
              href: "/engagement-rings/halo-rings",
              icon: "eternity-ring.svg",
            },
            {
              name: "Mens Rings",
              href: "/engagement-rings/halo-rings",
              icon: "mens-diamond-ring.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
            {
              name: "Emerald",
              href: "/engagement-rings/princess",
              icon: "emerald.svg",
            },
            {
              name: "Asscher",
              href: "/engagement-rings/princess",
              icon: "asscher.svg",
            },
            {
              name: "Oval",
              href: "/engagement-rings/princess",
              icon: "oval.svg",
            },
            {
              name: "Pear",
              href: "/engagement-rings/princess",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/engagement-rings/princess",
              icon: "heart.svg",
            },
            {
              name: "Marquise",
              href: "/engagement-rings/princess",
              icon: "marquise.svg",
            },
            {
              name: "Cushion",
              href: "/engagement-rings/princess",
              icon: "cushion.svg",
            },
            {
              name: "Radiant",
              href: "/engagement-rings/princess",
              icon: "radiant.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Wedding Bands",
      href: "/weddingbands",
      subItems: [
        {
          category: "Mens",
          items: [
            {
              name: "Mens Plain Bands",
              href: "/engagement-rings/classic-styles",
              icon: "mens-plain-wedding.svg",
            },
            {
              name: "Mens Diamond Bands",
              href: "/engagement-rings/halo-rings",
              icon: "mens-diamond-ring.svg",
            },
          ],
        },
        {
          category: "Ladies",
          items: [
            {
              name: "Ladies Plain Bands",
              href: "/engagement-rings/round",
              icon: "ladies-plain-wedding.svg",
            },
            {
              name: "Ladies Diamond Bands",
              href: "/engagement-rings/princess",
              icon: "ladies-diamond-wedding.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Earrings",
      href: "/earrings",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Stud Earrings",
              href: "/engagement-rings/classic-styles",
              icon: "stud-earring.svg",
            },
            {
              name: "Halo Earrings",
              href: "/engagement-rings/halo-rings",
              icon: "halo-earring.svg",
            },
            {
              name: "Drop Earrings",
              href: "/engagement-rings/halo-rings",
              icon: "drop-earring.svg",
            },
            {
              name: "Hoop Earrings",
              href: "/engagement-rings/halo-rings",
              icon: "hoop-earring.svg",
            },
            {
              name: "Cluster Earrings",
              href: "/engagement-rings/halo-rings",
              icon: "cluster-earring.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
            {
              name: "Pear",
              href: "/engagement-rings/princess",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/engagement-rings/princess",
              icon: "heart.svg",
            },
            {
              name: "Emerald",
              href: "/engagement-rings/princess",
              icon: "emerald.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Pendants",
      href: "/pendants",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Solitaire Pendants",
              href: "/engagement-rings/classic-styles",
              icon: "solitaire-pendant.svg",
            },
            {
              name: "Cluster Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "cluster-pendant.svg",
            },
            {
              name: "Halo Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "halo-pendant.svg",
            },
            {
              name: "Heart Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "heart-pendant.svg",
            },
            {
              name: "Drop Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "drop-pendant.svg",
            },
            {
              name: "Cross Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "cross-pendant.svg",
            },
            {
              name: "Circle Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "circle-pendant.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
            {
              name: "Pear",
              href: "/engagement-rings/princess",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/engagement-rings/princess",
              icon: "heart.svg",
            },
            {
              name: "Emerald",
              href: "/engagement-rings/princess",
              icon: "emerald.svg",
            },
            {
              name: "Cushion",
              href: "/engagement-rings/princess",
              icon: "cushion.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Gemstones",
      href: "/gemstones",
      subItems: [
        {
          category: "Ruby",
          items: [
            {
              name: "Ruby Rings",
              href: "/engagement-rings/classic-styles",
              icon: "ruby-ring.svg",
            },
            {
              name: "Ruby Earrings",
              href: "/engagement-rings/halo-rings",
              icon: "ruby-earring.svg",
            },
            {
              name: "Ruby Pendants",
              href: "/engagement-rings/halo-rings",
              icon: "ruby-pendant.svg",
            },
          ],
        },
        {
          category: "Pink Sapphire",
          items: [
            {
              name: "Pink Sapphire Rings",
              href: "/engagement-rings/round",
              icon: "pink-sapphire-ring.svg",
            },
            {
              name: "Pink Sapphire Earrings",
              href: "/engagement-rings/princess",
              icon: "pink-sapphire-earring.svg",
            },
            {
              name: "Pink Sapphire Pendants",
              href: "/engagement-rings/princess",
              icon: "pink-sapphire-pendant.svg",
            },
          ],
        },
        {
          category: "Sapphire",
          items: [
            {
              name: "Sapphire Rings",
              href: "/engagement-rings/gold",
              icon: "sapphire-ring.svg",
            },
            {
              name: "Sapphire Earrings",
              href: "/engagement-rings/platinum",
              icon: "sapphire-earring.svg",
            },
            {
              name: "Sapphire Pendants",
              href: "/engagement-rings/platinum",
              icon: "sapphire-pendant.svg",
            },
          ],
        },
        {
          category: "Emerald",
          items: [
            {
              name: "Emerald Rings",
              href: "/engagement-rings/gold",
              icon: "emerald-ring.svg",
            },
            {
              name: "Emerald Earrings",
              href: "/engagement-rings/platinum",
              icon: "emerald-earring.svg",
            },
            {
              name: "Emerald Pendants",
              href: "/engagement-rings/platinum",
              icon: "emerald-pendant.svg",
            },
          ],
        },
      ],
    },
    {
      name: "Bracelates",
      href: "/bracelates",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Tennis Bracelets",
              href: "/engagement-rings/classic-styles",
              icon: "tennis-bracelet.svg",
            },
            {
              name: "Delicate Bracelets",
              href: "/engagement-rings/halo-rings",
              icon: "delicate-bracelet.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Minimal",
      href: "/minimal",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Tennis Bracelets",
              href: "/engagement-rings/classic-styles",
              icon: "tennis-bracelet.svg",
            },
            {
              name: "Delicate Bracelets",
              href: "/engagement-rings/halo-rings",
              icon: "delicate-bracelet.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
    {
      name: "Hip-Hop",
      href: "/hiphop",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Tennis Bracelets",
              href: "/engagement-rings/classic-styles",
              icon: "tennis-bracelet.svg",
            },
            {
              name: "Delicate Bracelets",
              href: "/engagement-rings/halo-rings",
              icon: "delicate-bracelet.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/engagement-rings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/engagement-rings/princess",
              icon: "princess.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "", icon: "silver-metal.png" },
            {
              name: "10K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "10K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "10K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "14K White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "14K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "14K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
            {
              name: "18K White Gold",
              href: "/engagement-rings/platinum",
              icon: "whitemetal.png",
            },
            {
              name: "18K Yellow Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "18K Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.webp",
            },
          ],
        },
      ],
    },
  ];

  return (
    <nav className="py-2 bg-[#f4f1f0] shadow-md relative w-full sticky top-0 z-100">
      <div className="container mx-auto px-6 flex items-center justify-evenly">
        {/* Desktop Navigation */}
        {/* <ul className={`hidden md:flex text-sm gap-x-6 flex ${styles.demo}`}> */}
        <ul className={`hidden lg:flex text-sm flex `}>
          {navItems.map((item, index) => (
            <li key={index} className="group">
              <div className="capitalize text-center">
                <Link
                  href={item.href}
                  className={` ${philosopher.className} text-center font-sans px-[5px] lg:px-[20px] text-xs sm:text-sm md:text-md lg:text-lg text-[#9f7d48] hover:text-[#43825c]`}
                >
                  {item.name}
                </Link>
              </div>
              {item.subItems && (
                <div className="sm:w-full sm:absolute sm:left-0 md:top-[35px] hidden bg-[#f4f1f0] shadow-lg sm:p-6 sm:px-48 mt-2 group-hover:block z-10">
                  <div className="menu-header mb-4 border-b pb-2 border-[#9f7d48]">
                    <div className="menu-headerconatiner">
                      <div className="menumainhead">
                        <a
                          href=""
                          className={`font-bold font-sans text-[#9f7d48]  ${philosopher.className}`}
                        >
                          Browse {item.name} By:
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className="flex justify-between h-auto w-full mx-auto">
                    {item.subItems.map((subItem, subIndex) => {
                      if ("category" in subItem) {
                        return (
                          <li
                            key={subIndex}
                            className="pr-16 border-r border-[#9f7d48]"
                          >
                            <div className="font-semibold font-sans text-[#43825c] mb-2">
                              <div className="uppercase">
                                {subItem.category}
                              </div>
                            </div>
                            <ul className="capitalized">
                              {subItem.items.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <div className="flex items-center font-sans space-x-2">
                                    <Image
                                      src={`/assets/${nestedItem.icon}`}
                                      width={40}
                                      height={40}
                                      alt={nestedItem.name}
                                    />

                                    <Link
                                      href={nestedItem.href}
                                      className="text-[#9f7d48] hover:text-[#43825c]"
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      } else {
                        return (
                          <li key={subIndex}>
                            <Image
                              src={`/assets/${subItem.icon}`}
                              width={50}
                              height={50}
                              alt={subItem.name}
                            />
                            <Link
                              href={subItem.href}
                              className="text-gray-700 font-sans hover:text-blue-500"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden absolute top-[-120px] left-[0px] h-[20px] md:top-[-135px] md:left-[10px] pl-2">
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon className="text-[#9f7d48]" />
          </IconButton>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="w-64 p-4 bg-[#f4f1f0]">
          <div className="flex justify-between mb-2 border-b border-[#9f7d48] py-2">
            <a href="https://www.angelicdiamonds.com" title="Claire Diamonds">
              <Image
                src="/assets/claire.png"
                alt="Claire Diamonds"
                width={1200} // Use a number for width
                height={800} // Use a number for height
                className="w-[100px] h-[50px]" // Optional, can be omitted because width and height are set
              />
            </a>
            <div className="close">
              <button
                className="text-[#9f7d48] hover:text-[#43825c] mb-4 flex items-center"
                onClick={() => setIsDrawerOpen(false)}
              >
                <IoClose size={30} className="border-2 rounded-full" />
              </button>
            </div>
          </div>

          <ul className="flex flex-col text-sm capitalized">
            {navItems.map((item, index) => (
              <li key={index}>
                <div
                  className="flex font-sans justify-between items-center sm:py-4 py-2 border-b cursor-pointer text-[#9f7d48] hover:text-[#43825c]"
                  onClick={() => toggleMenu(index)}
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <span>
                      {openMenus === index ? (
                        <MdOutlineKeyboardArrowUp />
                      ) : (
                        <MdOutlineKeyboardArrowDown />
                      )}
                    </span>
                  )}
                </div>
                {item.subItems && openMenus === index && (
                  <div className="title">
                    <div className="menu-header mb-4">
                      <div className="menu-headerconatiner">
                        <div className="menumainhead">
                          <a
                            href=""
                            className="font-bold font-sans text-[#9f7d48] text-xs sm:text-sm border-b py-2 my-2"
                          >
                            Browse All {item.name} By:
                          </a>
                        </div>
                      </div>
                    </div>

                    <ul className="pl-4 mt-2 space-y-2">
                      {item.subItems.map((subItem, subIndex) => {
                        if ("category" in subItem) {
                          return (
                            <li key={subIndex}>
                              <div className="font-semibold font-sans mb-2 text-[#43825c] text-[16px]">
                                {subItem.category}
                              </div>
                              <ul>
                                {subItem.items.map(
                                  (nestedItem, nestedIndex) => (
                                    <li key={nestedIndex}>
                                      <div className="flex items-center space-x-2 ">
                                        <Image
                                          src={`/assets/${nestedItem.icon}`}
                                          width={50}
                                          height={50}
                                          alt={nestedItem.name}
                                        />

                                        <Link
                                          href={nestedItem.href}
                                          className="text-[#9f7d48] font-sans hover:text-[#43825c]"
                                        >
                                          {nestedItem.name}
                                        </Link>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          );
                        } else {
                          return (
                            <li key={subIndex}>
                              <Image
                                src={`/assets/${subItem.icon}`}
                                width={50}
                                height={50}
                                alt={subItem.name}
                              />

                              <Link
                                href={subItem.href}
                                className="text-[#9f7d48] font-sans hover:text-[#43825c]"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </nav>
  );
};

export default Nav;
