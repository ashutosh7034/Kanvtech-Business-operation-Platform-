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
import { useFilters } from '../../context/FilterContext';
import { DataService } from '../../data/dataService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ height = 230 }) => {
  const { period, location, department } = useFilters();
  const chartData = DataService.getPerformanceChartData(period, location, department);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Actual Revenue',
        data: chartData.actual,
        borderColor: '#0F766E',
        backgroundColor: 'rgba(15, 118, 110, 0.05)',
        fill: true,
        tension: 0.2,
        pointBackgroundColor: '#0F766E',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1.5,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
      {
        label: 'Target Benchmark',
        data: chartData.target,
        borderColor: '#8A949D',
        borderDash: [4, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const allValues = [...chartData.actual, ...chartData.target];
  const minVal = Math.max(0, Math.floor(Math.min(...allValues) * 0.85));
  const maxVal = Math.ceil(Math.max(...allValues) * 1.12);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          color: '#5F6B76',
        },
      },
      tooltip: {
        backgroundColor: '#17202A',
        titleFont: { family: 'Inter', size: 11, weight: 'bold' as const },
        bodyFont: { family: 'Inter', size: 11 },
        padding: 8,
        cornerRadius: 3,
        callbacks: {
          label: function (context: any) {
            return ` ${context.dataset.label}: ₹${context.parsed.y}L`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#8A949D' },
      },
      y: {
        min: minVal,
        max: maxVal,
        grid: { color: '#E3E6E8' },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#8A949D',
          callback: function (value: any) {
            return `₹${value}L`;
          },
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
