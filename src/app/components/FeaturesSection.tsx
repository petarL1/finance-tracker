import React from 'react';
import styles from './css/FeaturesSection.module.css';

const features = [
  {
    title: 'Transaction List',
    description: 'Keep track of all your transactions in one single place. Write down the date, amount, description, type, category and currency in which the transaction was made.',
    desktopImage: 'transaction-list-desktop.png',
    mobileImage: 'transaction-list-mobile.png',
  },
  {
    title: 'Charts',
    description: 'See your progress over time with detailed visual representations of your financial data, with a simple line chart to show your balance over time and a pie chart to clearly divide your spendings into categories.',
    desktopImage: 'charts-desktop.png',
    mobileImage: 'charts-mobile.png',
  },
  {
    title: 'Tips and Educational Content',
    description: 'Improve your financial literacy with a collection of budgeting and saving tips, as well as popular finance topics and strategies.',
    desktopImage: 'educational-desktop.png',
    mobileImage: 'educational-mobile.png',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Key Features</h2>
      <div className={styles.featuresList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.desktopFrame}>
                <img src={feature.desktopImage} alt={`${feature.title} desktop view`} className={styles.featureImage} />
              </div>
              <div className={styles.mobileFrame}>
                <img src={feature.mobileImage} alt={`${feature.title} mobile view`} className={styles.featureImage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
