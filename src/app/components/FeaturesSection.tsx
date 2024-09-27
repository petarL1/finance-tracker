import React from 'react';
import styles from './css/FeaturesSection.module.css';

const features = [
  {
    title: 'Transaction List',
    description: 'Keep track of all your transactions in one single place.',
    image: 'transaction-list.png',
  },
  {
    title: 'Charts',
    description: 'See your progress over time with detailed visual representations of your financial data.',
    image: 'charts.png',
  },
  {
    title: 'Tips and Educational Content',
    description: 'Improve your financial literacy with the best budgeting and saving tips.',
    image: 'tips.png',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Key Features</h2>
      <div className={styles.featuresList}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.featureItem} ${index % 2 === 0 ? styles.leftAlign : styles.rightAlign}`}
          >
            <div className={styles.featureImageWrapper}>
              <img src={feature.image} alt={feature.title} className={styles.featureImage} />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
