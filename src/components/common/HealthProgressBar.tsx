import React from 'react';

interface HealthProgressBarProps {
  label: string;
  score: number; // 0 to 100
  status: 'healthy' | 'attention' | 'critical';
  details?: string;
  onClick?: () => void;
}

export const HealthProgressBar: React.FC<HealthProgressBarProps> = ({
  label,
  score,
  status,
  details,
  onClick,
}) => {
  return (
    <div
      className="health-item"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="health-item-top">
        <span className="health-item-name">{label}</span>
        <span
          className="health-status-tag"
          style={{
            color:
              status === 'healthy'
                ? 'var(--status-healthy-text)'
                : status === 'attention'
                ? 'var(--status-attention-text)'
                : 'var(--status-critical-text)',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor:
                status === 'healthy'
                  ? 'var(--status-healthy-dot)'
                  : status === 'attention'
                  ? 'var(--status-attention-dot)'
                  : 'var(--status-critical-dot)',
              display: 'inline-block',
            }}
          />
          <span className="num" style={{ fontWeight: 700 }}>{score}%</span>
        </span>
      </div>

      <div className="health-bar-track">
        <div
          className={`health-bar-fill ${status}`}
          style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
        />
      </div>

      {details && <span className="health-metric-sub">{details}</span>}
    </div>
  );
};
