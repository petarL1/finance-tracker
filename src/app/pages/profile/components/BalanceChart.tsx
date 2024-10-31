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

  const normalizeData = (data: BalanceDataPoint[], selectedCurrency: 'USD' | 'EUR' | 'MKD') => {
    let cumulativeBalance = 0;
    const result: { date: string; balance: number }[] = [];
  
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    data.forEach(item => {
      const adjustedAmount = item.type === 'income' ? item.amount : -item.amount;
      const normalizedAmount = convertAmount(adjustedAmount, item.currency, selectedCurrency);      
      cumulativeBalance += normalizedAmount;      
      result.push({ date: item.date, balance: cumulativeBalance });
    });
    return result;
  };

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    let chartInstance = Chart.getChart(ctx); 
    if (chartInstance) {
      chartInstance.destroy();
    }

    const normalizedData = normalizeData(data, selectedCurrency);
    if (normalizedData.length === 0) {
      console.error("No balance data to display");
      return;
    }

    const balanceData = normalizedData.map(item => ({
      date: new Date(item.date).toISOString(),
      balance: Math.round(item.balance * 100) / 100, 
    }));

    const minBalance = Math.min(...balanceData.map(entry => entry.balance));
    const maxBalance = Math.max(...balanceData.map(entry => entry.balance));
    const padding = (maxBalance - minBalance) * 0.1;

    chartInstance = new Chart(ctx, {
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
              tooltipFormat: 'MMM d, YYYY',
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
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, selectedCurrency, exchangeRates]);

  if (data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <canvas ref={canvasRef} className={styles.lineChart}></canvas>
    </div>
  );
};

export default BalanceChart;
