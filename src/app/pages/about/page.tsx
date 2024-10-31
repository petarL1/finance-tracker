import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './About.module.css'; 

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <section className={styles.content}>
        <div className={styles.imageContainer}>
        <Image 
            src="/logo-black.png" 
            alt="Our Team" 
            fill
            sizes="(max-width: 600px) 100vw, 
                  (max-width: 1200px) 50vw, 
                  33vw" 
            className={styles.image}
            style={{ objectFit: 'cover' }} 
            />

        </div>
        <div className={styles.text}>
          <p>
            Welcome to CashFlow! The only finance tracking app you will ever need, providing you with 
            a number of tools to keep you one step ahead of others. With our finance tracker, progress charts and informational content,
            you will be able to stay informed of your financial situation, at all times.
          </p>
          <p>
            The mission was to create a free to use finance tool which would virtually be useful to anyone. Don't prolong success any longer, sign up now!
          </p>
          <Link href="/" className={styles.link}>Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
