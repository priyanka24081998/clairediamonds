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
        { id: 1, name: 'Round', src: 'round-shape.avif', link: '/shop-by-shape/round' },
        { id: 2, name: 'Oval', src: 'oval-shape.avif', link: '/shop-by-shape/oval' },
        { id: 3, name: 'Emerald', src: 'emerald-shape.avif', link: '/shop-by-shape/emerald' },
        { id: 4, name: 'Pear', src: 'pear-shape.webp', link: '/shop-by-shape/pear' },
        { id: 5, name: 'Princess', src: 'princess-shape.webp', link: '/shop-by-shape/princess' },
        { id: 6, name: 'Radiant', src: 'radiant-shape.webp', link: '/shop-by-shape/radiant' },
        { id: 7, name: 'Asschar', src: 'asscher-shape.avif', link: '/shop-by-shape/asschar' },
        { id: 8, name: 'Marquise', src: 'marquise-shape.avif', link: '/shop-by-shape/marquise' },
        { id: 9, name: 'Heart', src: 'heart-shape.webp', link: '/shop-by-shape/heart' },
        { id: 10, name: 'Cushion', src: 'cushion-cut-diamond.png', link: '/shop-by-shape/cushion' },
        { id: 11, name: 'Elongated Cushion', src: 'Elongated-Cushion.avif', link: '/shop-by-shape/elongatedcushion' },
        { id: 12, name: 'Hexagon', src: 'ElongatedHexagon.avif', link: '/shop-by-shape/hexagon' },
    ];

    return (
        <section className="py-10 md:py-16 bg-white text-center">
            <h2 className={`text-[20px] md:text-3xl text-[#43825c] font-bold mb-6 md:mb-14 ${philosopher.className}`}>
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
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-12 gap-6 px-4 md:px-8">
                {shapes.map((shape) => (
                    <div key={shape.id} className="card mx-auto">
                        {/* Link for image */}
                        <Link href={shape.link}>
                            <div className=" bg-white mx-auto">
                                <div className="w-12 h-12 sm:w-20 sm:h-20 relative mx-auto">
                                    <Image
                                        src={`/assets/${shape.src}`}
                                        alt={shape.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        </Link>
                        {/* Link for name */}
                        <Link href={shape.link}>
                            <h3 className={`text-sm md:text-lg sm:w-20 text-[#43825c] ${philosopher.className} font-semibold`}>
                                {shape.name}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShapeCategory;
