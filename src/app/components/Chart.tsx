import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './css/Chart.module.css';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Chart: React.FC = () => {
  // Sample data, replace with actual survey data later
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months or time periods
    datasets: [
      {
        label: 'Budget Improvement (%)',
        data: [10, 20, 30, 40, 50, 60], // Replace with your actual data
        fill: false,
        borderColor: '#0070f3',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Improvement: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Improvement (%)',
        },
      },
    },
  };

  return (
    <section className={styles.chartSection}>
      <h2>How Our App Improves Your Budgeting</h2>
      <div className={styles.chartContainer}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
};

export default Chart;
