import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { AlertCircle, Users, FileText, CheckCircle2, Bell } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { activeDrawer, closeAll, openWorkOrder, openContract } = useModalDrawer();
  const [filter, setFilter] = useState<'all' | 'sla' | 'workforce' | 'contract'>('all');
  const notifications = DataService.getNotifications();

  const isOpen = activeDrawer === 'notifications';

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'sla':
        return <AlertCircle size={16} color="var(--status-critical-dot)" />;
      case 'workforce':
        return <Users size={16} color="var(--status-attention-dot)" />;
      case 'contract':
        return <FileText size={16} color="var(--brand-primary)" />;
      default:
        return <Bell size={16} color="var(--text-muted)" />;
    }
  };

  const handleNotificationClick = (item: any) => {
    DataService.markNotificationRead(item.id);
    if (item.type === 'sla') {
      openWorkOrder('wo-8921');
    } else if (item.type === 'contract') {
      openContract('cntr-2023-018');
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title="System Notifications & Operational Alerts"
      subtitle="Real-time events requiring operational oversight"
      width="480px"
    >
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {(['all', 'sla', 'workforce', 'contract'] as const).map((f) => (
          <button
            key={f}
            className={`filter-segment-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            style={{ textTransform: 'capitalize', padding: '4px 10px' }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNotificationClick(item)}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: item.unread ? 'var(--bg-canvas)' : 'var(--bg-surface)',
              borderLeft: item.unread ? '3px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              gap: 12,
              transition: 'background-color 0.12s ease',
            }}
          >
            <div style={{ marginTop: 2 }}>{getIcon(item.type)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.title}
                </h4>
                <span className="font-mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  {item.time}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.35 }}>
                {item.message}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--brand-primary)' }}>
                  Inspect Record →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
