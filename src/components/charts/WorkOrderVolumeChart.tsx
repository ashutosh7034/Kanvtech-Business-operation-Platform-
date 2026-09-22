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

interface WorkOrderVolumeChartProps {
  height?: number;
}

export const WorkOrderVolumeChart: React.FC<WorkOrderVolumeChartProps> = ({ height = 200 }) => {
  const labels = ['16 Sep', '17 Sep', '18 Sep', '19 Sep', '20 Sep', '21 Sep', '22 Sep (Today)'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Completed',
        data: [42, 45, 48, 44, 46, 38, 48],
        backgroundColor: '#0F766E', // brand teal
        borderRadius: 2,
        stack: 'volume',
      },
      {
        label: 'In Progress',
        data: [78, 80, 84, 82, 85, 88, 92],
        backgroundColor: '#94A3B8', // Slate grey
        borderRadius: 2,
        stack: 'volume',
      },
      {
        label: 'Pending / Overdue',
        data: [12, 14, 15, 16, 18, 22, 46],
        backgroundColor: '#FECACA', // subtle red alert
        borderRadius: 2,
        stack: 'volume',
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
        bodyFont: { family: 'JetBrains Mono', size: 11 },
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
