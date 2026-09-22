import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, Calendar, Shield, DollarSign, Building } from 'lucide-react';

export const ContractDetailDrawer: React.FC = () => {
  const { activeDrawer, selectedId, closeAll, openCustomer } = useModalDrawer();

  const isOpen = activeDrawer === 'contract';
  const contract = selectedId ? DataService.getContractById(selectedId) || DataService.getContracts()[0] : DataService.getContracts()[0];

  if (!isOpen || !contract) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title={contract.contractNumber}
      subtitle={`Customer: ${contract.customerName}`}
      width="600px"
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
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{contract.contractNumber}</h3>
            <StatusBadge status={contract.status} />
          </div>
          <div
            onClick={() => openCustomer(contract.customerId)}
            style={{
              fontSize: 12,
              color: 'var(--brand-primary)',
              marginTop: 4,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 600,
            }}
          >
            <Building size={13} /> {contract.customerName} →
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Annual Contract Value</div>
          <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {contract.valueAnnual}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Start & End Date</div>
          <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{contract.startDate} → {contract.endDate}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{contract.daysRemaining} days remaining</div>
        </div>
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SLA Commitment</div>
          <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 4 }}>{contract.slaTarget}%</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Service Lead: {contract.assignedServiceLead}</div>
        </div>
      </div>

      <div className="enterprise-card" style={{ marginBottom: 14 }}>
        <div className="card-header" style={{ padding: '10px 14px' }}>
          <span className="card-title" style={{ fontSize: 13 }}>Operational Scope of Work</span>
        </div>
        <div className="card-body" style={{ padding: '12px', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
          {contract.scopeOfWork}
        </div>
      </div>

      <div className="enterprise-card">
        <div className="card-header" style={{ padding: '10px 14px' }}>
          <span className="card-title" style={{ fontSize: 13 }}>Financial Penalty & SLA Enforcement Terms</span>
        </div>
        <div className="card-body" style={{ padding: '12px', fontSize: 12, color: 'var(--status-critical-text)', backgroundColor: '#FEF2F2', lineHeight: 1.45 }}>
          <strong>Enforcement Clause:</strong> {contract.penaltyClause}
        </div>
      </div>
    </Drawer>
  );
};
