"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Philosopher } from "next/font/google";
import styles from './faq.module.css';


const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const FAQ = () => {
  const faqs = {
    clientCare: [
      {
        question: "How long will it take to get my order?",
        answer:
          "Crafting of your ring typically takes 8-10 weeks, with expediting options available if you need it sooner. The exact completion date can be conveniently found on each product page. Please note that shipping is not included within this date and you can find all our shipping information here. For all timeframe information please visit our crafting timeframes page.",
      },
      {
        question: "What if I need help placing an order through your website?",
        answer:
          "If you need help selecting from our range of diamond engagement rings or lab grown engagement rings, please contact us here. Our team, experienced in both lab created diamonds and moissanite, will assist you.",
      },
      {
        question: "What type of warranty do I receive?",
        answer:
          "Claire Diamonds offers a free Lifetime Manufacturing Warranty on all our products, including lab grown diamond rings, ensuring peace of mind.",
      },
      {
        question: "Do you ship worldwide?",
        answer:
          "Yes! At Claire Diamonds, we offer free international shipping on all orders,including those for the perfect diamond engagement ring. Shop online and add your chosen piece to your shopping bag with ease.,,,, Import Duties and Taxes ,,,,Most of our orders are sent as DDP (Delivery Duty Paid - this means import duties & taxes are covered). However, there may be cases where you may have to pay local import taxes and duties, which Cullen Jewellery does not cover, as some countries do not allow us to pay them as the sender. For more details, please check our Shipping page or contact your local customs agency.",
      },
      {
        question: "Can I just drop in to the showroom?",
        answer:
          "Our showroom, featuring a range of lab grown diamond rings and moissanite pieces, is open by appointment only. Discover our collection of lab grown diamond engagement rings and moissanite in person or online.",
      },
      {
        question: "How do I find out my ring size?",
        answer:
          "At Claire Diamonds, we offer free ring sizers for our entire range. Measure your ring size comfortably at home for that perfect fit.",
      },
    ],
    labDiamonds: [
      {
        question: "Are lab-grown diamonds real?",
        answer:
          "Yes! Lab grown diamonds, also known as laboratory grown diamonds or ethical lab grown diamonds, are chemically identical to mined diamonds or natural diamonds. They offer the same level of beauty and are an extremely popular choice.",
      },
      {
        question:
          "What is the difference between a simulant and a lab grown diamond?",
        answer:
          "A lab grown diamond, unlike a simulant, has the same chemical and physical properties as a mined diamond. They are aesthetically identical to naturally mined diamonds, offering the same fire and brilliance.",
      },
      {
        question:
          "What is the difference between a mined diamond and a lab grown diamond?",
        answer:
          "The only difference between a mined diamond and a lab grown diamond is their origin. Lab grown diamonds are an ethical and sustainable option, offering the same fire, clarity, and carat weights as mined diamonds.",
      },
      {
        question: "Are lab grown diamonds ethical?",
        answer:
          "Lab grown diamonds are a sustainable option, created using advanced technology under high pressure, which is much more ethical than traditional diamond mining methods.",
      },
      {
        question:
          "How does Claire Diamonds ensure a seamless purchase experience?",
        answer:
          "We specialise in lab grown diamond engagement rings. Our collection, available to shop online, ranges in carat weight and design, ensuring you find the perfect diamond for your needs.",
      },
    ],
    moissanite: [
      {
        question: "Is moissanite worth buying?",
        answer:
          "Moissanite is a brilliant choice for those seeking an alternative to a lab diamond engagement ring. It offers the same level of clarity and is graded by Australia-based Radiant Beauty to ensure top quality, just like our lab grown diamond collections.",
      },
      {
        question: "Can moissanite pass diamond tester?",
        answer: "Yes. Due to its similar properties to diamonds (both lab grown and mined or natural diamond rings), moissanite can pass a diamond tester. However, our specialised equipment can distinguish between moissanite and diamonds, ensuring you know exactly what you're purchasing.",
      },
      {
        question: "Is moissanite the best fake diamond?",
        answer: "Moissanite is not a fake diamond but a gemstone that offers stunning lab grown beauty. It's perfect for those looking for the same level of sparkle and clarity found in diamonds, but at a more accessible price point.",
      },
      {
        question: "Are moissanite rings tacky?",
        answer: "Absolutely not! Due to its diamond-like appearance, many people believe the misconception that moissanite is a fake diamond when it is in fact a high quality, beautiful gemstone in its own right. Moissanite is becoming an increasingly popular choice of stone in engagement rings due to its dazzling beauty, durability, ease of customisation and affordability.",
      },
      {
        question: "Do moissanite rings look fake?",
        answer: "No, moissanite rings are crafted to exhibit a sparkle that, to the naked eye, is akin to that of diamonds. They offer timeless beauty and are an aesthetically identical choice for those who admire the appearance of mined diamonds.",
      },
      {
        question: "Does moissanite lose its sparkle?",
        answer: "Moissanite retains its sparkle indefinitely, much like our lab grown and rings. Its clarity and carat weight remain intact, ensuring a lifetime of brilliance.",
      },
      {
        question: "How can I find the perfect moissanite engagement ring at Claire Diamonds?",
        answer: "We make it easy to find your ideal moissanite engagement ring. Request a free ring sizer to determine your correct ring size, and browse our wide selection of moissanite engagement rings on our website. To create a custom ring design, schedule an appointment with our expert team, providing your appointment details. Our specialists will assist you with the entire custom design process to ensure you get the perfect ring. A regular price at Cullen Jewellery offers better accessibility and exceptional value compared to other jewellers.",
      },
    ],
  };

  return (
    <>
      <section className="relative py-4 md:pb-6 pb-4 bg-[url('/assets/faq-bg1.webp')] bg-cover bg-center bg-no-repeat">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#9f7d48]/65 mix-blend-multiply"></div>

        <div className="relative z-10">
          <h2
            className={`text-xl italic lg:text-3xl text-[#f4f1f0] font-semibold text-center ${philosopher.className}`}
          >
            <span className="italic">FAQs</span>
          </h2>
          <p
            className={`text-sm lg:text-lg text-[#f4f1f0] text-center mb-6 ${philosopher.className}`}
          >
            <span className="italic">Your questions, answered.</span>
          </p>

          <div className="container mx-auto px-8">
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#f4f1f0]">
              {/* Client Care Section */}
              <div>
                <h2
                  className={`capitalize mb-4 text-lg lg:text-2xl font-bold text-center ${philosopher.className}`}
                >
                  Client Care
                </h2>
                {faqs.clientCare.map((faq, index) => (
                 <Accordion
                 key={index}
                 className={`${styles.accordion}`}
               >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-[#f4f1f0]" />}
                    >
                      <Typography className="text-sm font-bold font-sans">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-sm font-sans">
                        {faq.answer.split(",,").map((segment, index) => (
                          <React.Fragment key={index}>
                            {segment.trim() === "Import Duties and Taxes" ? (
                              <strong>{segment.trim()}</strong>
                            ) : (
                              segment.trim()
                            )}
                            <br />
                          </React.Fragment>
                        ))}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>

              {/* Lab Grown Diamonds Section */}
              <div>
                <h2
                  className={`capitalize mb-4 text-lg lg:text-2xl font-bold text-center ${philosopher.className}`}
                >
                  Lab Grown Diamonds
                </h2>
                {faqs.labDiamonds.map((faq, index) => (
                  <Accordion
                    key={index}
                    className="bg-white/20 backdrop-blur-xs text-[#f4f1f0] border border-[#f4f1f0]"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-[#f4f1f0]" />}
                    >
                      <Typography className="text-sm font-bold font-sans">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-sm font-sans">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>

              {/* Moissanite Section */}
              <div className="md:w-[680px] lg:w-[100%]">
                <h2
                  className={`capitalize mb-4 text-lg lg:text-2xl font-bold text-center ${philosopher.className}`}
                >
                  Moissanite
                </h2>
                {faqs.moissanite.map((faq, index) => (
                  <Accordion
                    key={index}
                    className="bg-white/20 backdrop-blur-xs text-[#f4f1f0] border border-[#f4f1f0]"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-[#f4f1f0]" />}
                    >
                      <Typography className="text-sm font-bold font-sans">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-sm font-sans">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
