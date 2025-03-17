// import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Review from "@/components/Review";
import ShopCategory from "@/components/ShopCategory";
import ShapeCategory from "@/components/ShapeCategory";
import About from "@/components/About";
import About1 from "@/components/About1";
import Features from "@/components/Features";
import Head from "next/head";

export default function Home() {
  return (
    
    <>
    <Head>
        <title>Claire Diamonds | Elegant Fine Jewelry for Every Occasion</title>
        <meta
          name="description"
          content="Discover Claire Diamonds - your destination for elegant, handcrafted fine jewelry. Shop timeless pieces for every occasion."
        />
      </Head>
    <Hero />
    <ShapeCategory />
    <About />
    <ShopCategory />
    <About1 />
    <Features />
    <Review />
    <FAQ />

    </>
  );
}
