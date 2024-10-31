'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Contact.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Contact: React.FC = () => {
  return (
    <div className={styles.container}>

      <section className={styles.content}>
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p>We would love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through any of the following channels:</p>
          <ul>
            <li>
              <strong>Email:</strong> orgcashflow@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> + 389 75-382-531
            </li>
            <li>
              <strong>Address:</strong> Partizanska bb, 6000 Ohrid
            </li>
          </ul>
          <div className={styles.socialLinks}>
            <ul>
              <li>
              <a href="https://github.com/petarL1/finance-tracker" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/petar-lefteroski-3aa52a206/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <h2>Our Location</h2>
          <MapContainer
            center={[41.1134172201118, 20.802549303859163]}
            zoom={14}
            scrollWheelZoom={true}
            className={styles.map}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[41.1134172201118, 20.802549303859163]}>
              <Popup>UIST Ohrid, University of Information Science and Technology</Popup>
            </Marker>
          </MapContainer>
        </div> 
      <Link href="/" className={styles.submitButton}>Back to Home</Link>
      </section>    
    </div>
  );
};

export default Contact;
