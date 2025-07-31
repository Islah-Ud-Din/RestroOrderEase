'use client';
import 'swiper/css';
import 'swiper/css/pagination';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getHotDeals } from '@/data/menuItems';
import { motion } from 'framer-motion';

const hotDeals = getHotDeals();

// Shuffle utility
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function MenuBannerCarousel() {
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = Array.from({ length: 5 }, () => shuffleArray(hotDeals).slice(0, 3));

    return (
        <div className="rs-banner-wrapper p-4 rounded-lg">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop
                onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                className="rs-banner"
            >
                {slides.map((group, groupIndex) => (
                    <SwiperSlide key={groupIndex}>
                        <div className="rs-banner-content">
                            {group.map((item, itemIndex) => {
                                const animations = [
                                    {
                                        initial: { x: -40, opacity: 0, scale: 0.98 },
                                        animate: { x: 0, opacity: 1, scale: 1 },
                                        transition: { duration: 0.3, ease: 'easeOut', delay: 0 },
                                    },
                                    {
                                        initial: { y: 40, opacity: 0, scale: 0.98 },
                                        animate: { y: 0, opacity: 1, scale: 1 },
                                        transition: { duration: 0.3, ease: 'easeOut', delay: 0.03 },
                                    },
                                    {
                                        initial: { x: 40, opacity: 0, scale: 0.98 },
                                        animate: { x: 0, opacity: 1, scale: 1 },
                                        transition: { duration: 0.3, ease: 'easeOut', delay: 0.06 },
                                    },
                                ];

                                const { initial, animate, delay } = animations[itemIndex] || animations[2];

                                return (
                                    <motion.div
                                        key={`${groupIndex}-${slideIndex}-${itemIndex}`}
                                        className="rsb-item p-3 rounded-lg"
                                        initial={initial}
                                        animate={animate}
                                        transition={{ duration: 0.4, ease: 'easeOut', delay }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            width={500}
                                            height={500}
                                            className="image-fluid object-cover"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                );
                            })}

                            {/* Overlay */}
                            <div className="overlay" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
