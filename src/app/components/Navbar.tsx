'use client';  

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './css/Navbar.module.css';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth(); 
  
  // Ref to the navbar to detect clicks outside
  const navbarRef = useRef<HTMLDivElement | null>(null);
  
  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header} ref={navbarRef}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="CashFlow" width={70} height={70} />
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
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </header>
  );
};

export default Navbar;
