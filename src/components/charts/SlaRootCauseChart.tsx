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

interface SlaRootCauseChartProps {
  height?: number;
}

export const SlaRootCauseChart: React.FC<SlaRootCauseChartProps> = ({ height = 150 }) => {
  const causes = [
    { label: 'Technician Capacity Shortage', pct: 42, color: '#DC2626' },
    { label: 'Emergency Demand Surge (+14)', pct: 27, color: '#D97706' },
    { label: 'Certification Constraints', pct: 18, color: '#475569' },
    { label: 'Customer Site Access Delays', pct: 8, color: '#64748B' },
    { label: 'Spares Replenishment Delays', pct: 5, color: '#94A3B8' },
  ];

  const data = {
    labels: causes.map((c) => c.label),
    datasets: [
      {
        label: '% Contribution to SLA Variance',
        data: causes.map((c) => c.pct),
        backgroundColor: causes.map((c) => c.color),
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
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 11 },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        callbacks: {
          label: (ctx: any) => ` ${ctx.parsed.x}% of total SLA variance`,
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 50,
        grid: { color: '#F1F5F9' },
        ticks: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#64748B',
          callback: (v: any) => `${v}%`,
        },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 10.5, weight: 'bold' as const }, color: '#334155' },
      },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
