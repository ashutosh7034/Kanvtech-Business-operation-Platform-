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

export const SlaPerformanceTrendChart: React.FC<{ height?: number }> = ({ height = 160 }) => {
  const data = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep (Now)'],
    datasets: [
      {
        label: 'Actual SLA (%)',
        data: [96.4, 95.8, 95.2, 94.8, 93.6, 94.2],
        borderColor: '#2563EB',
        backgroundColor: '#2563EB',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Target (96.0%)',
        data: [96.0, 96.0, 96.0, 96.0, 96.0, 96.0],
        borderColor: '#10B981',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
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
        labels: { boxWidth: 8, boxHeight: 8, font: { family: 'Inter', size: 10 }, color: '#475569' },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#64748B' },
      },
      y: {
        min: 90,
        max: 100,
        grid: { color: '#F1F5F9' },
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#64748B',
          callback: (value: any) => `${value}%`,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Line data={data} options={options} />
    </div>
  );
};
