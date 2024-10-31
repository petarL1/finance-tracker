import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './css/Carousel.module.css';

const MyCarousel: React.FC = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel>
        <Carousel.Item className={styles.carouselItem}>
          <img
            className={styles.carouselImage}
            src="/slide1.jpg"
            srcSet="/slide1.jpg 1024w, /slide1-mobile.jpg 600w"
            sizes="(max-width: 600px) 600px, 90vh"
            alt="First slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Your personal finance tracker</h3>
            <p>All of your finances in one place</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carouselItem}>
          <img
            className={styles.carouselImage}
            src="/slide2.jpg"
            srcSet="/slide2.jpg 1024w, /slide2-mobile.jpg 600w"
            sizes="(max-width: 600px) 600px, 90vh"
            alt="Second slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Stay ahead of others</h3>
            <p>Plan your decisions and make every move count</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carouselItem}>
          <img
            className={styles.carouselImage}
            src="/slide3.jpg"
            srcSet="/slide3.jpg 1024w, /slide3-mobile.jpg 600w"
            sizes="(max-width: 600px) 600px, 90vh"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Learn more about what it means to be financially literate</h3>
            <p>Smart decisions lead to a smart <em>and wealthy</em> life</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
