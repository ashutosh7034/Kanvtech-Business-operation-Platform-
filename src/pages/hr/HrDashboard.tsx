import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { HeadcountTrendChart } from '../../components/charts/HeadcountTrendChart';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';
import { RatingDistributionChart } from '../../components/charts/RatingDistributionChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  CheckCircle2,
  Calendar,
  Briefcase,
  UserPlus,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

interface HrDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const HrDashboard: React.FC<HrDashboardProps> = ({ onNavigateTab }) => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees(location, department);

  const topPerformers = employees
    .slice()
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">People &amp; Workforce Dashboard</h1>
          <p className="ref-page-subtitle">
            Workforce composition, attendance, performance and talent operations
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
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +8.8%</span>
            <span className="ref-kpi-context">vs previous quarter</span>
          </div>
        </div>

        {/* Card 2: Present Today */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Present Today</span>
          </div>
          <div className="ref-kpi-val">397</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> 92.8%</span>
            <span className="ref-kpi-context">of total workforce</span>
          </div>
        </div>

        {/* Card 3: On Leave */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">On Leave Today</span>
          </div>
          <div className="ref-kpi-val">21</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend" style={{ color: '#D97706' }}>4.9%</span>
            <span className="ref-kpi-context">approved PTO</span>
          </div>
        </div>

        {/* Card 4: Open Positions */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <Briefcase size={16} />
            </div>
            <span className="ref-kpi-label">Open Positions</span>
          </div>
          <div className="ref-kpi-val">14</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowUpRight size={13} /> 4 critical</span>
            <span className="ref-kpi-context">Field Ops roles</span>
          </div>
        </div>

        {/* Card 5: New Joiners (YTD) */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <UserPlus size={16} />
            </div>
            <span className="ref-kpi-label">New Joiners (YTD)</span>
          </div>
          <div className="ref-kpi-val">48</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +12.0%</span>
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 6: Attrition Rate */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <TrendingDown size={16} />
            </div>
            <span className="ref-kpi-label">Exits / Attrition</span>
          </div>
          <div className="ref-kpi-val">3.7%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -18.8%</span>
            <span className="ref-kpi-context">16 exits YTD</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Headcount Trend | Department Distribution | Location Distribution */}
      <div className="ref-grid-3col">
        {/* Panel 1: Headcount Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employee Headcount Trend</span>
            <span className="ref-panel-meta">Jan – Sep 2026</span>
          </div>
          <HeadcountTrendChart height={160} />
        </div>

        {/* Panel 2: Department Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employees by Department</span>
            <span className="ref-panel-meta">428 Total</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Employees"
            labels={['Operations', 'Engineering', 'Sales', 'Support', 'HR/Admin', 'Finance']}
            data={[184, 76, 54, 48, 32, 34]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA', '#0F766E', '#EC4899']}
            height={160}
          />
        </div>

        {/* Panel 3: Location Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employees by Location Hub</span>
            <span className="ref-panel-meta">5 Regional Hubs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { loc: 'Mumbai Central Hub', count: 168, pct: 100, color: '#3B82F6' },
              { loc: 'Pune Tech Hub', count: 102, pct: 60.7, color: '#60A5FA' },
              { loc: 'Bengaluru Facility', count: 76, pct: 45.2, color: '#93C5FD' },
              { loc: 'Delhi NCR Hub', count: 54, pct: 32.1, color: '#BFDBFE' },
              { loc: 'Hyderabad Tech Center', count: 28, pct: 16.6, color: '#DBEAFE' },
            ].map((l) => (
              <div key={l.loc} className="ref-hbar-row">
                <span className="ref-hbar-label">{l.loc}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${l.pct}%`, backgroundColor: l.color }} />
                </div>
                <span className="ref-hbar-val">{l.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Attendance Trend | Attendance Status | Recruitment Funnel */}
      <div className="ref-grid-3col">
        {/* Panel 1: Attendance Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Daily Attendance Trend (7-Day)</span>
            <span className="ref-panel-meta">92.8% Average</span>
          </div>
          <AttendanceTrendChart height={160} />
        </div>

        {/* Panel 2: Attendance Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Attendance Status (Today)</span>
            <span className="ref-panel-meta">428 Staff</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Roster"
            labels={['Present On-Duty', 'Approved Leave', 'Unplanned Absent']}
            data={[397, 21, 10]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>

        {/* Panel 3: Recruitment Funnel */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Recruitment Pipeline Funnel</span>
            <span className="ref-panel-meta">182 Inflow</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { stage: '1. Applied / Inflow', count: 182, pct: 100, color: '#3B82F6' },
              { stage: '2. Screened & Qualified', count: 84, pct: 46.2, color: '#10B981' },
              { stage: '3. Technical Interview', count: 36, pct: 19.8, color: '#F59E0B' },
              { stage: '4. Executive Offer', count: 9, pct: 4.9, color: '#9333EA' },
              { stage: '5. Joined / Onboarded', count: 7, pct: 3.8, color: '#0F766E' },
            ].map((s) => (
              <div key={s.stage} className="ref-hbar-row">
                <span className="ref-hbar-label">{s.stage}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
                <span className="ref-hbar-val">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: Performance Distribution | Top Performers Table | Performance by Category */}
      <div className="ref-grid-3col">
        {/* Panel 1: Performance Rating Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Performance Rating Distribution</span>
            <span className="ref-panel-meta">FY 2026-27</span>
          </div>
          <RatingDistributionChart height={160} />
        </div>

        {/* Panel 2: Top Performers Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Performers (This Year)</span>
            <span
              style={{ fontSize: 11, color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => onNavigateTab && onNavigateTab('performance')}
            >
              View All &rarr;
            </span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Rating</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((emp, idx) => (
                <tr
                  key={emp.id}
                  onClick={() => openEmployee(emp.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td style={{ fontWeight: 700, color: '#16A34A' }}>
                    {(emp.performanceScore / 20).toFixed(1)}
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '1px 6px',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        backgroundColor: '#DCFCE7',
                        color: '#166534',
                      }}
                    >
                      {emp.performanceScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 3: Performance by Category */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Performance by Employee Category</span>
            <span className="ref-panel-meta">4.1 Org Avg</span>
          </div>
          <DonutMetricChart
            centerValue="4.1"
            centerLabel="Average Rating"
            labels={['Management (4.3)', 'Permanent (4.1)', 'Probation (3.8)', 'Contract (3.7)', 'Intern (4.0)']}
            data={[4.3, 4.1, 3.8, 3.7, 4.0]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#9333EA']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 4: Review Cycle Milestones | Training Development | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Review Cycle Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Review Cycle Status (FY 2026-27)</span>
            <span className="ref-panel-meta">94.8% Done</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0', marginTop: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>GOAL SETTING</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>✓ Jan 2026</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>MID-YEAR</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>✓ Jun 2026</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>FINAL REVIEW</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB' }}>● Sep (94.8%)</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>PUBLISH</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Oct 2026</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>Reviews Completed</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>406 / 428</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>Pending Signoff</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#D97706' }}>22 Staff</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Training & Development Focus */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Training &amp; Development Needs</span>
            <span className="ref-panel-meta">Based on Reviews</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { need: 'Leadership Skills', count: 52, pct: 100, color: '#3B82F6' },
              { need: 'HVAC & Automation Tech', count: 38, pct: 73.1, color: '#10B981' },
              { need: 'SLA & Customer Comms', count: 46, pct: 88.5, color: '#F59E0B' },
              { need: 'Time Management', count: 28, pct: 53.8, color: '#9333EA' },
              { need: 'Safety & OSHA Standards', count: 22, pct: 42.3, color: '#EC4899' },
            ].map((t) => (
              <div key={t.need} className="ref-hbar-row">
                <span className="ref-hbar-label">{t.need}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
                </div>
                <span className="ref-hbar-val">{t.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Key Insights */}
        <div className="ref-insights-panel">
          <div className="ref-insights-header">
            <Lightbulb size={16} style={{ color: '#F59E0B' }} />
            <span>Key Insights</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Total headcount increased by 8.8% compared with previous quarter.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Employee annualized attrition reduced to 3.7% (16 exits YTD).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Field Operations has the largest workforce share at 43.0% (184 staff).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>78% of organizational workforce is under permanent employment tenure.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average performance rating improved to 4.1 / 5.0 with 94.8% review completion.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average organizational employee tenure is 3.4 years.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
