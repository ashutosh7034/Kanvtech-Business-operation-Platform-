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
import { useFilters } from '../../context/FilterContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const SlaPerformanceTrendChart: React.FC<{ height?: number }> = ({ height = 160 }) => {
  const { period, location } = useFilters();

  const isPune = location === 'Pune';
  const isBlr = location === 'Bengaluru';
  const baseSla = isPune ? 96.2 : isBlr ? 96.8 : 94.2;

  let labels: string[] = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  let actual: number[] = [96.4, 95.8, 95.2, 94.8, 93.6, baseSla];

  if (period === 'Today') {
    labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    actual = isPune
      ? [98.0, 97.2, 96.5, 96.0, 96.2, 96.4]
      : isBlr
      ? [98.5, 97.8, 97.0, 96.8, 96.5, 96.8]
      : [96.0, 95.2, 94.5, 93.8, 94.0, 94.2];
  } else if (period === '7 Days') {
    labels = ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'];
    actual = isPune
      ? [96.8, 96.5, 96.0, 96.2, 96.4, 97.0, 96.2]
      : isBlr
      ? [97.2, 97.0, 96.8, 96.5, 96.8, 97.5, 96.8]
      : [95.2, 94.8, 94.0, 93.5, 93.8, 94.5, 94.2];
  } else if (period === '30 Days') {
    labels = ['24-30 Aug', '31 Aug-6 Sep', '7-13 Sep', '14-20 Sep', '21-22 Sep'];
    actual = isPune
      ? [95.8, 96.0, 96.2, 96.4, 96.2]
      : isBlr
      ? [96.5, 96.8, 96.6, 97.0, 96.8]
      : [94.8, 94.5, 93.6, 93.8, 94.2];
  } else {
    // Quarter
    labels = ['Jul 2026', 'Aug 2026', 'Sep 2026 (Q2)'];
    actual = isPune
      ? [95.9, 96.1, 96.2]
      : isBlr
      ? [96.6, 96.7, 96.8]
      : [94.8, 93.6, 94.2];
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual SLA (%)',
        data: actual,
        borderColor: '#2563EB',
        backgroundColor: '#2563EB',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Target (96.0%)',
        data: labels.map(() => 96.0),
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

