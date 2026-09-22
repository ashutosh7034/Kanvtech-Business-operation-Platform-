import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Employee } from '../../types';

export const PeopleDirectoryPage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees(location, department);

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee Name & ID',
      sortable: true,
      render: (emp) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.code}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>· {emp.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.role}</div>
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
      header: 'Regional Hub',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Attendance',
      sortable: true,
      render: (emp) => <StatusBadge status={emp.status} />,
    },
    {
      key: 'workloadTasks',
      header: 'Active Tasks',
      sortable: true,
      render: (emp) => (
        <span>
          {emp.workloadTasks} tasks {emp.slaRiskCount > 0 && <span style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>({emp.slaRiskCount} at risk)</span>}
        </span>
      ),
    },
    {
      key: 'performanceScore',
      header: 'Performance Rating',
      sortable: true,
      render: (emp) => <span style={{ fontWeight: 600 }}>{emp.performanceScore}%</span>,
    },
    {
      key: 'certifications',
      header: 'Primary Certification',
      render: (emp) => (
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          {emp.certifications[0] || 'Standard Qualified'}
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">People &gt; Employee Directory &amp; Rosters</div>
          <h1 className="greeting-title">People Directory</h1>
          <p className="greeting-subtitle">
            428 employees across 5 regional operational hubs
          </p>
        </div>
        <FilterBar />
      </div>

      {/* Directory Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Total Roster</span>
          <span className="ops-summary-val">428</span>
          <span className="ops-summary-sub">Active personnel</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Present On-Duty</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>397</span>
          <span className="ops-summary-sub">92.8% on site</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">On Leave</span>
          <span className="ops-summary-val">21</span>
          <span className="ops-summary-sub">Approved PTO</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Unplanned Absent</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>10</span>
          <span className="ops-summary-sub">3 Mumbai field techs</span>
        </div>
      </div>

      {/* People Table */}
      <DataTable
        title="Employee Directory"
        data={employees}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => openEmployee(item.id)}
        searchPlaceholder="Search employees by name, ID, role, skill..."
        pageSize={10}
      />
    </div>
  );
};
