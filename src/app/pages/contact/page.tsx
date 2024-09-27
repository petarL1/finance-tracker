'use client'

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Contact.module.css'; 

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null); // Create a reference to the form

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const name = formData.get('name')?.toString();
      const email = formData.get('email')?.toString();
      const message = formData.get('message')?.toString();

      if (name && email && message) {
        try {
          const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
          });

          if (response.ok) {
            setStatus('Email sent successfully!');
            formRef.current.reset(); // Reset form fields
          } else {
            setStatus('Error sending email. Please try again.');
          }
        } catch (error) {
          setStatus('An unexpected error occurred.');
        }
      } else {
        setStatus('Please fill out all fields.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <section className={styles.content}>
        <div className={styles.formContainer}>
          <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} required />

            <button className={styles.submitButton} type="submit">Send Message</button>
          </form>
          {/* Display the status message */}
          {status && <p>{status}</p>}
        </div>
        <div className={styles.mapContainer}>
          <h2>Our Location</h2>
          <div className={styles.map}>
            <Image 
              src="/map.png" 
              alt="Our Location Map" 
              fill
              className={styles.mapImage}
            />
          </div>
        </div>
      </section>
      <Link href="/" className={styles.link}>Back to Home</Link>
    </div>
  );
};

export default Contact;
