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

interface CapacityDemandChartProps {
  height?: number;
  viewMode?: 'regions' | 'departments';
  onDepartmentClick?: (dept: string) => void;
}

export const CapacityDemandChart: React.FC<CapacityDemandChartProps> = ({
  height = 220,
  viewMode = 'regions',
  onDepartmentClick,
}) => {
  const regionsData = [
    { name: 'Mumbai (Field Hub)', req: 84, avail: 71, gap: -13 },
    { name: 'Pune (Engineering)', req: 52, avail: 49, gap: -3 },
    { name: 'Bengaluru (Support)', req: 61, avail: 59, gap: -2 },
    { name: 'Hyderabad (Automation)', req: 47, avail: 45, gap: -2 },
    { name: 'Delhi NCR (Admin/MEP)', req: 38, avail: 37, gap: -1 },
  ];

  const labels = regionsData.map((d) => d.name);
  const requiredData = regionsData.map((d) => d.req);
  const availableData = regionsData.map((d) => d.avail);

  const data = {
    labels,
    datasets: [
      {
        label: 'Required Headcount',
        data: requiredData,
        backgroundColor: '#94A3B8', // Slate neutral
        borderRadius: 2,
        barPercentage: 0.6,
      },
      {
        label: 'Available On-Duty',
        data: availableData,
        backgroundColor: (context: any) => {
          const index = context.dataIndex;
          const gap = regionsData[index]?.gap || 0;
          if (gap <= -10) return '#DC2626'; // critical deficit (Mumbai)
          if (gap < 0) return '#D97706'; // slight deficit
          return '#0F766E'; // healthy
        },
        borderRadius: 2,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: { family: 'Inter', size: 10.5 },
          color: '#475569',
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 11 },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        padding: 8,
        callbacks: {
          afterBody: function (contexts: any) {
            const index = contexts[0].dataIndex;
            const region = regionsData[index];
            return `Deficit Gap: ${region.gap} personnel`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'JetBrains Mono', size: 10.5 }, color: '#64748B' },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10.5, weight: 'bold' as const }, color: '#334155' },
      },
    },
    onClick: (_event: any, elements: any[]) => {
      if (elements.length > 0 && onDepartmentClick) {
        const index = elements[0].index;
        onDepartmentClick(regionsData[index].name);
      }
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
