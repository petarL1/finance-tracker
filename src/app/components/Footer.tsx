'use client';
import React from 'react';
import Link from 'next/link';
import styles from './css/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoSection}>
          <Link href="/">            
               CashFlow 
          </Link>
          <p>Your trusted financial tracker.</p>
        </div>

        <div className={styles.linksSection}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.socialSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <Link href="https://github.com/petarL1?tab=repositories" target='blank'>
              
                <i className="fa fa-github"></i>
              
            </Link>
            <Link href="https://www.linkedin.com/in/petar-lefteroski-3aa52a206/" target='blank'>
              
                <i className="fa fa-linkedin"></i>
              
            </Link>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} CashFlow. All rights reserved.
      </p>
    </footer>);};
export default Footer;
