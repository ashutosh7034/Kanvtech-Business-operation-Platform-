import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { FilterBar } from '../../components/common/FilterBar';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  CheckCircle2,
  UserX,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { location, department } = useFilters();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Context Quote */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Attendance Dashboard</h1>
          <p className="ref-page-subtitle">
            Real-time attendance insights for a more disciplined and productive workforce
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FilterBar />
          <div className="ref-quote-box">
            <span className="ref-quote-text">"Right People. Right Time. Brighter Results."</span>
            <div className="ref-quote-line" />
          </div>
        </div>
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
            <span className="ref-kpi-context">on duty today</span>
          </div>
        </div>

        {/* Card 3: Absent Today */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <UserX size={16} />
            </div>
            <span className="ref-kpi-label">Absent Today</span>
          </div>
          <div className="ref-kpi-val">10</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend" style={{ color: '#DC2626' }}>2.3%</span>
            <span className="ref-kpi-context">unplanned gap</span>
          </div>
        </div>

        {/* Card 4: On Leave Today */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">On Leave Today</span>
          </div>
          <div className="ref-kpi-val">21</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend" style={{ color: '#D97706' }}>4.9%</span>
            <span className="ref-kpi-context">approved PTO</span>
          </div>
        </div>

        {/* Card 5: Week Off / Holiday */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Week Off / Holiday</span>
          </div>
          <div className="ref-kpi-val">0</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Standard weekday</span>
          </div>
        </div>

        {/* Card 6: Late Arrivals Today */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">Late Arrivals Today</span>
          </div>
          <div className="ref-kpi-val">14</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend" style={{ color: '#D97706' }}>3.3%</span>
            <span className="ref-kpi-context">avg 18 min delay</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Daily Attendance Trend | Attendance Status | Department Attendance */}
      <div className="ref-grid-3col">
        {/* Panel 1: Daily Attendance Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Daily Attendance Trend (This Month)</span>
            <span className="ref-panel-meta">Sep 1 – Sep 30</span>
          </div>
          <AttendanceTrendChart height={160} />
        </div>

        {/* Panel 2: Attendance Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Attendance Status (This Month)</span>
            <span className="ref-panel-meta">428 Employees</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Employees"
            labels={['Present (92.8%)', 'Absent (2.3%)', 'On Leave (4.9%)']}
            data={[397, 10, 21]}
            colors={['#10B981', '#EF4444', '#F59E0B']}
            height={160}
          />
        </div>

        {/* Panel 3: Department-wise Attendance */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Department-wise Attendance %</span>
            <span className="ref-panel-meta">Presence Rate</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', pct: 92.8, color: '#3B82F6' },
              { dept: 'Sales', pct: 90.7, color: '#10B981' },
              { dept: 'IT & Engineering', pct: 94.7, color: '#60A5FA' },
              { dept: 'Finance', pct: 92.0, color: '#F59E0B' },
              { dept: 'HR & Admin', pct: 90.2, color: '#EC4899' },
              { dept: 'Customer Support', pct: 93.8, color: '#9333EA' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Attendance Overview Table | Late Arrivals 7-Day | Top 5 Late Arrivals */}
      <div className="ref-grid-3col">
        {/* Panel 1: Attendance Overview Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Attendance Overview (This Month)</span>
            <span className="ref-panel-meta">Cumulative</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Total Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { status: 'Present', count: '10,719', pct: '92.8%', color: '#16A34A' },
                { status: 'Absent', count: '270', pct: '2.3%', color: '#DC2626' },
                { status: 'On Leave', count: '567', pct: '4.9%', color: '#D97706' },
                { status: 'Late Arrival', count: '378', pct: '3.3%', color: '#F97316' },
                { status: 'Total Logs', count: '11,556', pct: '100%', color: '#1E293B' },
              ].map((row) => (
                <tr key={row.status}>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, backgroundColor: row.color, marginRight: 6 }} />
                    {row.status}
                  </td>
                  <td>{row.count}</td>
                  <td style={{ fontWeight: 700 }}>{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Late Arrivals 7-Day Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Late Arrivals Trend (Last 7 Days)</span>
            <span className="ref-panel-meta">Daily Count</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 140, paddingTop: 20, paddingBottom: 6 }}>
            {[
              { day: '16 Sep', count: 18, height: '65%' },
              { day: '17 Sep', dayFull: '17 Sep', count: 14, height: '50%' },
              { day: '18 Sep', count: 22, height: '80%' },
              { day: '19 Sep', count: 12, height: '45%' },
              { day: '20 Sep', count: 16, height: '60%' },
              { day: '21 Sep', count: 19, height: '70%' },
              { day: '22 Sep', count: 14, height: '50%' },
            ].map((b) => (
              <div key={b.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>{b.count}</span>
                <div style={{ width: 22, height: b.height, backgroundColor: '#FCA5A5', borderRadius: '3px 3px 0 0' }} />
                <span style={{ fontSize: 9.5, color: '#64748B', marginTop: 4 }}>{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Top 5 Employees with Late Arrivals */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top 5 Late Arrivals</span>
            <span className="ref-panel-meta">This Month</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Late Count</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rahul Sharma', dept: 'Sales', count: 6 },
                { name: 'Pooja Mehta', dept: 'Operations', count: 5 },
                { name: 'Amit Verma', dept: 'IT', count: 4 },
                { name: 'Neha Patel', dept: 'Finance', count: 4 },
                { name: 'Suresh Iyer', dept: 'Marketing', count: 3 },
              ].map((emp, idx) => (
                <tr key={emp.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{emp.name}</td>
                  <td>{emp.dept}</td>
                  <td style={{ fontWeight: 700, color: '#DC2626' }}>{emp.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 3: Attendance by Location | Shift-wise Attendance | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Attendance by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Attendance by Location</span>
            <span className="ref-panel-meta">Regional Hubs</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { loc: 'Mumbai Central Hub', pct: 84.5, color: '#EF4444' },
              { loc: 'Pune Tech Hub', pct: 92.3, color: '#3B82F6' },
              { loc: 'Bengaluru Facility', pct: 95.0, color: '#10B981' },
              { loc: 'Delhi NCR Hub', pct: 85.4, color: '#F59E0B' },
              { loc: 'Hyderabad Tech Center', pct: 96.2, color: '#10B981' },
            ].map((l) => (
              <div key={l.loc} className="ref-hbar-row">
                <span className="ref-hbar-label">{l.loc}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${l.pct}%`, backgroundColor: l.color }} />
                </div>
                <span className="ref-hbar-val">{l.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Shift-wise Attendance */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Shift-wise Attendance</span>
            <span className="ref-panel-meta">428 Staff</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Roster"
            labels={['General 9-6 (64%)', 'Morning 6-2 (18%)', 'Evening 2-10 (12%)', 'Night 10-6 (6%)']}
            data={[274, 77, 51, 26]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 3: Key Insights */}
        <div className="ref-insights-panel">
          <div className="ref-insights-header">
            <Lightbulb size={16} style={{ color: '#F59E0B' }} />
            <span>Key Insights</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Overall attendance rate is 92.8% this month across all facilities.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Late arrivals reduced by 12% compared to the previous operating month.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Hyderabad &amp; Bengaluru hubs achieved highest attendance regularity (96%+).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Mumbai field hub attendance impacted by 3 unexpected technician absences.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average late arrival delay is 18 minutes across morning shifts.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Attendance and shift adherence remain on track with organizational policy.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
