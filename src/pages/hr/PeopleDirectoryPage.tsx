import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { FilterBar } from '../../components/common/FilterBar';
import { HeadcountTrendChart } from '../../components/charts/HeadcountTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  Calendar,
  HeartHandshake,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const PeopleDirectoryPage: React.FC = () => {
  const { location, department } = useFilters();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Employee Analytics</h1>
          <p className="ref-page-subtitle">
            Workforce insights, demographics, movement and organizational structure
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

        {/* Card 2: New Joiners (YTD) */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
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

        {/* Card 3: Exits (YTD) */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <UserMinus size={16} />
            </div>
            <span className="ref-kpi-label">Exits (YTD)</span>
          </div>
          <div className="ref-kpi-val">16</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -18.8%</span>
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 4: Active Employees */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <UserCheck size={16} />
            </div>
            <span className="ref-kpi-label">Active Employees</span>
          </div>
          <div className="ref-kpi-val">397</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> 92.8%</span>
            <span className="ref-kpi-context">of total employees</span>
          </div>
        </div>

        {/* Card 5: Average Age */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Average Age</span>
          </div>
          <div className="ref-kpi-val">32.6</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Years</span>
          </div>
        </div>

        {/* Card 6: Gender Ratio */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <HeartHandshake size={16} />
            </div>
            <span className="ref-kpi-label">Gender Ratio</span>
          </div>
          <div className="ref-kpi-val" style={{ fontSize: 20, paddingTop: 3 }}>64% : 36%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Male : Female</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Employee Headcount Trend | Employees by Department | Employees by Location */}
      <div className="ref-grid-3col">
        {/* Panel 1: Employee Headcount Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employee Headcount Trend</span>
            <span className="ref-panel-meta">Monthly Growth</span>
          </div>
          <HeadcountTrendChart height={160} />
        </div>

        {/* Panel 2: Employees by Department */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employees by Department</span>
            <span className="ref-panel-meta">428 Total</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Employees"
            labels={['Operations (43%)', 'Engineering (18%)', 'Sales (13%)', 'Support (11%)', 'HR/Admin (8%)', 'Finance (8%)']}
            data={[184, 76, 54, 48, 32, 34]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA', '#0F766E', '#EC4899']}
            height={160}
          />
        </div>

        {/* Panel 3: Employees by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employees by Location</span>
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

      {/* ROW 2: Employee Category | Age Group Distribution | Tenure Distribution */}
      <div className="ref-grid-3col">
        {/* Panel 1: Employee Category */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employee Category</span>
            <span className="ref-panel-meta">428 Staff</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Staff"
            labels={['Permanent (78%)', 'Probation (10%)', 'Contract (8%)', 'Intern (4%)']}
            data={[334, 43, 34, 17]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 2: Age Group Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Age Group Distribution</span>
            <span className="ref-panel-meta">Demographics</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 140, paddingTop: 20, paddingBottom: 6 }}>
            {[
              { group: '< 25', pct: 12, height: '32%', color: '#60A5FA' },
              { group: '25-30', pct: 38, height: '100%', color: '#34D399' },
              { group: '31-35', pct: 28, height: '74%', color: '#FBBF24' },
              { group: '36-40', pct: 16, height: '42%', color: '#FB923C' },
              { group: '41-45', pct: 6, height: '16%', color: '#A78BFA' },
            ].map((b) => (
              <div key={b.group} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>{b.pct}%</span>
                <div style={{ width: 26, height: b.height, backgroundColor: b.color, borderRadius: '3px 3px 0 0' }} />
                <span style={{ fontSize: 9.5, color: '#64748B', marginTop: 4 }}>{b.group}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Tenure Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Tenure Distribution</span>
            <span className="ref-panel-meta">Years of Service</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 140, paddingTop: 20, paddingBottom: 6 }}>
            {[
              { group: '< 1 Yr', pct: 22, height: '65%', color: '#60A5FA' },
              { group: '1-3 Yrs', pct: 34, height: '100%', color: '#A78BFA' },
              { group: '3-5 Yrs', pct: 24, height: '70%', color: '#38BDF8' },
              { group: '5-10 Yrs', pct: 14, height: '41%', color: '#F87171' },
              { group: '> 10 Yrs', pct: 6, height: '18%', color: '#94A3B8' },
            ].map((b) => (
              <div key={b.group} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>{b.pct}%</span>
                <div style={{ width: 26, height: b.height, backgroundColor: b.color, borderRadius: '3px 3px 0 0' }} />
                <span style={{ fontSize: 9.5, color: '#64748B', marginTop: 4 }}>{b.group}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: New Joiners vs Exits | Top 5 Departments | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: New Joiners vs Exits */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">New Joiners vs Exits</span>
            <span className="ref-panel-meta">2026 Movement</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 140, paddingTop: 20, paddingBottom: 6 }}>
            {[
              { month: 'Jan', join: 12, exit: 5 },
              { month: 'Mar', join: 10, exit: 6 },
              { month: 'May', join: 11, exit: 4 },
              { month: 'Jul', join: 8, exit: 3 },
              { month: 'Sep', join: 7, exit: 0 },
            ].map((m) => (
              <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                  <div style={{ width: 10, height: `${m.join * 8}px`, backgroundColor: '#34D399', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: 10, height: `${m.exit * 8}px`, backgroundColor: '#F87171', borderRadius: '2px 2px 0 0' }} />
                </div>
                <span style={{ fontSize: 9.5, color: '#64748B', marginTop: 4 }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Top 5 Departments by Headcount */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top 5 Departments by Headcount</span>
            <span className="ref-panel-meta">Staff Share</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', count: 184, pct: 100, color: '#3B82F6' },
              { dept: 'Engineering & Automation', count: 76, pct: 41.3, color: '#60A5FA' },
              { dept: 'Sales & Accounts', count: 54, pct: 29.3, color: '#93C5FD' },
              { dept: 'Customer Support', count: 48, pct: 26.0, color: '#BFDBFE' },
              { dept: 'Finance & Accounts', count: 34, pct: 18.5, color: '#DBEAFE' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.count}</span>
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
            <span>Total headcount increased by 8.8% compared to the previous quarter.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Employee annual attrition reduced by 18.8% compared to last year.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Operations has the highest headcount share at 43.0% (184 staff).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>78% of all employees are under permanent employment contracts.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Majority of employees (66%) are in the core 25–35 age demographic.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average organizational tenure of employees is 3.4 years.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
