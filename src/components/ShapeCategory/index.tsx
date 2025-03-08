'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Philosopher } from 'next/font/google';
import React from 'react';

const philosopher = Philosopher({
    subsets: ['latin'],
    weight: ['400', '700'],
});
  
const ShapeCategory = () => {
    const shapes = [
        { id:1, name: 'Round', src: 'round-shape.avif' },
        { id:2,name: 'Oval', src:'oval-shape.avif' },
        { id:3,name: 'Emerald', src: 'emerald-shape.avif' },
        { id:4,name: 'Pear', src: 'pear-shape.webp' },
        { id:5,name: 'Princess', src: 'princess-shape.webp' },
        { id:6,name: 'Radiant', src: 'radiant-shape.webp' },
        { id:7,name: 'Assechar', src: 'asscher-shape.avif' },
        { id:8,name: 'Marquise', src: 'marquise-shape.avif' },
        { id:9,name: 'Heart', src: 'heart-shape.webp' },
        { id:10,name: 'Cushion', src: 'cushion-cut-diamond.png' },
        { id:11,name: 'Elongated Cushion', src: 'Elongated-Cushion.avif' },
        { id:12,name: 'Hexagon', src: 'ElongatedHexagon.avif' },
    ];
  
    return (
        <>
            <section className="py-10 md:py-16 bg-[#f4f1f0] text-center">
                <h2 className={`text-[20px] md:text-3xl text-[#43825c] font-bold mb-10 md:mb-16 ${philosopher.className}`}>
                    SHOP BY SHAPE
                    <Image
                        src="/assets/divider.png"
                        alt="line"
                        width={1200} 
                        height={800}
                        objectFit="contain"
                        className="w-[100px] h-[10px] md:w-[150px] md:h-[15px] mt-4 mx-auto" 
                    />
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 md:px-8">
                    {shapes.map((shape) => (
                        <div key={shape.id} className="card mx-auto">
                            <Link href="#">
                                <div className="relative w-[80px] overflow-hidden h-[80px] sm:w-[100px] sm:h-[100px] flex flex-col items-center space-y-2 p-4 bg-white rounded-full
                                    before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2
                                    before:border-[#9f7d48] before:z-[1] before:border-dashed before:transition-all before:duration-500
                                    hover:before:animate-[spin_0.9s_linear_infinite] shadow-md mx-auto">
                                    <div className="w-8 h-8 sm:w-14 sm:h-14 relative">
                                        <Image
                                            src={`/assets/${shape.src}`}
                                            alt={shape.name}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                            </Link>
                            <h3 className={`text-sm md:text-lg mt-3 text-[#43825c] ${philosopher.className} font-semibold`}>{shape.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ShapeCategory;
