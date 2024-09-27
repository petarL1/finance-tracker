'use client';  // This ensures the component runs on the client-side

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './css/Navbar.module.css';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth(); // Get session state from AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/"><Image src="/logo.png" alt="CashFlow" width={50} height={50} />
        CashFlow
        </Link>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <ul>
          <li>
          <Link href={session ? '/pages/profile' : '/pages/login'}>
              Profile
            </Link>
          </li>
          <li>
            <Link href="/pages/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/pages/contact">
              Contact
            </Link>
          </li>
          {!session && (
            <li>
              <Link href="/pages/login">
                Login/Register
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <button className={styles.hamburger} onClick={toggleMenu}>
        {/* Hamburger Icon */}
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </header>
  );
};

export default Navbar;
