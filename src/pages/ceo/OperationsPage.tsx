import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { WorkOrder } from '../../types';

export const OperationsPage: React.FC = () => {
  const { location } = useFilters();
  const { openWorkOrder, openEmployee, openCustomer } = useModalDrawer();
  const workOrders = DataService.getWorkOrders(location);

  const columns: Column<WorkOrder>[] = [
    {
      key: 'code',
      header: 'Work Order & Task',
      sortable: true,
      render: (wo) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{wo.code}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>· {wo.title}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Category: {wo.category}
          </div>
        </div>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer Site',
      sortable: true,
      render: (wo) => (
        <div>
          <span
            onClick={(e) => {
              e.stopPropagation();
              openCustomer(wo.customerId);
            }}
            style={{ fontWeight: 600, color: 'var(--brand-primary)', cursor: 'pointer' }}
          >
            {wo.customerName}
          </span>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Location: {wo.location}</div>
        </div>
      ),
    },
    {
      key: 'assignedToName',
      header: 'Assigned Lead',
      render: (wo) => (
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (wo.assignedToId) openEmployee(wo.assignedToId);
          }}
          style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          {wo.assignedToName}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (wo) => <StatusBadge status={wo.priority} />,
    },
    {
      key: 'slaRemainingHours',
      header: 'SLA Window',
      sortable: true,
      render: (wo) => (
        wo.slaRisk ? (
          <span style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>
            {wo.slaRemainingHours}h remaining (Risk)
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>{wo.slaRemainingHours}h</span>
        )
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (wo) => <StatusBadge status={wo.status} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Service Operations</h1>
          <p className="greeting-subtitle">
            186 open work orders · 12 currently at SLA risk across 5 regional hubs
          </p>
        </div>
        <FilterBar showDepartment={false} />
      </div>

      {/* Operational Summary Strip */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Open Work Orders</span>
          <span className="ops-summary-val">186</span>
          <span className="ops-summary-sub">Active queue</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">In Progress</span>
          <span className="ops-summary-val">92</span>
          <span className="ops-summary-sub">Assigned on site</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Pending Dispatch</span>
          <span className="ops-summary-val">38</span>
          <span className="ops-summary-sub">Awaiting technician</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>SLA Critical</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>4</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>Urgent intervention</span>
        </div>
      </div>

      {/* Live Work Order Queue Table */}
      <DataTable
        title="Live Work Order Queue"
        data={workOrders}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => openWorkOrder(item.id)}
        searchPlaceholder="Filter work orders by code, customer, technician..."
        pageSize={10}
      />
    </div>
  );
};
