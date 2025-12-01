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
              href: "/engagementrings/solitierrings",
              icon: "solitaire-ring.svg",
            },
            {
              name: "Shoulder Rings",
              href: "/engagementrings/shoulderrings",
              icon: "shoulder-ring.svg",
            },

            {
              name: "Halo Rings",
              href: "/engagementrings/halorings",
              icon: "halo-ring.svg",
            },
            {
              name: "Trilogy Rings",
              href: "/engagementrings/trilogyrings",
              icon: "three-stone-ring.svg",
            },
            {
              name: "Toi et moi Rings",
              href: "/engagementrings/toietmoirings",
              icon: "two-stone-ring.svg",
            },
            {
              name: "Cluster Rings",
              href: "/engagementrings/clusterrings",
              icon: "cluster-ring.svg",
            },
            {
              name: "Tension Rings",
              href: "/engagementrings/tensionrings",
              icon: "tension-ring.svg",
            },
            {
              name: "Bezel Rings",
              href: "/engagementrings/bezelrings",
              icon: "bezel-ring.svg",
            },
            {
              name: "Vintage Rings",
              href: "/engagementrings/vintagerings",
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
              href: "/engagementrings/emerald",
              icon: "emerald.svg",
            },
            {
              name: "Asscher",
              href: "/engagementrings/asscher",
              icon: "asscher.svg",
            },
            {
              name: "Oval",
              href: "/engagementrings/oval",
              icon: "oval.svg",
            },
            {
              name: "Pear",
              href: "/engagementrings/pear",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/engagementrings/heart",
              icon: "heart.svg",
            },
            {
              name: "Marquise",
              href: "/engagementrings/marquise",
              icon: "marquise.svg",
            },
            {
              name: "Cushion",
              href: "/engagementrings/cushion",
              icon: "cushion.svg",
            },
            {
              name: "Radiant",
              href: "/engagementrings/radiant",
              icon: "radiant.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "/engagementrings/silver", icon: "silvermetal.png" },
            
            {
              name: "White Gold",
              href: "/engagementrings/whitegold",
              icon: "whitemetal.png",
            },
            {
              name: "Yellow Gold",
              href: "/engagementrings/gold",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/engagementrings/rosegold",
              icon: "rosemetal.png",
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
              name: "Three Stone Rings",
              href: "/diamondbands/threestonerings",
              icon: "three-stone-ring.svg",
            },
            {
              name: "Five Stone Rings",
              href: "/diamondbands/fivestonerings",
              icon: "five-stone-ring.svg",
            },
            {
              name: "Seven Stone Rings",
              href: "/diamondbands/sevenstonerings",
              icon: "seven-stone-ring.svg",
            },
            {
              name: "Half Eternity Rings",
              href: "/diamondbands/halfeternityrings",
              icon: "half-eternity.svg",
            },
            {
              name: "Full Eternity Rings",
              href: "/diamondbands/fulleternityrings",
              icon: "full-eternity.svg",
            },
            {
              name: "Eternity Rings",
              href: "/diamondbands/eternityrings",
              icon: "eternity-ring.svg",
            },
            {
              name: "Mens Rings",
              href: "/diamondbands/mensrings",
              icon: "mens-diamond-ring.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/diamondbands/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/diamondbands/princess",
              icon: "princess.svg",
            },
            {
              name: "Emerald",
              href: "/diamondbands/emerald",
              icon: "emerald.svg",
            },
            {
              name: "Asscher",
              href: "/diamondbands/asscher",
              icon: "asscher.svg",
            },
            {
              name: "Oval",
              href: "/diamondbands/oval",
              icon: "oval.svg",
            },
            {
              name: "Pear",
              href: "/diamondbands/pear",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/diamondbands/heart",
              icon: "heart.svg",
            },
            {
              name: "Marquise",
              href: "/diamondbands/marquise",
              icon: "marquise.svg",
            },
            {
              name: "Cushion",
              href: "/diamondbands/cushion",
              icon: "cushion.svg",
            },
            {
              name: "Radiant",
              href: "/diamondbands/radiant",
              icon: "radiant.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "/diamondbands/silver", icon: "silvermetal.png" },
            {
              name: "White Gold",
              href: "/diamondbands/whitegold",
              icon: "whitemetal.png",
            },
            {
              name: "Yellow Gold",
              href: "/diamondbands/gold",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/diamondbands/rosegold",
              icon: "rosemetal.png",
            },
           
          ],
        },
      ],
    },
    // {
    //   name: "Wedding Bands",
    //   href: "/weddingbands",
    //   subItems: [
    //     {
    //       category: "Mens",
    //       items: [
    //         {
    //           name: "Mens Plain Bands",
    //           href: "/weddingbands/menplainbands",
    //           icon: "mens-plain-wedding.svg",
    //         },
    //         {
    //           name: "Mens Diamond Bands",
    //           href: "/weddingbands/mendiamondband",
    //           icon: "mens-diamond-ring.svg",
    //         },
    //       ],
    //     },
    //     {
    //       category: "Ladies",
    //       items: [
    //         {
    //           name: "Ladies Plain Bands",
    //           href: "/weddingbands/ladiesplainbands",
    //           icon: "ladies-plain-wedding.svg",
    //         },
    //         {
    //           name: "Ladies Diamond Bands",
    //           href: "/weddingbands/ladiesdiamondbands",
    //           icon: "ladies-diamond-wedding.svg",
    //         },
    //       ],
    //     },
    //     {
    //       category: "Metal",
    //       items: [
    //         { name: "Sterline Silver", href: "/weddingbands/silver", icon: "silvermetal.png" },
    //         {
    //           name: "White Gold",
    //           href: "/weddingbands/whitegold",
    //           icon: "whitemetal.png",
    //         },
    //         {
    //           name: "Yellow Gold",
    //           href: "/weddingbands/gold",
    //           icon: "goldmetal.png",
    //         },
    //         {
    //           name: "Rose Gold",
    //           href: "/weddingbands/rosegold",
    //           icon: "rosemetal.png",
    //         },
           
    //       ],
    //     },
    //   ],
    // },
    {
      name: "Earrings",
      href: "/earrings",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Stud Earrings",
              href: "/earrings/studearrings",
              icon: "stud-earring.svg",
            },
            {
              name: "Halo Earrings",
              href: "/earrings/haloearrings",
              icon: "halo-earring.svg",
            },
            {
              name: "Drop Earrings",
              href: "/earrings/dropearrings",
              icon: "drop-earring.svg",
            },
            {
              name: "Hoop Earrings",
              href: "/earrings/hoopearrings",
              icon: "hoop-earring.svg",
            },
            {
              name: "Cluster Earrings",
              href: "/earrings/clusterearrings",
              icon: "cluster-earring.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/earrings/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/earrings/princess",
              icon: "princess.svg",
            },
            {
              name: "Pear",
              href: "/earrings/pear",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/earrings/heart",
              icon: "heart.svg",
            },
            {
              name: "Emerald",
              href: "/earrings/emerald",
              icon: "emerald.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "/earrings/silver", icon: "silvermetal.png" },
            {
              name: "White Gold",
              href: "/earrings/whitegold",
              icon: "whitemetal.png",
            },
            {
              name: "Yellow Gold",
              href: "/earrings/gold",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/earrings/rosegold",
              icon: "rosemetal.png",
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
              href: "/pendants/solitairependants",
              icon: "solitaire-pendant.svg",
            },
            {
              name: "Cluster Pendants",
              href: "/pendants/clusterpendants",
              icon: "cluster-pendant.svg",
            },
            {
              name: "Halo Pendants",
              href: "/pendants/halopendants",
              icon: "halo-pendant.svg",
            },
            {
              name: "Heart Pendants",
              href: "/pendants/heartpendants",
              icon: "heart-pendant.svg",
            },
            {
              name: "Drop Pendants",
              href: "/pendants/droppendants",
              icon: "drop-pendant.svg",
            },
            {
              name: "Cross Pendants",
              href: "/pendants/crosspendants",
              icon: "cross-pendant.svg",
            },
            {
              name: "Circle Pendants",
              href: "/pendants/circlependants",
              icon: "circle-pendant.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/pendants/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/pendants/princess",
              icon: "princess.svg",
            },
            {
              name: "Pear",
              href: "/pendants/pear",
              icon: "pear.svg",
            },
            {
              name: "Heart",
              href: "/pendants/heart",
              icon: "heart.svg",
            },
            {
              name: "Emerald",
              href: "/pendants/emerald",
              icon: "emerald.svg",
            },
            {
              name: "Cushion",
              href: "/pendants/cushion",
              icon: "cushion.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "/pendants/silver", icon: "silvermetal.png" },
            {
              name: " White Gold",
              href: "/pendants/whitegold",
              icon: "whitemetal.png",
            },
            {
              name: " Yellow Gold",
              href: "/pendants/gold",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/pendants/rosegold",
              icon: "rosemetal.png",
            },
           
          ],
        },
      ],
    },
    // {
    //   name: "Gemstones",
    //   href: "/gemstones",
    //   subItems: [
    //     {
    //       category: "Ruby",
    //       items: [
    //         {
    //           name: "Ruby Rings",
    //           href: "/gemstones/rubyrings",
    //           icon: "ruby-ring.svg",
    //         },
    //         {
    //           name: "Ruby Earrings",
    //           href: "/gemstones/rubyearrings",
    //           icon: "ruby-earring.svg",
    //         },
    //         {
    //           name: "Ruby Pendants",
    //           href: "/gemstones/rubypendants",
    //           icon: "ruby-pendant.svg",
    //         },
    //       ],
    //     },
    //     {
    //       category: "Pink Sapphire",
    //       items: [
    //         {
    //           name: "Pink Sapphire Rings",
    //           href: "/gemstones/pinksapphirerings",
    //           icon: "pink-sapphire-ring.svg",
    //         },
    //         {
    //           name: "Pink Sapphire Earrings",
    //           href: "/gemstones/pinksapphireearrings",
    //           icon: "pink-sapphire-earring.svg",
    //         },
    //         {
    //           name: "Pink Sapphire Pendants",
    //           href: "/gemstones/pinksapphirependants",
    //           icon: "pink-sapphire-pendant.svg",
    //         },
    //       ],
    //     },
    //     {
    //       category: "Sapphire",
    //       items: [
    //         {
    //           name: "Sapphire Rings",
    //           href: "/gemstones/sapphirerings",
    //           icon: "sapphire-ring.svg",
    //         },
    //         {
    //           name: "Sapphire Earrings",
    //           href: "/gemstones/sapphireearrings",
    //           icon: "sapphire-earring.svg",
    //         },
    //         {
    //           name: "Sapphire Pendants",
    //           href: "/gemstones/sapphirependants",
    //           icon: "sapphire-pendant.svg",
    //         },
    //       ],
    //     },
    //     {
    //       category: "Emerald",
    //       items: [
    //         {
    //           name: "Emerald Rings",
    //           href: "/gemstones/emeraldrings",
    //           icon: "emerald-ring.svg",
    //         },
    //         {
    //           name: "Emerald Earrings",
    //           href: "/gemstones/emeraldearrings",
    //           icon: "emerald-earring.svg",
    //         },
    //         {
    //           name: "Emerald Pendants",
    //           href: "/gemstones/emeraldpendants",
    //           icon: "emerald-pendant.svg",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: "Necklace",
      href: "/necklace",
      subItems: [
        {
          category: "Ruby",
          items: [
            {
              name: "Ruby Rings",
              href: "/necklace/rubyrings",
              icon: "ruby-ring.svg",
            },
            {
              name: "Ruby Earrings",
              href: "/necklace/rubyearrings",
              icon: "ruby-earring.svg",
            },
            {
              name: "Ruby Pendants",
              href: "/necklace/rubypendants",
              icon: "ruby-pendant.svg",
            },
          ],
        },
        {
          category: "Pink Sapphire",
          items: [
            {
              name: "Pink Sapphire Rings",
              href: "/necklace/pinksapphirerings",
              icon: "pink-sapphire-ring.svg",
            },
            {
              name: "Pink Sapphire Earrings",
              href: "/necklace/pinksapphireearrings",
              icon: "pink-sapphire-earring.svg",
            },
            {
              name: "Pink Sapphire Pendants",
              href: "/necklace/pinksapphirependants",
              icon: "pink-sapphire-pendant.svg",
            },
          ],
        },
        {
          category: "Sapphire",
          items: [
            {
              name: "Sapphire Rings",
              href: "/necklace/sapphirerings",
              icon: "sapphire-ring.svg",
            },
            {
              name: "Sapphire Earrings",
              href: "/necklace/sapphireearrings",
              icon: "sapphire-earring.svg",
            },
            {
              name: "Sapphire Pendants",
              href: "/necklace/sapphirependants",
              icon: "sapphire-pendant.svg",
            },
          ],
        },
        {
          category: "Emerald",
          items: [
            {
              name: "Emerald Rings",
              href: "/necklace/emeraldrings",
              icon: "emerald-ring.svg",
            },
            {
              name: "Emerald Earrings",
              href: "/necklace/emeraldearrings",
              icon: "emerald-earring.svg",
            },
            {
              name: "Emerald Pendants",
              href: "/necklace/emeraldpendants",
              icon: "emerald-pendant.svg",
            },
          ],
        },
      ],
    },
    {
      name: "Bracelets",
      href: "/bracelates",
      subItems: [
        {
          category: "Style",
          items: [
            {
              name: "Tennis Bracelets",
              href: "/bracelates/tennisbracelets",
              icon: "tennis-bracelet.svg",
            },
            {
              name: "Delicate Bracelets",
              href: "/bracelates/delicatebracelets",
              icon: "delicate-bracelet.svg",
            },
          ],
        },
        {
          category: "Shape",
          items: [
            {
              name: "Round",
              href: "/bracelates/round",
              icon: "round.svg",
            },
            {
              name: "Princess",
              href: "/bracelates/princess",
              icon: "princess.svg",
            },
          ],
        },
        {
          category: "Metal",
          items: [
            { name: "Sterline Silver", href: "/bracelates/silver", icon: "silvermetal.png" },
            {
              name: "White Gold",
              href: "/bracelates/whitegold",
              icon: "whitemetal.png",
            },
            {
              name: "Yellow Gold",
              href: "/bracelates/gold",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/bracelates/rosegold",
              icon: "rosemetal.png",
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
          category: "Minimal Rings",
          items: [
            {
              name: "Thin band rings",
              href: "/minimal/thinbandrings",
              icon: "ladies-diamond-wedding.svg",
            },
            {
              name: "Stacking rings",
              href: "/minimal/stackingrings",
              icon: "stackring.svg",
            },
            {
              name: "Dainty solitaire rings",
              href: "/minimal/daintysolitairerings",
              icon: "solitaire-ring.svg",
            },
          ],
        },
        {
          category: "Minimal Necklaces",
          items: [
            {
              name: "Bar pendants",
              href: "/minimal/barpendants",
              icon: "bar-pendant.svg",
            },
            {
              name: "Small geometric shapes",
              href: "/minimal/smallgeometricshapes",
              icon: "geometricpendant.svg",
            },
            {
              name: "Tiny diamond/single pearl pendants",
              href: "/minimal/tinydiamondsinglepearlpendants",
              icon: "tinypendant.svg",
            },
          ],
        },
        {
          category: "Minimal Earrings",
          items: [
            {
              name: "Studs",
              href: "/minimal/studs",
              icon: "stud-earring.svg",
            },
            {
              name: "Tiny hoops or huggie earrings",
              href: "/minimal/tinyhoopsearrings",
              icon: "hoop-earring.svg",
            },
            {
              name: "Threader earrings",
              href: "/minimal/threaderearrings",
              icon: "threaderearring.svg",
            },
          ],
        },
        {
          category: "Minimal Bracelets",
          items: [
            {
              name: "Simple chain bracelets",
              href: "/minimal/simplechainbracelets",
              icon: "chainbracelate.svg"
            },
            {
              name: "Bangle cuffs",
              href: "/minimal/banglecuffs",
              icon: "banglecuff.svg",
            },
            {
              name: "Charm-free delicate bracelets",
              href: "/minimal/delicatebracelets",
              icon: "delicate-bracelet.svg",
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
            { name: "Sterline Silver", href: "", icon: "silvermetal.png" },
            {
              name: "White Gold",
              href: "/engagement-rings/gold",
              icon: "whitemetal.png",
            },
            {
              name: "Gold",
              href: "/engagement-rings/platinum",
              icon: "goldmetal.png",
            },
            {
              name: "Rose Gold",
              href: "/engagement-rings/platinum",
              icon: "rosemetal.png",
            },
            
          ],
        },
      ],
    },
  ];

  return (
    <nav className="py-2 bg-white shadow-md relative w-full sticky top-0 z-100">
      <div className="container mx-auto  flex items-center justify-evenly">
        {/* Desktop Navigation */}
        {/* <ul className={`hidden md:flex text-sm gap-x-6 flex ${styles.demo}`}> */}
        <ul className={`hidden lg:flex text-sm flex`}>
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
                <div className="sm:w-full sm:absolute sm:left-0 md:top-[25px] hidden bg-white shadow-lg sm:p-6 sm:px-48  mt-2 group-hover:block z-10">
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
                            className="pr-18 pl-2 border-r border-[#9f7d48]"
                          >
                            <div className="font-semibold font-sans text-[#43825c] mb-2">
                              <div className="uppercase">
                                {subItem.category}
                              </div>
                            </div>
                            <ul className="capitalized ">
                              {subItem.items.map((nestedItem, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <div className="flex items-center font-sans space-x-2 w-[150px]">
                                    <Image
                                      src={`/assets/${nestedItem.icon}`}
                                      width={40}
                                      height={40}
                                      alt={nestedItem.name}
                                    />

                                    <Link
                                      href={nestedItem.href}
                                      className="text-[#9f7d48] py-2 hover:text-[#43825c] border-b border-[#9f7d48]"
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
        <div className="lg:hidden absolute top-[-115px] left-[0px] h-[20px] md:top-[-145px] md:left-[10px] pl-2">
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
        className="w-64 p-4 bg-[#f4f1f0]"
      >
        <div className="w-64 p-4 bg-[#f4f1f0]">
          <div className="flex justify-between mb-2 border-b border-[#9f7d48] py-2">
            <a href="https://www.clairediamonds.com" title="Claire Diamonds">
              <Image
                src="/assets/claire-logo.png"
                alt="Claire Diamonds"
                width={1200} 
                height={800}
                className="w-[100px] h-[50px]" 
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
