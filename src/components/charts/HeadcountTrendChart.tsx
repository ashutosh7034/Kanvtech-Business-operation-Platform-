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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export const HeadcountTrendChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Now)'],
    datasets: [
      {
        label: 'Total Headcount',
        data: [385, 390, 396, 404, 410, 415, 420, 424, 428],
        borderColor: '#0F766E', // KANVTECH teal
        backgroundColor: 'rgba(15, 118, 110, 0.08)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#0F766E',
        pointRadius: 3,
        pointHoverRadius: 5,
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
        titleFont: { family: 'Inter', size: 11 },
        bodyFont: { family: 'Inter', size: 11 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#5F6B76' },
      },
      y: {
        min: 360,
        max: 450,
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
