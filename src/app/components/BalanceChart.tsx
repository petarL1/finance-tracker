import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './css/BalanceChart.module.css';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

interface BalanceDataPoint {
  date: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'MKD';
  type: 'income' | 'expense';
}

interface BalanceChartProps {
  data: BalanceDataPoint[];
  selectedCurrency: 'USD' | 'EUR' | 'MKD';
  exchangeRates: { [key: string]: number };
}

const BalanceChart: React.FC<BalanceChartProps> = ({ data, selectedCurrency, exchangeRates }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const convertAmount = (
    amount: number,
    fromCurrency: 'USD' | 'EUR' | 'MKD',
    toCurrency: 'USD' | 'EUR' | 'MKD'
  ) => {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    return (amount / fromRate) * toRate;
  };

  const normalizeData = (data: BalanceDataPoint[], selectedCurrency: 'USD' | 'EUR' | 'MKD', exchangeRates: { [key: string]: number }) => {
    let cumulativeBalance = 0;
    const result: { date: string; balance: number }[] = [];
  
    // Sort transactions by date
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    data.forEach(item => {
      // Normalize the amount based on the item type
      const adjustedAmount = item.type === 'income' ? item.amount : -item.amount;
      const normalizedAmount = convertAmount(adjustedAmount, item.currency, selectedCurrency);
  
      // Update cumulative balance correctly
      cumulativeBalance += normalizedAmount;
  
      // Store the date and cumulative balance
      result.push({ date: item.date, balance: cumulativeBalance });
    });
  
    return result;
  };
  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Normalize data based on selected currency
    const normalizedData = normalizeData(data, selectedCurrency, exchangeRates);
    
    // Log the normalized data for verification
        
    if (normalizedData.length === 0) {
      console.error("No balance data to display");
      return;
    }

    // Directly use normalizedData for the balanceData
    const balanceData = normalizedData.map(item => ({
      date: new Date(item.date).toISOString(),
      balance: Math.round(item.balance * 100) / 100, // Round the balance
    }));

    // Log the final values for verification
    
    // Dynamically calculate the suggested min and max for the y-axis
    const minBalance = Math.min(...balanceData.map(entry => entry.balance));
    const maxBalance = Math.max(...balanceData.map(entry => entry.balance));
    const padding = (maxBalance - minBalance) * 0.1; // Add 10% padding

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: balanceData.map(entry => entry.date),
        datasets: [{
          label: 'Balance Over Time',
          data: balanceData.map(entry => entry.balance),
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          pointRadius: 1,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM D, YYYY',
              displayFormats: {
                day: 'MMM d'
              }
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: false,
            grid: { display: false },
            suggestedMin: minBalance - padding,
            suggestedMax: maxBalance + padding,
            ticks: {
              callback: (value) => `${value.toLocaleString()} ${selectedCurrency}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [data, selectedCurrency, exchangeRates]);


  if (data.length === 0) {
    return <div>No data available for chart.</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <canvas ref={canvasRef} className={styles.lineChart}></canvas>
    </div>
  );
};

export default BalanceChart;
