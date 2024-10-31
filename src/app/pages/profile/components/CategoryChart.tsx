import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './css/CategoryChart.module.css';

Chart.register(...registerables);

interface Transaction {
  date: string;
  amount: number;
  category: string; 
  type: 'income' | 'expense'; 
  currency: 'USD' | 'EUR' | 'MKD'; 
}

interface CategoryChartProps {
  data: Transaction[];
  selectedCurrency: 'USD' | 'EUR' | 'MKD'; 
  currencyRates: { [key: string]: number }; 
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data, selectedCurrency, currencyRates }) => {
  useEffect(() => {
    const ctxIncome = document.getElementById('incomeChart') as HTMLCanvasElement;
    const ctxExpense = document.getElementById('expenseChart') as HTMLCanvasElement;
    const incomeChartInstance = Chart.getChart(ctxIncome);
    if (incomeChartInstance) {
      incomeChartInstance.destroy();
    }
    const expenseChartInstance = Chart.getChart(ctxExpense);
    if (expenseChartInstance) {
      expenseChartInstance.destroy();
    }
    const convertAmount = (amount: number, fromCurrency: 'USD' | 'EUR' | 'MKD', toCurrency: 'USD' | 'EUR' | 'MKD') => {
      if (fromCurrency === toCurrency) {
        return amount;
      }
      const conversionRate = currencyRates[toCurrency] / currencyRates[fromCurrency];
      return parseFloat((amount * conversionRate).toFixed(2));
    };
      
    const incomeData: { [key: string]: number } = {};
    const expenseData: { [key: string]: number } = {};
    
    data.forEach(item => {
      if (!item.type || !item.category) {
        console.warn('Skipping invalid transaction:', item);
        return;
      }
      
      const convertedAmount = convertAmount(item.amount, item.currency, selectedCurrency);
      
      if (item.type === 'income') {
        incomeData[item.category] = (incomeData[item.category] || 0) + convertedAmount;
      } else {
        expenseData[item.category] = (expenseData[item.category] || 0) + convertedAmount;
      }
    });
    
    const incomeLabels = Object.keys(incomeData);
    const incomeValues = Object.values(incomeData);
    new Chart(ctxIncome, {
      type: 'pie',
      data: {
        labels: incomeLabels,
        datasets: [{
          label: 'Income by Category',
          data: incomeValues,
          backgroundColor: [
            '#4caf50', 
            '#2196F3', 
            '#FFC107', 
            '#FF5722', 
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#0070f3',
            borderWidth: 1,
            titleColor: '#0070f3',
            bodyColor: '#000',
          },
        },},
    });    
    const expenseLabels = Object.keys(expenseData);
    const expenseValues = Object.values(expenseData);
    new Chart(ctxExpense, {
      type: 'pie',
      data: {
        labels: expenseLabels,
        datasets: [{
          label: 'Expenses by Category',
          data: expenseValues,
          backgroundColor: [
            '#f44336', 
            '#FF9800', 
            '#5d1ca3', 
            '#8BC34A', 
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#0070f3',
            borderWidth: 1,
            titleColor: '#0070f3',
            bodyColor: '#000',
          },
        },
      },
    });
    
    return () => {
      if (incomeChartInstance) incomeChartInstance.destroy();
      if (expenseChartInstance) expenseChartInstance.destroy();
    };
  }, [data, selectedCurrency, currencyRates]); 
  
  return (
    <div className={styles.chartContainer}>
      <canvas id="incomeChart" className={styles.pieChart}></canvas>
      <canvas id="expenseChart" className={styles.pieChart}></canvas>
    </div>
  );
};

export default CategoryChart;
