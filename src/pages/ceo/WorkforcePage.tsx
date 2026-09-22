import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { HeadcountTrendChart } from '../../components/charts/HeadcountTrendChart';
import { CapacityDemandChart } from '../../components/charts/CapacityDemandChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  CheckCircle2,
  Calendar,
  UserX,
  Gauge,
  AlertTriangle,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';

export const WorkforcePage: React.FC = () => {
  const { location } = useFilters();
  const { openHiringModal } = useModalDrawer();
  const capacityList = DataService.getDepartmentCapacity(location);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Context Quote */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Workforce Capacity Dashboard</h1>
          <p className="ref-page-subtitle">
            428 total employees · 397 present on duty · -13 deficit in Mumbai Field Operations
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <FilterBar />
          <button className="btn-primary" onClick={() => openHiringModal()} style={{ padding: '6px 12px' }}>
            <span>Create Requisition</span>
          </button>
          <div className="ref-quote-box">
            <span className="ref-quote-text">"Right People. Optimized Capacity."</span>
            <div className="ref-quote-line" />
          </div>
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Workforce */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Users size={16} />
            </div>
            <span className="ref-kpi-label">Total Workforce</span>
          </div>
          <div className="ref-kpi-val">428</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +8.8%</span>
            <span className="ref-kpi-context">across 5 hubs</span>
          </div>
        </div>

        {/* Card 2: On Duty Today */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">On Duty Today</span>
          </div>
          <div className="ref-kpi-val">397</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> 92.8%</span>
            <span className="ref-kpi-context">presence rate</span>
          </div>
        </div>

        {/* Card 3: On Leave */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">On Leave</span>
          </div>
          <div className="ref-kpi-val">21</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Approved PTO</span>
          </div>
        </div>

        {/* Card 4: Unplanned Absent */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <UserX size={16} />
            </div>
            <span className="ref-kpi-label">Unplanned Absent</span>
          </div>
          <div className="ref-kpi-val">10</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#DC2626' }}>3 Mumbai field techs</span>
          </div>
        </div>

        {/* Card 5: Workforce Utilization */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <Gauge size={16} />
            </div>
            <span className="ref-kpi-label">Workforce Utilization</span>
          </div>
          <div className="ref-kpi-val">86.4%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +1.4 pts</span>
            <span className="ref-kpi-context">target: 85%</span>
          </div>
        </div>

        {/* Card 6: Capacity Gap */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">Mumbai Field Deficit</span>
          </div>
          <div className="ref-kpi-val" style={{ color: '#DC2626' }}>-13</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">84 req vs 71 avail</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Headcount Trend | Workforce by Function | Workforce by Location */}
      <div className="ref-grid-3col">
        {/* Panel 1: Headcount Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Headcount Trajectory</span>
            <span className="ref-panel-meta">Jan – Sep 2026</span>
          </div>
          <HeadcountTrendChart height={160} />
        </div>

        {/* Panel 2: Workforce by Function */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Workforce by Department</span>
            <span className="ref-panel-meta">428 Staff</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Personnel"
            labels={['Field Ops (184)', 'Engineering (76)', 'Sales (54)', 'Support (48)', 'Admin/HR (32)', 'Finance (34)']}
            data={[184, 76, 54, 48, 32, 34]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA', '#0F766E', '#EC4899']}
            height={160}
          />
        </div>

        {/* Panel 3: Workforce by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Regional Hub Staffing</span>
            <span className="ref-panel-meta">5 Locations</span>
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

      {/* ROW 2: Employee Category | Age & Tenure Distribution | Capacity vs Demand */}
      <div className="ref-grid-3col">
        {/* Panel 1: Employee Category */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Employment Category</span>
            <span className="ref-panel-meta">428 Staff</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Roster"
            labels={['Permanent (78%)', 'Probation (10%)', 'Contract (8%)', 'Intern (4%)']}
            data={[334, 43, 34, 17]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 2: Capacity vs Demand Load */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Capacity vs Demand Load</span>
            <span className="ref-panel-meta">By Function</span>
          </div>
          <CapacityDemandChart height={160} />
        </div>

        {/* Panel 3: Regional Hub Gap Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Department Capacity Deficit</span>
            <span className="ref-panel-meta">Active Gaps</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Req</th>
                <th>Avail</th>
                <th>Gap</th>
                <th>Util</th>
              </tr>
            </thead>
            <tbody>
              {capacityList.map((dept) => (
                <tr key={dept.department}>
                  <td style={{ fontWeight: 600 }}>{dept.department}</td>
                  <td>{dept.requiredStaff}</td>
                  <td>{dept.availableStaff}</td>
                  <td style={{ fontWeight: 700, color: dept.gap < 0 ? '#DC2626' : '#16A34A' }}>
                    {dept.gap > 0 ? '+' : ''}{dept.gap}
                  </td>
                  <td style={{ fontWeight: 600 }}>{dept.utilization}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 3: Joiners vs Exits | Critical Shortage Roles | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Joiners vs Exits */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">New Joiners vs Exits</span>
            <span className="ref-panel-meta">Net Velocity</span>
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

        {/* Panel 2: Critical Shortage Roles */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Critical Staffing Shortage Roles</span>
            <span className="ref-panel-meta">Immediate Hiring</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Role Title</th>
                <th>Hub</th>
                <th>Shortage</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'HVAC Chiller Specialist', hub: 'Mumbai', count: 6 },
                { role: 'High-Voltage Safety Lead', hub: 'Mumbai', count: 4 },
                { role: 'BMS PLC Diagnostics Eng.', hub: 'Pune', count: 2 },
                { role: 'Industrial Cleanroom Tech', hub: 'Mumbai', count: 3 },
                { role: 'Electrical Automation Eng.', hub: 'Delhi NCR', count: 2 },
              ].map((r, idx) => (
                <tr key={r.role}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{r.role}</td>
                  <td>{r.hub}</td>
                  <td style={{ fontWeight: 700, color: '#DC2626' }}>-{r.count}</td>
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
            <span>Total workforce stands at 428 employees with 92.8% on-duty presence today.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Mumbai Field Operations has a -13 technician capacity deficit (71 avail vs 84 req).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Overtime burden reached ₹14.6L (312 hours) due to regional staffing gaps.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Pune, Bengaluru, and Hyderabad facilities operating at target utilization (96%+).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>14 active requisitions open with 4 critical roles in final interview pipeline.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Workforce retention rate remains healthy with 3.7% annualized attrition.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
