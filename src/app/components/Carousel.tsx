import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './css/Carousel.module.css';

const MyCarousel: React.FC = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel>
        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src="/slide1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Your personal finance tracker</h3>
            <p>All of your finances in one place</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src="/slide2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Stay ahead of others</h3>
            <p>Plan your decisions and make every move count</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={styles.carouselImage}
            src="/slide3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Learn more what it means to be financially literate</h3>
            <p>Smart decisions lead to a smart <em>and wealthy</em> life</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
