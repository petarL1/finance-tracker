import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './css/BalanceChart.module.css';

Chart.register(...registerables);

interface BalanceChartProps {
  data: { date: string; balance: number }[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Using ref for canvas element
  const chartInstanceRef = useRef<Chart | null>(null); // Ref to store chart instance

  useEffect(() => {
    const ctx = canvasRef.current;

    // Destroy previous chart instance if it exists to prevent chart duplication
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Aggregate data by date
    const aggregatedData: { [key: string]: number } = {};
    data.forEach(item => {
      aggregatedData[item.date] = (aggregatedData[item.date] || 0) + item.balance;
    });

    // Convert aggregated data into arrays for chart
    const labels = Object.keys(aggregatedData);
    const balances = Object.values(aggregatedData);

    // Calculate the maximum balance for setting the y-axis ceiling
    const maxBalance = Math.max(...balances) || 0; // Ensure a default value of 0

    // Create the chart instance and store it in the ref
    chartInstanceRef.current = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Balance Over Time',
            data: balances,
            backgroundColor: 'rgba(0, 112, 243, 0.3)', // Light transparent blue
            borderColor: '#0070f3', // Line color
            borderWidth: 4, // Line thickness
            fill: true, // Fill below the line
            tension: 0.3, // Smooth line
            pointRadius: 4, // Make points visible
            pointHoverRadius: 6, // Increase size on hover
            pointBackgroundColor: '#0070f3', // Point color
            pointBorderWidth: 2, // Point border width
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to fill its container
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light tooltip background
            borderColor: '#0070f3', // Tooltip border color
            borderWidth: 1, // Tooltip border width
            titleColor: '#0070f3', // Tooltip title color
            bodyColor: '#000', // Tooltip body color
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
              font: {
                weight: 'bold',
              },
            },
            grid: {
              display: false, // Hide x-axis grid lines
            },
          },
          y: {
            title: {
              display: true,
              text: 'Balance',
              font: {
                weight: 'bold',
              },
            },
            grid: {
              display: true, // Show y-axis grid lines
            },
            beginAtZero: true, // Ensure y-axis starts at zero
            max: Math.round(maxBalance * 1.1 / 100) * 100, // Set the max to 10% higher than the max balance
          },
        },
        elements: {
          line: {
            borderWidth: 4, // Line thickness
          },
          point: {
            radius: 4, // Point radius
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance on unmount or data change
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // Run effect when `data` changes

  return <canvas ref={canvasRef} className={styles.chartContainer}></canvas>;
};

export default BalanceChart;
