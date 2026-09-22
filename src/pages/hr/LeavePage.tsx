import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { FilterBar } from '../../components/common/FilterBar';
import { LeaveTrendChart } from '../../components/charts/LeaveTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  Plane,
  Calendar,
  Clock,
  CheckCircle2,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

interface UpcomingLeave {
  id: string;
  date: string;
  name: string;
  leaveType: string;
  days: number;
}

const UPCOMING_LEAVES: UpcomingLeave[] = [
  { id: '1', date: '23 Sep 2026', name: 'Priya Mehta', leaveType: 'PL', days: 2 },
  { id: '2', date: '24 Sep 2026', name: 'Rahul Sharma', leaveType: 'CL', days: 1 },
  { id: '3', date: '25 Sep 2026', name: 'Neha Patel', leaveType: 'SL', days: 3 },
  { id: '4', date: '28 Sep 2026', name: 'Amit Verma', leaveType: 'CO', days: 1 },
  { id: '5', date: '30 Sep 2026', name: 'Suresh Iyer', leaveType: 'PL', days: 2 },
];

export const LeavePage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Leave Management Dashboard</h1>
          <p className="ref-page-subtitle">
            Insights into employee leave utilization, balances and approvals
          </p>
        </div>
        <FilterBar />
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Employees */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Users size={16} />
            </div>
            <span className="ref-kpi-label">Total Employees</span>
          </div>
          <div className="ref-kpi-val">428</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +2.4%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Leave Taken (YTD) */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <Plane size={16} />
            </div>
            <span className="ref-kpi-label">Total Leave Taken (YTD)</span>
          </div>
          <div className="ref-kpi-val">3,842</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -12.6%</span>
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 3: Total Leave Balance */}
        <div className="ref-kpi-card tint-orange">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#EA580C' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Total Leave Balance</span>
          </div>
          <div className="ref-kpi-val">5,210</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +5.3%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 4: Avg Leave Taken per Emp */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">Avg Leave Taken (YTD)</span>
          </div>
          <div className="ref-kpi-val">7.5 Days</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -10.2%</span>
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 5: Leave Requests Pending */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <FileCheck size={16} />
            </div>
            <span className="ref-kpi-label">Pending Approval</span>
          </div>
          <div className="ref-kpi-val">18</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowUpRight size={13} /> +12.5%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 6: Leave Approval Rate */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Leave Approval Rate</span>
          </div>
          <div className="ref-kpi-val">96.4%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +2.1%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Leave Type Distribution | Monthly Leave Trend | Leave Balance Summary */}
      <div className="ref-grid-3col">
        {/* Panel 1: Leave Type Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Leave Type Distribution (YTD)</span>
            <span className="ref-panel-meta">3,842 Taken</span>
          </div>
          <DonutMetricChart
            centerValue="3,842"
            centerLabel="Leaves Taken"
            labels={['Casual (CL)', 'Privilege (PL)', 'Sick (SL)', 'Comp Off', 'Maternity', 'Paternity', 'LWP']}
            data={[1306, 1075, 691, 307, 192, 115, 76]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA', '#EC4899', '#06B6D4', '#64748B']}
            height={160}
          />
        </div>

        {/* Panel 2: Monthly Leave Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Monthly Leave Trend (All Employees)</span>
            <span className="ref-panel-meta">Jan – Sep 2026</span>
          </div>
          <LeaveTrendChart height={160} />
        </div>

        {/* Panel 3: Leave Balance Summary */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Leave Balance Summary</span>
            <span className="ref-panel-meta">Utilized vs Available</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { type: 'Casual Leave (CL)', util: 1250, avail: 2480, pct: 33.5 },
              { type: 'Privilege Leave (PL)', util: 980, avail: 1860, pct: 34.5 },
              { type: 'Sick Leave (SL)', util: 670, avail: 1020, pct: 39.6 },
              { type: 'Compensatory Off', util: 310, avail: 420, pct: 42.4 },
              { type: 'Maternity Leave', util: 120, avail: 260, pct: 31.5 },
            ].map((b) => (
              <div key={b.type} className="ref-hbar-row">
                <span className="ref-hbar-label">{b.type}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${b.pct}%`, backgroundColor: '#3B82F6' }} />
                </div>
                <span className="ref-hbar-val">{b.util}/{b.avail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Department-wise Leave | Leave Utilization % | Top 5 Employees */}
      <div className="ref-grid-3col">
        {/* Panel 1: Department-wise Leave Taken */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Department-wise Leave Taken (YTD)</span>
            <span className="ref-panel-meta">Days</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', days: 920, pct: 100, color: '#3B82F6' },
              { dept: 'Sales', days: 680, pct: 73.9, color: '#60A5FA' },
              { dept: 'Engineering & IT', days: 520, pct: 56.5, color: '#93C5FD' },
              { dept: 'Finance', days: 480, pct: 52.1, color: '#F59E0B' },
              { dept: 'HR & Admin', days: 410, pct: 44.5, color: '#EC4899' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.days}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Leave Utilization % */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Leave Utilization % (YTD)</span>
            <span className="ref-panel-meta">Quota Consumed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', util: 68, color: '#3B82F6' },
              { dept: 'Sales', util: 62, color: '#10B981' },
              { dept: 'Engineering & IT', util: 55, color: '#9333EA' },
              { dept: 'Finance', util: 49, color: '#F59E0B' },
              { dept: 'HR & Admin', util: 52, color: '#EC4899' },
            ].map((u) => (
              <div key={u.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{u.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${u.util}%`, backgroundColor: u.color }} />
                </div>
                <span className="ref-hbar-val">{u.util}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Top 5 Employees by Leave Taken */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top 5 Employees by Leave Taken</span>
            <span className="ref-panel-meta">YTD</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Days Taken</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rahul Sharma', dept: 'Sales', days: 28 },
                { name: 'Priya Mehta', dept: 'Operations', days: 26 },
                { name: 'Amit Verma', dept: 'IT', days: 23 },
                { name: 'Neha Patel', dept: 'Finance', days: 22 },
                { name: 'Suresh Iyer', dept: 'Marketing', days: 20 },
              ].map((emp, idx) => (
                <tr key={emp.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{emp.name}</td>
                  <td>{emp.dept}</td>
                  <td style={{ fontWeight: 700, color: '#2563EB' }}>{emp.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 3: Leave Request Status | Upcoming Leaves | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Leave Request Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Leave Request Status</span>
            <span className="ref-panel-meta">Current Cycle</span>
          </div>
          <DonutMetricChart
            centerValue="18"
            centerLabel="Requests"
            labels={['Approved (76%)', 'Pending (12%)', 'Rejected (6%)', 'Cancelled (6%)']}
            data={[112, 18, 9, 9]}
            colors={['#10B981', '#F59E0B', '#EF4444', '#94A3B8']}
            height={160}
          />
        </div>

        {/* Panel 2: Upcoming Leaves (Next 30 Days) */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Upcoming Leaves (Next 30 Days)</span>
            <span className="ref-panel-meta">Approved PTO</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Type</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {UPCOMING_LEAVES.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 500, color: '#64748B' }}>{l.date}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{l.name}</td>
                  <td>
                    <span style={{ padding: '1px 5px', borderRadius: 3, fontSize: 10, backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600 }}>
                      {l.leaveType}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{l.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 3: Key Insights */}
        <div className="ref-insights-panel">
          <div className="ref-insights-header">
            <Lightbulb size={16} style={{ color: '#F59E0B' }} />
            <span>Key Insights</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Total leave taken reduced by 12.6% compared with previous year.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average leave per employee is 7.5 days (10.2% lower than benchmark).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Leave approval rate maintained at 96.4% across all 5 operational hubs.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Operations department has the highest leave usage at 68% of allocated balance.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>18 leave requests are currently pending lead approval for next week.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Overall organization leave utilization remains strictly within policy limits.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
