import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { Carousel } from 'react-bootstrap';
import styles from './css/Carousel.module.css';

const MyCarousel: React.FC = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel>
        <Carousel.Item className={styles.carouselItem}>
          <picture>
            <source srcSet="/slide1-mobile.jpg" media="(max-width: 600px)" />
            <source srcSet="/slide1.jpg" media="(min-width: 601px)" />
            <Image
              className={styles.carouselImage}
              src="/slide1.jpg" // Fallback source for browsers that don't support <picture>
              alt="First slide"
              width={1024}  
              height={600}  
              layout="responsive" 
            />
          </picture>
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Your personal finance tracker</h3>
            <p>All of your finances in one place</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carouselItem}>
          <picture>
            <source srcSet="/slide2-mobile.jpg" media="(max-width: 600px)" />
            <source srcSet="/slide2.jpg" media="(min-width: 601px)" />
            <Image
              className={styles.carouselImage}
              src="/slide2.jpg"
              alt="Second slide"
              width={1024}  
              height={600}  
              layout="responsive" 
            />
          </picture>
          <Carousel.Caption className={styles.carouselCaption}>
            <h3 className={styles.slideHeading}>Stay ahead of others</h3>
            <p>Plan your decisions and make every move count</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={styles.carouselItem}>
          <picture>
            <source srcSet="/slide3-mobile.jpg" media="(max-width: 600px)" />
            <source srcSet="/slide3.jpg" media="(min-width: 601px)" />
            <Image
              className={styles.carouselImage}
              src="/slide3.jpg"
              alt="Third slide"
              width={1024}  
              height={600}  
              layout="responsive" 
            />
          </picture>
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
