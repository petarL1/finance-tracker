import React from 'react'
import styles from './css/CTA.module.css'

export default function CallToActionButton() {
  return (
    <section className={styles.ctaSection}>
    <h2 className={styles.ctaTitle}>Ready to Take Control of Your Finances?</h2>
    <a
        href='/pages/login'
        className={styles.ctaButton}
     >
    Start Tracking Now
  </a>
</section>

  )
}
