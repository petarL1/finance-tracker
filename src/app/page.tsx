'use client'

import React from 'react';
import styles from './Home.module.css';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorks';
import Educational from './components/Educational';
import MyCarousel from './components/Carousel';
import CallToActionButton from './components/CallToActionButton';


const Home: React.FC = () => {
  return (
    <div className={styles.container}>
          <MyCarousel></MyCarousel>
          <CallToActionButton/>
          <HowItWorksSection></HowItWorksSection>
          <FeaturesSection></FeaturesSection>
          <Educational></Educational>
    </div>
  );
};

export default Home;
