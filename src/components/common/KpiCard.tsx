import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  secondaryValue?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    isPositive?: boolean; // e.g. up is good for revenue, but up is bad for SLA breach
  };
  comparisonText?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  highlight?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  secondaryValue,
  trend,
  comparisonText,
  icon,
  onClick,
  highlight,
}) => {
  const isClickable = !!onClick;

  let trendClass = 'neutral';
  if (trend) {
    if (trend.direction === 'up') {
      trendClass = trend.isPositive !== false ? 'up-positive' : 'up-negative';
    } else if (trend.direction === 'down') {
      trendClass = trend.isPositive === true ? 'down-positive' : 'down-negative';
    }
  }

  return (
    <div
      className={`kpi-card ${isClickable ? 'interactive' : ''}`}
      onClick={onClick}
      style={{
        borderLeft: highlight ? '3px solid var(--brand-primary)' : undefined,
      }}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {icon && <span className="kpi-icon-wrap">{icon}</span>}
      </div>

      <div className="kpi-body">
        <span className="kpi-value num">{value}</span>
        {secondaryValue && <span className="kpi-secondary">{secondaryValue}</span>}
      </div>

      {(trend || comparisonText) && (
        <div className="kpi-footer">
          {trend && (
            <span className={`trend-badge ${trendClass}`}>
              {trend.direction === 'up' && <TrendingUp size={12} />}
              {trend.direction === 'down' && <TrendingDown size={12} />}
              {trend.direction === 'neutral' && <Minus size={12} />}
              <span>{trend.value}</span>
            </span>
          )}
          {comparisonText && <span className="trend-comparison-text">{comparisonText}</span>}
        </div>
      )}
    </div>
  );
};
