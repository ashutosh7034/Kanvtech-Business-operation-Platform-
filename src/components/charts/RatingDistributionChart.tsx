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

export const RatingDistributionChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const data = {
    labels: ['1 - Poor', '2 - Needs Impr.', '3 - Meets Exp.', '4 - Exceeds Exp.', '5 - Outstanding'],
    datasets: [
      {
        label: 'Employee %',
        data: [5, 12, 38, 32, 13],
        backgroundColor: [
          '#E5E7EB', // 1 - subtle neutral
          '#FDE68A', // 2 - warning soft
          '#93C5FD', // 3 - info soft
          '#0F766E', // 4 - KANVTECH teal
          '#17202A', // 5 - deep graphite
        ],
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#17202A',
        callbacks: {
          label: (context: any) => ` ${context.raw}% (${Math.round((context.raw / 100) * 428)} employees)`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 9 }, color: '#5F6B76' },
      },
      y: {
        min: 0,
        max: 45,
        grid: { color: '#E3E6E8' },
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#5F6B76',
          callback: (value: any) => `${value}%`,
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
