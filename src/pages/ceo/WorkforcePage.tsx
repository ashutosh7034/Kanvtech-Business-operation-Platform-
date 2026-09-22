import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { CapacityDemandChart } from '../../components/charts/CapacityDemandChart';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';

export const WorkforcePage: React.FC = () => {
  const { location } = useFilters();
  const { openHiringModal } = useModalDrawer();
  const capacityList = DataService.getDepartmentCapacity(location);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Workforce Capacity</h1>
          <p className="greeting-subtitle">
            428 total employees · 397 present on duty · -13 deficit in Mumbai Field Operations
          </p>
        </div>
        <FilterBar />
      </div>

      {/* Workforce Capacity Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Total Staffing</span>
          <span className="ops-summary-val">428</span>
          <span className="ops-summary-sub">Across 5 regional hubs</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Available On-Duty</span>
          <span className="ops-summary-val" style={{ color: 'var(--brand-primary)' }}>397</span>
          <span className="ops-summary-sub">92.8% presence</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Mumbai Field Gap</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>-13</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>84 req vs 71 avail</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Overtime Accrued</span>
          <span className="ops-summary-val">312 hrs</span>
          <span className="ops-summary-sub">₹14.6L cost burden</span>
        </div>
      </div>

      {/* Capacity Charts */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Capacity vs Demand by Function</span>
            <button className="btn-primary" onClick={() => openHiringModal()} style={{ fontSize: 11, padding: '3px 8px' }}>
              Create Requisition
            </button>
          </div>
          <CapacityDemandChart height={220} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">7-Day Attendance Trend</span>
          </div>
          <AttendanceTrendChart height={220} />
        </div>
      </div>

      {/* Department Capacity Ledger */}
      <div className="section-panel">
        <div className="section-panel-header">
          <span className="section-panel-title">Department Capacity Ledger & Staffing Deficits</span>
        </div>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Location Hub</th>
              <th>Required</th>
              <th>Available</th>
              <th>Deficit</th>
              <th>Utilization</th>
              <th>Critical Shortage Roles</th>
            </tr>
          </thead>
          <tbody>
            {capacityList.map((dept) => (
              <tr key={dept.department}>
                <td style={{ fontWeight: 600 }}>{dept.department}</td>
                <td>{dept.location}</td>
                <td>{dept.requiredStaff}</td>
                <td>{dept.availableStaff}</td>
                <td style={{ fontWeight: 600, color: dept.gap < 0 ? 'var(--status-critical-dot)' : 'var(--status-healthy-dot)' }}>
                  {dept.gap > 0 ? '+' : ''}{dept.gap}
                </td>
                <td>{dept.utilization}%</td>
                <td style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {dept.criticalRolesNeeded.length > 0 ? dept.criticalRolesNeeded.join(', ') : 'Fully staffed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
