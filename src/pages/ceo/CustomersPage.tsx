import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Customer } from '../../types';

export const CustomersPage: React.FC = () => {
  const { location } = useFilters();
  const { openCustomer } = useModalDrawer();
  const customers = DataService.getCustomers(location);

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Customer Enterprise',
      sortable: true,
      render: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{c.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.industry} · {c.location}</div>
        </div>
      ),
    },
    {
      key: 'contractValue',
      header: 'Monthly Run-Rate',
      sortable: true,
      render: (c) => <span style={{ fontWeight: 600 }}>{c.contractValue}</span>,
    },
    {
      key: 'slaCompliance',
      header: 'SLA Delivery',
      sortable: true,
      render: (c) => (
        <span
          style={{
            fontWeight: 600,
            color: c.slaCompliance < 95 ? 'var(--status-critical-dot)' : 'var(--status-healthy-dot)',
          }}
        >
          {c.slaCompliance}%
        </span>
      ),
    },
    {
      key: 'openWorkOrders',
      header: 'Open Orders',
      sortable: true,
      render: (c) => <span>{c.openWorkOrders}</span>,
    },
    {
      key: 'health',
      header: 'Health Status',
      sortable: true,
      render: (c) => <StatusBadge status={c.health} />,
    },
    {
      key: 'accountOwner',
      header: 'Account Owner',
      sortable: true,
      render: (c) => <span style={{ color: 'var(--text-secondary)' }}>{c.accountOwner}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Customers</h1>
          <p className="greeting-subtitle">
            86 active enterprise accounts · 4 require immediate SLA attention
          </p>
        </div>
        <FilterBar showDepartment={false} />
      </div>

      {/* Account Portfolio Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Total Accounts</span>
          <span className="ops-summary-val">86</span>
          <span className="ops-summary-sub">Active MSAs</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Healthy Accounts</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>72</span>
          <span className="ops-summary-sub">95%+ SLA delivery</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Attention Needed</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>10</span>
          <span className="ops-summary-sub">Minor SLA dips</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Critical Risk</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>4</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>Penalty exposure</span>
        </div>
      </div>

      {/* Account Portfolio Table */}
      <DataTable
        title="Account Portfolio"
        data={customers}
        columns={columns}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => openCustomer(c.id)}
        searchPlaceholder="Filter customers by name, industry, owner..."
      />
    </div>
  );
};
