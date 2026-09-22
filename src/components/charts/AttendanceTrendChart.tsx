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

export const AttendanceTrendChart: React.FC<{ height?: number }> = ({ height = 220 }) => {
  const labels = ['Mon 15', 'Tue 16', 'Wed 17', 'Thu 18', 'Fri 19', 'Sat 20', 'Mon 22 (Today)'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Present (On Duty)',
        data: [405, 402, 399, 401, 398, 390, 397],
        backgroundColor: '#0F766E', // brand teal
        borderRadius: 2,
        stack: 'attendance',
      },
      {
        label: 'Approved Leave',
        data: [15, 18, 20, 19, 21, 25, 21],
        backgroundColor: '#FED7AA', // subtle amber
        borderRadius: 2,
        stack: 'attendance',
      },
      {
        label: 'Unplanned Absent',
        data: [8, 8, 9, 8, 9, 13, 10],
        backgroundColor: '#FECACA', // subtle red
        borderRadius: 2,
        stack: 'attendance',
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
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10 }, color: '#64748B' },
      },
      y: {
        stacked: true,
        min: 0,
        max: 440,
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#64748B' },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
