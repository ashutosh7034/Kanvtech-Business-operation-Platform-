import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { MOCK_CERTIFICATIONS } from '../../data/mockData';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CertificationItem } from '../../types';

export const SkillsCertificationsPage: React.FC = () => {
  const { openEmployee } = useModalDrawer();

  const columns: Column<CertificationItem>[] = [
    {
      key: 'employeeName',
      header: 'Certified Personnel',
      sortable: true,
      render: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.employeeName}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.department}</div>
        </div>
      ),
    },
    {
      key: 'certificationName',
      header: 'Certification Credential',
      sortable: true,
      render: (c) => <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{c.certificationName}</span>,
    },
    {
      key: 'authority',
      header: 'Issuing Body',
      sortable: true,
    },
    {
      key: 'expiryDate',
      header: 'Expiry Timeline',
      sortable: true,
      render: (c) => (
        <span style={{ color: c.daysUntilExpiry <= 30 ? 'var(--status-critical-dot)' : 'var(--text-secondary)', fontWeight: c.daysUntilExpiry <= 30 ? 600 : 400 }}>
          {c.expiryDate} ({c.daysUntilExpiry > 0 ? `${c.daysUntilExpiry}d left` : 'Expired'})
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (c) => <StatusBadge status={c.status} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Skills &amp; Certifications &gt; Credential Management</div>
          <h1 className="greeting-title">Skills &amp; Certifications</h1>
          <p className="greeting-subtitle">
            318 certified personnel · 9 expiries in 30 days · 3 expired records
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Certified Workforce</span>
          <span className="ops-summary-val">318</span>
          <span className="ops-summary-sub">74.3% of workforce</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-attention-dot)' }}>Expiring in 30 Days</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>9</span>
          <span className="ops-summary-sub">Recertification active</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Expired Credentials</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>3</span>
          <span className="ops-summary-sub">Access restricted</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Mandatory Training</span>
          <span className="ops-summary-val">27</span>
          <span className="ops-summary-sub">Scheduled next cycle</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        title="Technical Certification Registry"
        data={MOCK_CERTIFICATIONS}
        columns={columns}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => openEmployee(c.employeeId)}
        searchPlaceholder="Filter certifications by credential, employee, authority..."
      />
    </div>
  );
};
