import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { StatusBadge } from '../common/StatusBadge';
import { Wrench, Clock, User, Building, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export const WorkOrderDetailDrawer: React.FC = () => {
  const { activeDrawer, selectedId, closeAll, openEmployee, openCustomer } = useModalDrawer();

  const isOpen = activeDrawer === 'workOrder';
  const workOrder = selectedId ? DataService.getWorkOrderById(selectedId) || DataService.getWorkOrders()[0] : DataService.getWorkOrders()[0];

  if (!isOpen || !workOrder) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title={workOrder.code}
      subtitle={`Customer: ${workOrder.customerName}`}
      width="620px"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 16px',
          backgroundColor: 'var(--bg-canvas)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 className="font-mono" style={{ fontSize: 16, fontWeight: 700 }}>{workOrder.code}</h3>
            <StatusBadge status={workOrder.priority} label={`Priority: ${workOrder.priority}`} />
            <StatusBadge status={workOrder.status} />
          </div>
          <div
            onClick={() => openCustomer(workOrder.customerId)}
            style={{
              fontSize: 12,
              color: 'var(--brand-primary)',
              marginTop: 4,
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Building size={13} /> {workOrder.customerName} →
          </div>
        </div>

        {workOrder.slaRisk && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#991B1B', textTransform: 'uppercase', fontWeight: 700 }}>
              SLA Risk Window
            </div>
            <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
              {workOrder.slaRemainingHours}h Left
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          {workOrder.title}
        </h4>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45, backgroundColor: 'var(--bg-canvas)', padding: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          {workOrder.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Assigned Technician</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <User size={14} style={{ color: 'var(--brand-primary)' }} />
            <span
              onClick={() => {
                if (workOrder.assignedToId) openEmployee(workOrder.assignedToId);
              }}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--brand-primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {workOrder.assignedToName}
            </span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Click to inspect workload & certs</div>
        </div>

        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SLA Deadline</div>
          <div className="font-mono" style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{workOrder.slaDeadline}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Location: {workOrder.location}</div>
        </div>
      </div>

      {workOrder.slaRisk && (
        <div className="attention-item critical" style={{ marginBottom: 16 }}>
          <ShieldAlert size={18} style={{ color: 'var(--status-critical-dot)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ fontSize: 12, color: 'var(--status-critical-text)' }}>
              Root Cause: Technician Availability Bottleneck
            </strong>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              Assigned technician {workOrder.assignedToName} is currently handling 7 active tasks in the Mumbai hub due to a 13-technician capacity deficit.
            </p>
          </div>
        </div>
      )}

      <div className="enterprise-card">
        <div className="card-header" style={{ padding: '8px 12px' }}>
          <span className="card-title" style={{ fontSize: 12 }}>Audit & Dispatch Timeline</span>
        </div>
        <div className="card-body" style={{ padding: '12px' }}>
          <div className="activity-feed-list" style={{ paddingLeft: 12 }}>
            <div className="feed-item urgent">
              <div className="feed-item-dot" />
              <div className="feed-time">08:15 Today</div>
              <div className="feed-text">Dispatched to Amit Sharma (Senior Field Technician).</div>
            </div>
            <div className="feed-item">
              <div className="feed-item-dot" />
              <div className="feed-time">07:30 Today</div>
              <div className="feed-text">Incident ticket logged via Acme BMS automated telemetry link.</div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
