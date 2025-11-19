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
        { id: 1, name: 'Round', src: 'ROUND.webp', link: '/shop-by-shape/round' },
        { id: 2, name: 'Oval', src: 'OVAL.webp', link: '/shop-by-shape/oval' },
        { id: 3, name: 'Emerald', src: 'EMERALD.webp', link: '/shop-by-shape/emerald' },
        { id: 4, name: 'Pear', src: 'PEAR.webp', link: '/shop-by-shape/pear' },
        { id: 5, name: 'Princess', src: 'PRINCESS.webp', link: '/shop-by-shape/princess' },
        { id: 6, name: 'Radiant', src: 'RADIANT.webp', link: '/shop-by-shape/radiant' },
        { id: 7, name: 'Lozenge', src: 'LOZENGE.webp', link: '/shop-by-shape/hexagon' },
        { id: 8, name: 'Marquise', src: 'MARQUISE.webp', link: '/shop-by-shape/marquise' },
        { id: 9, name: 'Heart', src: 'HEART.webp', link: '/shop-by-shape/heart' },
        { id: 10, name: 'Cushion', src: 'CUSHION.webp', link: '/shop-by-shape/cushion' },
        { id: 11, name: 'Baguette', src: 'BAGUETTE.webp', link: '/shop-by-shape/hexagon' },
        { id: 12, name: 'Elongated Cushion', src: 'Elongated-Cushion.webp', link: '/shop-by-shape/elongatedcushion' },
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
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-12 gap-6 px-4 md:px-8 mx-auto">
                {shapes.map((shape) => (
                    <div key={shape.id} className="card mx-auto">
                        {/* Link for image */}
                        <Link href={shape.link}>
                            <div className=" bg-white mx-auto">
                                <div className="w-25 h-25 relative mx-auto">
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
                            <h3 className={`text-sm md:text-lg mx-auto sm:w-20 text-[#43825c] ${philosopher.className} font-semibold`}>
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
