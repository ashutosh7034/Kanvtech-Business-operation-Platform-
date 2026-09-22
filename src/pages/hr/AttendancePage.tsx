import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable, Column } from '../../components/common/DataTable';
import { Employee } from '../../types';

export const AttendancePage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees(location, department);

  const columns: Column<Employee>[] = [
    {
      key: 'code',
      header: 'Employee & ID',
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
      key: 'status',
      header: 'Attendance Today',
      sortable: true,
      render: (e) => <StatusBadge status={e.status} />,
    },
    {
      key: 'manager',
      header: 'Reporting Lead',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Attendance &gt; Attendance &amp; Leave Tracking</div>
          <h1 className="greeting-title">Attendance &amp; Leave</h1>
          <p className="greeting-subtitle">
            397 present (92.8%) · 21 approved leave · 10 unplanned absent across 5 regional hubs
          </p>
        </div>
        <FilterBar />
      </div>

      {/* Attendance Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Present On Duty</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>397</span>
          <span className="ops-summary-sub">92.8% on site</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Approved Leave</span>
          <span className="ops-summary-val">21</span>
          <span className="ops-summary-sub">Planned PTO</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Unplanned Absent</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>10</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>3 Mumbai field techs</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Overtime Accrued</span>
          <span className="ops-summary-val">312 hrs</span>
          <span className="ops-summary-sub">Field surge</span>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="section-panel">
        <div className="section-panel-header">
          <span className="section-panel-title">Daily Attendance Trend (7-Day Overview)</span>
        </div>
        <AttendanceTrendChart height={220} />
      </div>

      {/* Attendance Roster Table */}
      <DataTable
        title="Employee Presence Roster"
        data={employees}
        columns={columns}
        keyExtractor={(e) => e.id}
        onRowClick={(e) => openEmployee(e.id)}
        searchPlaceholder="Search presence by employee name, status, dept..."
      />
    </div>
  );
};
