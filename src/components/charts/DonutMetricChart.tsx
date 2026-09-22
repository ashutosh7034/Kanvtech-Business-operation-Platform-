import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutMetricChartProps {
  centerValue: string | number;
  centerLabel: string;
  labels: string[];
  data: number[];
  colors: string[];
  height?: number;
  showLegend?: boolean;
}

export const DonutMetricChart: React.FC<DonutMetricChartProps> = ({
  centerValue,
  centerLabel,
  labels,
  data,
  colors,
  height = 160,
  showLegend = true,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: showLegend,
        position: 'right' as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          font: { family: 'Inter', size: 10 },
          color: '#475569',
          padding: 8,
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label: string, i: number) => ({
              text: `${label} (${datasets[0].data[i]})`,
              fillStyle: datasets[0].backgroundColor[i],
              strokeStyle: datasets[0].backgroundColor[i],
              lineWidth: 0,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 11 },
        bodyFont: { family: 'Inter', size: 11 },
      },
    },
  };

  return (
    <div className="ref-donut-container" style={{ height }}>
      <div style={{ width: showLegend ? '60%' : '100%', height: '100%' }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="ref-donut-center" style={{ left: showLegend ? '30%' : '50%' }}>
        <div className="ref-donut-center-val">{centerValue}</div>
        <div className="ref-donut-center-label">{centerLabel}</div>
      </div>
    </div>
  );
};
