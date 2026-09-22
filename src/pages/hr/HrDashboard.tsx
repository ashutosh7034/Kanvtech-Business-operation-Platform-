import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { COMPANY_INFO } from '../../data/mockData';
import { FilterBar } from '../../components/common/FilterBar';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';
import {
  UserPlus,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';

interface HrDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const HrDashboard: React.FC<HrDashboardProps> = ({ onNavigateTab }) => {
  const { period, location, department } = useFilters();
  const { openHiringModal } = useModalDrawer();

  // Unified canonical HR metrics view model
  const hrData = DataService.getHrMetrics({ period, location, department });
  const { pulse, whatMatters, regionalCapacity, recruitmentPipeline, peopleRisks, payroll } = hrData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* 1. Header & Global Filters */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">
            <span>People</span>
            <ChevronRight size={11} />
            <span className="current">Human Capital &amp; Operations</span>
          </div>
          <h1 className="greeting-title">People Overview</h1>
          <div className="greeting-subtitle">
            <span>Monday, 22 September 2026</span>
            <span className="dot-separator">·</span>
            <span>{COMPANY_INFO.name}</span>
            <span className="dot-separator">·</span>
            <span>{location}</span>
            <span className="dot-separator">·</span>
            <span>{department}</span>
          </div>
        </div>
        <FilterBar />
      </div>

      {/* 2. Workforce Pulse Strip (6 Cards Aligned) */}
      <div className="hr-brief-strip">
        <div className="hr-brief-cell" onClick={() => onNavigateTab('people')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">Total Workforce</span>
          <span className="brief-value">{pulse.totalEmployees}</span>
          <span className="brief-subtext">+{pulse.joinersCount} this month · 5 Hubs</span>
        </div>

        <div className="hr-brief-cell" onClick={() => onNavigateTab('attendance')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">
            {pulse.isHistorical ? 'Avg On-Duty' : 'Present On-Duty'}
          </span>
          <span className="brief-value" style={{ color: 'var(--status-healthy-dot)' }}>
            {pulse.presentOnDuty}
          </span>
          <span className="brief-subtext">{pulse.attendanceRate}% attendance rate</span>
        </div>

        <div className="hr-brief-cell" onClick={() => onNavigateTab('attendance')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">Approved Leave</span>
          <span className="brief-value">{pulse.approvedLeave}</span>
          <span className="brief-subtext">4.9% · Planned PTO</span>
        </div>

        <div className="hr-brief-cell" onClick={() => onNavigateTab('attendance')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">Unplanned Absent</span>
          <span className="brief-value" style={{ color: pulse.unplannedAbsent > 5 ? 'var(--status-critical-dot)' : 'inherit' }}>
            {pulse.unplannedAbsent}
          </span>
          <span className="brief-subtext">3 Mumbai field techs</span>
        </div>

        <div className="hr-brief-cell" onClick={() => onNavigateTab('recruitment')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">Open Positions</span>
          <span className="brief-value" style={{ color: 'var(--brand-primary)' }}>
            {pulse.openPositions}
          </span>
          <span className="brief-subtext">4 in Field Operations</span>
        </div>

        <div className="hr-brief-cell" onClick={() => onNavigateTab('performance')} style={{ cursor: 'pointer' }}>
          <span className="brief-label">Monthly Attrition</span>
          <span className="brief-value">{pulse.attritionRate}%</span>
          <span className="brief-subtext">Target: &lt; 3.0% (Healthy)</span>
        </div>
      </div>

      {/* 3. Operational Staffing Alert (Editorial Notice) */}
      <div className="editorial-notice-panel">
        <div className="editorial-notice-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="editorial-notice-tag">Staffing Alert</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· High Operational Impact</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Field Capacity Pressure</span>
        </div>

        <div className="editorial-headline">
          {whatMatters.title}: Mumbai technician capacity is currently 13 staff below the daily operating requirement.
        </div>

        <div className="editorial-metrics-grid">
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Deployment Hub</span>
            <span className="editorial-metric-val">{whatMatters.location}</span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Staff Deficit</span>
            <span className="editorial-metric-val" style={{ color: 'var(--status-critical-dot)' }}>
              {whatMatters.available} / {whatMatters.required} ({whatMatters.gapText})
            </span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Operational Impact</span>
            <span className="editorial-metric-val">18 Orders Affected (4 Critical)</span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Overtime Burden</span>
            <span className="editorial-metric-val">{whatMatters.overtimeHours} hrs (₹14.6L)</span>
          </div>
        </div>

        <div className="editorial-notice-footer">
          <span>Action recommended: Authorize 5 Field Technician requisitions or initiate inter-hub reassignments.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              className="action-link-btn"
              onClick={() =>
                openHiringModal({
                  title: 'Senior Field Technician - Industrial HVAC',
                  department: 'Field Operations',
                  location: 'Mumbai',
                  requiredCount: 5,
                  priority: 'critical',
                  reason: 'Published emergency requisition to resolve Mumbai Field Operations capacity deficit (-13 gap).',
                  skillsRequired: ['HVAC Industrial Level III', 'Chiller Plant Operations', 'Preventive Maintenance'],
                })
              }
            >
              <UserPlus size={13} />
              <span>Create Requisition</span>
            </button>
            <button className="action-link-btn" onClick={() => onNavigateTab('workforce_planning')}>
              <span>Simulate Capacity</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. 7-Day Attendance Trend & Recruitment Funnel */}
      <div className="two-col-grid">
        {/* Attendance Trend Chart */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">7-Day Daily Attendance &amp; Workforce Deployment</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('attendance')}>
              <span>Full Roster</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <AttendanceTrendChart height={220} />
        </div>

        {/* Recruitment Pipeline Funnel */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Recruitment Pipeline Funnel</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('recruitment')}>
              <span>Recruitment Hub</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="funnel-container">
            <div className="funnel-step">
              <span className="funnel-step-label">Applied</span>
              <span className="funnel-step-val">{recruitmentPipeline.applied}</span>
            </div>
            <div className="funnel-step">
              <span className="funnel-step-label">Screening</span>
              <span className="funnel-step-val">{recruitmentPipeline.screening}</span>
            </div>
            <div className="funnel-step">
              <span className="funnel-step-label">Technical</span>
              <span className="funnel-step-val">{recruitmentPipeline.technical}</span>
            </div>
            <div className="funnel-step">
              <span className="funnel-step-label">Interview</span>
              <span className="funnel-step-val">{recruitmentPipeline.interview}</span>
            </div>
            <div className="funnel-step">
              <span className="funnel-step-label">Offer</span>
              <span className="funnel-step-val">{recruitmentPipeline.offer}</span>
            </div>
            <div className="funnel-step">
              <span className="funnel-step-label">Joined</span>
              <span className="funnel-step-val" style={{ color: 'var(--status-healthy-dot)' }}>{recruitmentPipeline.joined}</span>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
            Active Priority: <strong>Senior Field Technician</strong> (5 positions in Mumbai Hub)
          </div>
        </div>
      </div>

      {/* 5. Regional Hub Matrix & Secondary Operational Pulse */}
      <div className="two-col-grid">
        {/* Regional Hub Matrix */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Regional Hub Capacity Matrix</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('workforce_planning')}>
              <span>Capacity Simulator</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Regional Hub</th>
                <th>Required</th>
                <th>Available</th>
                <th>Deficit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {regionalCapacity.map((hub) => (
                <tr key={hub.region}>
                  <td style={{ fontWeight: 600 }}>{hub.region}</td>
                  <td>{hub.required}</td>
                  <td>{hub.available}</td>
                  <td style={{ fontWeight: 600, color: hub.gap < 0 ? 'var(--status-critical-dot)' : 'var(--status-healthy-dot)' }}>
                    {hub.gap > 0 ? '+' : ''}{hub.gap}
                  </td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${hub.status === 'Deficit' ? 'critical' : hub.status === 'Healthy' ? 'healthy' : 'attention'}`} />
                      <span>{hub.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Secondary Operational Metrics */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Operations &amp; Compliance Pulse</span>
          </div>

          <div className="hr-secondary-strip" style={{ border: 'none', padding: 0 }}>
            <div className="hr-secondary-cell" onClick={() => onNavigateTab('recruitment')} style={{ cursor: 'pointer' }}>
              <span className="brief-label">Recruitment</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>14 Open</span>
              <span className="brief-subtext">182 applicants · 9 offers</span>
            </div>
            <div className="hr-secondary-cell" onClick={() => onNavigateTab('workforce_planning')} style={{ cursor: 'pointer' }}>
              <span className="brief-label">Overtime</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>312 Hours</span>
              <span className="brief-subtext">₹14.6L accrued cost</span>
            </div>
            <div className="hr-secondary-cell" onClick={() => onNavigateTab('people')} style={{ cursor: 'pointer' }}>
              <span className="brief-label">Retention</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>1.8% Attrition</span>
              <span className="brief-subtext">7 joiners · 2 exits</span>
            </div>
            <div className="hr-secondary-cell" onClick={() => onNavigateTab('skills_certs')} style={{ cursor: 'pointer' }}>
              <span className="brief-label">Compliance</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>9 Expiring</span>
              <span className="brief-subtext">86% training completion</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. People Risks & Payroll Snapshot */}
      <div className="two-col-grid">
        {/* People Risks Watchlist */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">People &amp; Compliance Risks</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('skills_certs')}>
              <span>View Certifications</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Risk Category</th>
                <th>Affected Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Certifications Expiring &lt; 30 Days</td>
                <td style={{ fontWeight: 600 }}>{peopleRisks.certExpiring} Technicians</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot attention" />
                    <span>Attention</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>High Unplanned Absence (&gt; 3 Days)</td>
                <td style={{ fontWeight: 600 }}>{peopleRisks.highAbsence} Employees</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot critical" />
                    <span>Investigate</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Field Overtime Threshold Breach</td>
                <td style={{ fontWeight: 600 }}>{peopleRisks.overtimeHours} Hours</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot attention" />
                    <span>Review</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>Critical Open Requisitions</td>
                <td style={{ fontWeight: 600 }}>{peopleRisks.criticalHires} Roles</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot critical" />
                    <span>Urgent</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Executive Payroll Snapshot */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Executive Payroll Snapshot</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('payroll')}>
              <span>View Payroll</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount / Status</th>
                <th>Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gross Monthly Payroll</td>
                <td style={{ fontWeight: 600 }}>{payroll.monthlyPayrollMasked}</td>
                <td style={{ color: 'var(--text-muted)' }}>428 Active Roster</td>
              </tr>
              <tr>
                <td>Overtime Direct Cost</td>
                <td style={{ fontWeight: 600 }}>₹{payroll.overtimeCostLakhs}L</td>
                <td style={{ color: 'var(--text-muted)' }}>Mumbai field surge</td>
              </tr>
              <tr>
                <td>Statutory Compliance</td>
                <td style={{ fontWeight: 600, color: 'var(--status-healthy-dot)' }}>{payroll.complianceStatus}</td>
                <td style={{ color: 'var(--text-muted)' }}>100% PF / ESI remitted</td>
              </tr>
              <tr>
                <td>Disbursement Cycle</td>
                <td style={{ fontWeight: 600 }}>28th of Month</td>
                <td style={{ color: 'var(--text-muted)' }}>Scheduled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
