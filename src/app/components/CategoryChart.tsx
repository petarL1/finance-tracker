import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './css/CategoryChart.module.css';

Chart.register(...registerables);

interface Transaction {
  date: string;
  amount: number;
  category: string; // Add a category property to transactions
  type: 'income' | 'expense'; // Define the type of transaction
}

interface CategoryChartProps {
  data: Transaction[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  useEffect(() => {
    const ctxIncome = document.getElementById('incomeChart') as HTMLCanvasElement;
    const ctxExpense = document.getElementById('expenseChart') as HTMLCanvasElement;

    // Destroy existing charts if they exist
    const incomeChartInstance = Chart.getChart(ctxIncome);
    if (incomeChartInstance) {
      incomeChartInstance.destroy();
    }

    const expenseChartInstance = Chart.getChart(ctxExpense);
    if (expenseChartInstance) {
      expenseChartInstance.destroy();
    }

    // Aggregate income data
    const incomeData: { [key: string]: number } = {};
    const expenseData: { [key: string]: number } = {};
    data.forEach(item => {
      if (item.type === 'income') {
        incomeData[item.category] = (incomeData[item.category] || 0) + item.amount;
      } else {
        expenseData[item.category] = (expenseData[item.category] || 0) + item.amount;
      }
    });

    // Create income chart
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
            '#4caf50', // Green
            '#2196F3', // Blue
            '#FFC107', // Yellow
            '#FF5722', // Orange
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light tooltip background
            borderColor: '#0070f3', // Tooltip border color
            borderWidth: 1, // Tooltip border width
            titleColor: '#0070f3', // Tooltip title color
            bodyColor: '#000', // Tooltip body color
          },
        },
      },
    });

    // Create expense chart
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
            '#f44336', // Red
            '#FF9800', // Orange
            '#5d1ca3', // Purple
            '#8BC34A', // Light Green
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light tooltip background
            borderColor: '#0070f3', // Tooltip border color
            borderWidth: 1, // Tooltip border width
            titleColor: '#0070f3', // Tooltip title color
            bodyColor: '#000', // Tooltip body color
          },
        },
      },
    });
    
    // Cleanup function to destroy the charts
    return () => {
      if (incomeChartInstance) incomeChartInstance.destroy();
      if (expenseChartInstance) expenseChartInstance.destroy();
    };
  }, [data]);

  return (
    <div className={styles.chartContainer}>
      <canvas id="incomeChart" className={styles.pieChart}></canvas>
      <canvas id="expenseChart" className={styles.pieChart}></canvas>
    </div>
  );
};

export default CategoryChart;
