import React, { useEffect, useState } from 'react';
import styles from './css/CTA.module.css';
import Link from 'next/link';

export default function CallToActionButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in, example: check localStorage for an auth token
    const token = localStorage.getItem('token'); // Example: adjust based on your authentication method
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to Take Control of Your Finances?</h2>
      <Link
        href={isLoggedIn ? '/pages/profile' : '/pages/login'} // Redirect based on login status
        className={styles.ctaButton}
      >
        {isLoggedIn ? 'Go to Your Profile' : 'Start Tracking Now'}
      </Link>
    </section>
  );
}
