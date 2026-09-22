import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const PerformanceTrendChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const data = {
    labels: ['FY 2022-23', 'FY 2023-24', 'FY 2024-25', 'FY 2025-26', 'FY 2026-27 (Current)'],
    datasets: [
      {
        label: 'Average Performance Score (out of 5.0)',
        data: [3.4, 3.6, 3.7, 3.9, 4.1],
        borderColor: '#0F766E', // KANVTECH teal
        backgroundColor: '#0F766E',
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
          label: (context: any) => ` Rating: ${context.raw} / 5.0`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#5F6B76' },
      },
      y: {
        min: 2.5,
        max: 5.0,
        grid: { color: '#E3E6E8' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#5F6B76' },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Line data={data} options={options} />
    </div>
  );
};
