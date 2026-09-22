import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { PerformanceTrendChart } from '../../components/charts/PerformanceTrendChart';
import { RatingDistributionChart } from '../../components/charts/RatingDistributionChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  Target,
  Star,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees();

  const topPerformers = employees
    .slice()
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Performance Management Dashboard</h1>
          <p className="ref-page-subtitle">
            Measure performance, drive growth and build a stronger workforce
          </p>
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
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 2: Reviews Completed */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Reviews Completed</span>
          </div>
          <div className="ref-kpi-val">406 (95%)</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +8.3%</span>
            <span className="ref-kpi-context">vs last cycle</span>
          </div>
        </div>

        {/* Card 3: Average Rating */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Star size={16} />
            </div>
            <span className="ref-kpi-label">Average Rating</span>
          </div>
          <div className="ref-kpi-val">4.1 / 5</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +5.1%</span>
            <span className="ref-kpi-context">vs last cycle</span>
          </div>
        </div>

        {/* Card 4: High Performers */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <TrendingUp size={16} />
            </div>
            <span className="ref-kpi-label">High Performers</span>
          </div>
          <div className="ref-kpi-val">23%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +4.0%</span>
            <span className="ref-kpi-context">vs last cycle</span>
          </div>
        </div>

        {/* Card 5: Development Plan Assigned */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <UserCheck size={16} />
            </div>
            <span className="ref-kpi-label">Dev Plan Assigned</span>
          </div>
          <div className="ref-kpi-val">128</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +12.3%</span>
            <span className="ref-kpi-context">vs last cycle</span>
          </div>
        </div>

        {/* Card 6: Goals Achievement Rate */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Goals Achievement</span>
          </div>
          <div className="ref-kpi-val">78%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +6.5%</span>
            <span className="ref-kpi-context">vs last cycle</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Performance Rating Distribution | Performance Trend | Goals Achievement Status */}
      <div className="ref-grid-3col">
        {/* Panel 1: Performance Rating Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Performance Rating Distribution</span>
            <span className="ref-panel-meta">Cycle 2026-27</span>
          </div>
          <RatingDistributionChart height={160} />
        </div>

        {/* Panel 2: Performance Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Performance Trend (Average Rating)</span>
            <span className="ref-panel-meta">5-Year Growth</span>
          </div>
          <PerformanceTrendChart height={160} />
        </div>

        {/* Panel 3: Goals Achievement Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Goals Achievement Status</span>
            <span className="ref-panel-meta">428 Employees</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Employees"
            labels={['Achieved (78%)', 'In Progress (15%)', 'Not Achieved (7%)']}
            data={[334, 64, 30]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 2: Department-wise Average Rating | Top Performers | Performance by Category */}
      <div className="ref-grid-3col">
        {/* Panel 1: Department-wise Average Rating */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Department-wise Average Rating</span>
            <span className="ref-panel-meta">Out of 5.0</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', rating: 4.3, pct: 86, color: '#3B82F6' },
              { dept: 'HR', rating: 4.2, pct: 84, color: '#EC4899' },
              { dept: 'IT & Engineering', rating: 4.1, pct: 82, color: '#10B981' },
              { dept: 'Sales', rating: 4.0, pct: 80, color: '#60A5FA' },
              { dept: 'Finance', rating: 3.9, pct: 78, color: '#F59E0B' },
              { dept: 'Marketing & Others', rating: 3.8, pct: 76, color: '#94A3B8' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.rating}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Top Performers Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Performers (This Year)</span>
            <span className="ref-panel-meta">Honor Roll</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Rating</th>
                <th>Achieve</th>
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
                      {emp.performanceScore + 25}%
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
            <span className="ref-panel-title">Performance by Category</span>
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

      {/* ROW 3: Review Cycle Status | Training & Development | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Review Cycle Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Review Cycle Status (FY 2026-27)</span>
            <span className="ref-panel-meta">Phase 3</span>
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
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB' }}>● Sep (95%)</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>PUBLISH</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Oct 2026</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>Completed</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>406 / 428</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>In Final Signoff</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#D97706' }}>22 Staff</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Training & Development */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Training &amp; Development Needs</span>
            <span className="ref-panel-meta">Feedback Analysis</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { need: 'Leadership & Delegation', count: 52, pct: 100, color: '#3B82F6' },
              { need: 'Technical & HVAC Systems', count: 38, pct: 73.1, color: '#10B981' },
              { need: 'Communication Skills', count: 46, pct: 88.5, color: '#F59E0B' },
              { need: 'Time & SLA Management', count: 28, pct: 53.8, color: '#9333EA' },
              { need: 'Domain Knowledge & OSHA', count: 22, pct: 42.3, color: '#EC4899' },
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
            <span>95% of employees have completed their annual performance reviews.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average rating improved by 5.1% compared with previous review cycle.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>23% of employees are recognized as high performers (rating &ge; 4.5).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>78% of individual quarterly performance goals have been achieved.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Leadership and Communication are the top identified development needs.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Overall organization performance trend shows a consistent upward trajectory.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
