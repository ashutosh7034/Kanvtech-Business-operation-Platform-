import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Contract } from '../../types';

export const ContractsPage: React.FC = () => {
  const { openContract, openCustomer } = useModalDrawer();
  const contracts = DataService.getContracts();

  const columns: Column<Contract>[] = [
    {
      key: 'contractNumber',
      header: 'Contract Code',
      sortable: true,
      render: (cntr) => <span className="font-mono" style={{ fontWeight: 600 }}>{cntr.contractNumber}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer Enterprise',
      sortable: true,
      render: (cntr) => (
        <span
          onClick={(e) => {
            e.stopPropagation();
            openCustomer(cntr.customerId);
          }}
          style={{ color: 'var(--brand-primary)', fontWeight: 600, cursor: 'pointer' }}
        >
          {cntr.customerName}
        </span>
      ),
    },
    {
      key: 'valueAnnual',
      header: 'Annual Value (ACV)',
      sortable: true,
      render: (cntr) => <span style={{ fontWeight: 600 }}>{cntr.valueAnnual}</span>,
    },
    {
      key: 'daysRemaining',
      header: 'Expiry / Renewal Timeline',
      sortable: true,
      render: (cntr) => (
        <span style={{ color: cntr.daysRemaining < 30 ? 'var(--status-critical-dot)' : 'var(--text-secondary)', fontWeight: cntr.daysRemaining < 30 ? 600 : 400 }}>
          {cntr.daysRemaining} days remaining ({cntr.endDate})
        </span>
      ),
    },
    {
      key: 'slaTarget',
      header: 'SLA Target',
      sortable: true,
      render: (cntr) => <span>{cntr.slaTarget}%</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (cntr) => <StatusBadge status={cntr.status} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Contracts</h1>
          <p className="greeting-subtitle">
            112 active Master Service Agreements · Total portfolio ACV: ₹18.7 Cr
          </p>
        </div>
      </div>

      {/* Contract Summary Strip */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Active Portfolio</span>
          <span className="ops-summary-val">112</span>
          <span className="ops-summary-sub">₹18.7 Cr Total ACV</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Expiring &lt; 30 Days</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>7</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>₹2.3 Cr at renewal</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Expiring 90 Days</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>19</span>
          <span className="ops-summary-sub">Active discussions</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">At SLA Risk</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>8</span>
          <span className="ops-summary-sub">Penalty exposure</span>
        </div>
      </div>

      {/* Contract Portfolio Table */}
      <DataTable
        title="Contract Portfolio"
        data={contracts}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => openContract(item.id)}
        searchPlaceholder="Search contracts by code, customer, scope..."
      />
    </div>
  );
};
