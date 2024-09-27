import React from 'react';
import styles from './css/HowItWorks.module.css';

const steps = [
  { step: '1', description: 'Sign up for an account.' },
  { step: '2', description: 'Start tracking your expenses and savings.' },
  { step: '3', description: 'View your progress and improve over time' },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className={styles.howItWorks}>
      <h2>How It Works</h2>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <span className={styles.stepNumber}>{step.step}</span>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
