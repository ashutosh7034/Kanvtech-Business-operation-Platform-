import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PayrollTrendChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const data = {
    labels: ['Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26'],
    datasets: [
      {
        label: 'Gross Payroll (₹ Cr)',
        data: [1.62, 1.66, 1.70, 1.74, 1.78, 1.82],
        backgroundColor: '#17202A', // Deep charcoal
        borderRadius: 2,
      },
      {
        label: 'Net Disbursed (₹ Cr)',
        data: [1.32, 1.35, 1.39, 1.42, 1.45, 1.49],
        backgroundColor: '#0F766E', // KANVTECH teal
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: { boxWidth: 8, boxHeight: 8, font: { family: 'Inter', size: 10 }, color: '#5F6B76' },
      },
      tooltip: {
        backgroundColor: '#17202A',
        callbacks: {
          label: (context: any) => ` ₹${context.raw} Cr`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#5F6B76' },
      },
      y: {
        min: 0,
        max: 2.2,
        grid: { color: '#E3E6E8' },
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#5F6B76',
          callback: (value: any) => `₹${value} Cr`,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
