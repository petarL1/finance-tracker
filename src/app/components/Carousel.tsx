import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import styles from './css/Carousel.module.css';

import { Navigation, Pagination } from 'swiper/modules';

const MyCarousel: React.FC = () => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        <SwiperSlide className={styles.carouselItem}>
          <div className={styles.carouselImageWrapper}>
            <Image
              className={styles.carouselImage}
              src="/slide1.jpg"
              alt="Image showing a personal finance tracker"
              layout="fill"
              priority
              sizes="(max-width: 600px) 100vw, (min-width: 601px) 100vw"
            />
          </div>
          <div className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Your personal finance tracker</h3>
            <p>All of your finances in one place</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.carouselItem}>
          <div className={styles.carouselImageWrapper}>
            <Image
              className={styles.carouselImage}
              src="/slide2.jpg"
              alt="Image showing a planner and strategy tools"
              layout="fill"
              sizes="(max-width: 600px) 100vw, (min-width: 601px) 100vw"
            />
          </div>
          <div className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Stay ahead of others</h3>
            <p>Plan your decisions and make every move count</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.carouselItem}>
          <div className={styles.carouselImageWrapper}>
            <Image
              className={styles.carouselImage}
              src="/slide3.jpg"
              alt="Image showing financial literacy resources"
              layout="fill"
              sizes="(max-width: 600px) 100vw, (min-width: 601px) 100vw"
            />
          </div>
          <div className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>
              Learn more about financial literacy
            </h3>
            <p>Smart decisions lead to a smart <em>and wealthy</em> life</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MyCarousel;
