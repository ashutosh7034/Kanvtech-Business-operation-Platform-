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

export const SlaTrendChart: React.FC<{ height?: number }> = ({ height = 180 }) => {
  const labels = ['16 Sep', '17 Sep', '18 Sep', '19 Sep', '20 Sep', '21 Sep', '22 Sep (Today)'];

  const data = {
    labels,
    datasets: [
      {
        label: 'SLA Target (96%)',
        data: [96, 96, 96, 96, 96, 96, 96],
        borderColor: '#94A3B8',
        borderDash: [4, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Actual SLA Compliance',
        data: [96.4, 96.1, 95.8, 95.2, 94.9, 94.5, 94.2],
        borderColor: '#D97706', // Warning Amber
        backgroundColor: 'rgba(217, 119, 6, 0.08)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#D97706',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 3,
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
        labels: { boxWidth: 10, boxHeight: 10, font: { family: 'Inter', size: 10 }, color: '#475569' },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
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
          callback: (v: any) => `${v}%`,
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
