import React from 'react';

interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'sm' }) => {
  const normalized = (status || '').toLowerCase().replace(/[\s_]+/g, '-');

  let dotClass = 'neutral';
  let displayText = label || status;

  if (['healthy', 'active', 'completed', 'present', 'adequate', 'filled', 'joined', 'operational'].includes(normalized)) {
    dotClass = 'healthy';
  } else if (['attention', 'pending', 'expiring', 'expiring-30', 'expiring-90', 'leave', 'on-leave', 'late', 'interviewing', 'low', 'maintenance-due', 'maintenance_due'].includes(normalized)) {
    dotClass = 'attention';
  } else if (['critical', 'overdue', 'expired', 'absent', 'at-risk', 'high-risk'].includes(normalized)) {
    dotClass = 'critical';
  } else if (['in-progress', 'info', 'review', 'technical', 'screening', 'interview'].includes(normalized)) {
    dotClass = 'attention';
  }

  // Format display labels nicely if not provided
  if (!label) {
    if (normalized === 'expiring-30') displayText = 'Expiring in 30d';
    else if (normalized === 'expiring-90') displayText = 'Expiring in 90d';
    else if (normalized === 'at-risk') displayText = 'At Risk';
    else if (normalized === 'in-progress') displayText = 'In Progress';
    else if (normalized === 'on-leave') displayText = 'On Leave';
    else if (normalized === 'maintenance-due' || normalized === 'maintenance_due') displayText = 'Maintenance Due';
    else displayText = status ? status.charAt(0).toUpperCase() + status.slice(1) : '';
  }

  return (
    <span className="status-indicator" style={{ fontSize: size === 'sm' ? '11.5px' : '12.5px' }}>
      <span className={`status-dot ${dotClass}`} />
      <span style={{ color: 'var(--text-primary)' }}>{displayText}</span>
    </span>
  );
};
