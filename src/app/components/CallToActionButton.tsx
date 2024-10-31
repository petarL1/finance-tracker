import React, { useEffect, useState } from 'react';
import styles from './css/CTA.module.css';
import Link from 'next/link';

export default function CallToActionButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to Take Control of Your Finances?</h2>
      <Link
        href={isLoggedIn ? '/pages/profile' : '/pages/login'} 
        className={styles.ctaButton}
      >
        {isLoggedIn ? 'Go to Your Profile' : 'Start Tracking Now'}
      </Link>
    </section>
  );}