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

export const LeaveTrendChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Leave Requested (Days)',
        data: [320, 410, 450, 380, 520, 610, 480, 415, 267],
        backgroundColor: '#5F6B76', // Muted slate
        borderRadius: 2,
      },
      {
        label: 'Leave Approved (Days)',
        data: [305, 395, 432, 360, 498, 585, 462, 398, 250],
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
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#5F6B76' },
      },
      y: {
        min: 0,
        max: 700,
        grid: { color: '#E3E6E8' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#5F6B76' },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
