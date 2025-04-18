

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/Header/";
import Nav from "@/components/Header/Nav";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claire Diamonds",
  description: "Discover timeless elegance with Claire Diamonds. Explore engagement rings, necklaces, earrings, and more – designed with love.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

 
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <Head>
          <title>
            Claire Diamonds | Lab-Grown Diamond Rings & Minimal Jewelry
          </title>
          <meta
            name="description"
            content="Discover beautiful lab-grown diamond rings and minimal jewelry. Shop ethically sourced, high-quality designs from Claire Diamonds."
          />
          <meta
            name="keywords"
            content="lab-grown diamonds, diamond rings, ethical jewelry, minimal jewelry, engagement rings"
          />
        </Head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        <Nav />

        {children}
        <Footer />
      </body>
    </html>
  );
}
