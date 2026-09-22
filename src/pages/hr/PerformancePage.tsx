import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { DataTable, Column } from '../../components/common/DataTable';
import { Employee } from '../../types';

export const PerformancePage: React.FC = () => {
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees();

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee Name & ID',
      sortable: true,
      render: (e) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600 }}>{e.code}</span>
            <span style={{ fontWeight: 600 }}>· {e.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.role}</div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'location',
      header: 'Location Hub',
      sortable: true,
    },
    {
      key: 'performanceScore',
      header: 'Appraisal Rating',
      sortable: true,
      render: (e) => (
        <span
          style={{
            fontWeight: 600,
            color: e.performanceScore >= 90 ? 'var(--status-healthy-dot)' : e.performanceScore >= 80 ? 'var(--text-primary)' : 'var(--status-critical-dot)',
          }}
        >
          {e.performanceScore}%
        </span>
      ),
    },
    {
      key: 'workloadTasks',
      header: 'Active Tasks',
      sortable: true,
      render: (e) => <span>{e.workloadTasks} tasks</span>,
    },
    {
      key: 'manager',
      header: 'Reviewing Manager',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Performance</h1>
          <p className="greeting-subtitle">
            87% company average appraisal score · 81% goals completed · 42 top performers
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Average Rating</span>
          <span className="ops-summary-val" style={{ color: 'var(--brand-primary)' }}>87%</span>
          <span className="ops-summary-sub">Exceeds standard</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Goals Achieved</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>81%</span>
          <span className="ops-summary-sub">Q3 target completion</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Top Performers</span>
          <span className="ops-summary-val">42</span>
          <span className="ops-summary-sub">&gt; 90% score</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-attention-dot)' }}>Needs Support</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>17</span>
          <span className="ops-summary-sub">Coaching assigned</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        title="Appraisal Scorecard & Performance Records"
        data={employees}
        columns={columns}
        keyExtractor={(e) => e.id}
        onRowClick={(e) => openEmployee(e.id)}
        searchPlaceholder="Filter appraisal records by employee, role, rating..."
      />
    </div>
  );
};
