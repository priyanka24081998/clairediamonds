import Link from "next/link";
import React from "react";

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
    { title: "Client Care", links: [
        { href: "/education", label: "FAQs" },
        { href: "/education", label: "shipping" },
        { href: "/education", label: "free resizing" },
        { href: "/education", label: "order status" },
        { href: "/education", label: "ring size guide" },
        { href: "/education", label: "ring care guide" },
        { href: "/education", label: "free engraving" },

       
       
    ] },
    { title: "About Us", links: [
     
        { href: "/our story", label: "our story" },
        { href: "/reviews", label: "reviews" },
        { href: "/education", label: "moissanite blog" },
        { href: "/education", label: "lab grown diamond blog" },

    ] },
    { title: "Contact Us", links: [
        { href: "/our story", label: "+91 9979117817" },
        { href: "/reviews", label: "clairediamonds@gmail.com" },
        { href: "/reviews", label: "get in touch" },
        { href: "/reviews", label: "feedback" },

    ] },
 ];

  return (
    <div className="section bg-[#43825c] p-10">
      <div className="container mx-auto w-[1140px]">
        <div className="grid grid-cols-2 md:grid-cols-4 text-[#f4f1f0]">
          {sections.map((section, index) => (
            <div key={index} className="p-4">
              <h4 className="mb-8 text-xs font-bold uppercase">{section.title}</h4>
              {section.links?.length > 0 && (
                <p className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href} className="block text-xs hover:text-yellow-200">
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
  );
};

export default Footer;
