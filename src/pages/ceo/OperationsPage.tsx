import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { SlaPerformanceTrendChart } from '../../components/charts/SlaPerformanceTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const OperationsPage: React.FC = () => {
  const { location } = useFilters();
  const { openWorkOrder } = useModalDrawer();
  const workOrders = DataService.getWorkOrders(location);

  const criticalOrders = workOrders.filter((wo) => wo.slaRisk || wo.priority === 'critical').slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Service Operations Dashboard</h1>
          <p className="ref-page-subtitle">
            186 open work orders · 12 currently at SLA risk across 5 regional hubs
          </p>
        </div>
        <FilterBar showDepartment={false} />
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Open Work Orders */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Wrench size={16} />
            </div>
            <span className="ref-kpi-label">Open Work Orders</span>
          </div>
          <div className="ref-kpi-val">186</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> Active</span>
            <span className="ref-kpi-context">across 5 hubs</span>
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">In Progress</span>
          </div>
          <div className="ref-kpi-val">92</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Assigned on site</span>
          </div>
        </div>

        {/* Card 3: Pending Dispatch */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">Pending Dispatch</span>
          </div>
          <div className="ref-kpi-val">38</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Awaiting technician</span>
          </div>
        </div>

        {/* Card 4: SLA Critical */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">SLA Critical</span>
          </div>
          <div className="ref-kpi-val">4</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#DC2626' }}>Urgent action</span>
          </div>
        </div>

        {/* Card 5: SLA Compliance */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <ShieldCheck size={16} />
            </div>
            <span className="ref-kpi-label">SLA Compliance</span>
          </div>
          <div className="ref-kpi-val">94.2%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowDownRight size={13} /> -1.8 pts</span>
            <span className="ref-kpi-context">target: 96.0%</span>
          </div>
        </div>

        {/* Card 6: Average MTTR */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <TrendingDown size={16} />
            </div>
            <span className="ref-kpi-label">Average MTTR</span>
          </div>
          <div className="ref-kpi-val">3.4 hrs</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -0.6 hrs</span>
            <span className="ref-kpi-context">resolution velocity</span>
          </div>
        </div>
      </div>

      {/* ROW 1: SLA Trend | Work Order Status | Priority Breakdown */}
      <div className="ref-grid-3col">
        {/* Panel 1: SLA Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">SLA Performance Delivery</span>
            <span className="ref-panel-meta">Target: 96.0%</span>
          </div>
          <SlaPerformanceTrendChart height={160} />
        </div>

        {/* Panel 2: Work Order Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Work Order Execution Status</span>
            <span className="ref-panel-meta">186 Orders</span>
          </div>
          <DonutMetricChart
            centerValue="186"
            centerLabel="Orders"
            labels={['In Progress (92)', 'Dispatched (56)', 'Pending (26)', 'SLA Risk (12)']}
            data={[92, 56, 26, 12]}
            colors={['#0F766E', '#3B82F6', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>

        {/* Panel 3: Priority Breakdown */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Work Orders by Priority</span>
            <span className="ref-panel-meta">Urgency Level</span>
          </div>
          <DonutMetricChart
            centerValue="186"
            centerLabel="Queue"
            labels={['Critical (12)', 'High (38)', 'Medium (86)', 'Low (50)']}
            data={[12, 38, 86, 50]}
            colors={['#EF4444', '#F59E0B', '#3B82F6', '#94A3B8']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 2: Orders by Location | Technician Load | Critical Orders Table */}
      <div className="ref-grid-3col">
        {/* Panel 1: Orders by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Work Orders by Location Hub</span>
            <span className="ref-panel-meta">186 Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { loc: 'Mumbai Central Hub', count: 82, pct: 100, color: '#EF4444' },
              { loc: 'Pune Tech Hub', count: 42, pct: 51.2, color: '#3B82F6' },
              { loc: 'Bengaluru Facility', count: 30, pct: 36.5, color: '#10B981' },
              { loc: 'Delhi NCR Hub', count: 22, pct: 26.8, color: '#F59E0B' },
              { loc: 'Hyderabad Tech Center', count: 10, pct: 12.1, color: '#10B981' },
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

        {/* Panel 2: Technician Utilization */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Technician Utilization by Function</span>
            <span className="ref-panel-meta">184 Technicians</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { func: 'HVAC & Chiller Specialists', util: 92.5, color: '#EF4444' },
              { func: 'Electrical Engineers', util: 88.0, color: '#3B82F6' },
              { func: 'PLC & BMS Diagnostics', util: 78.4, color: '#10B981' },
              { func: 'Preventive Maintenance', util: 82.1, color: '#F59E0B' },
              { func: 'General Facility Techs', util: 74.5, color: '#94A3B8' },
            ].map((t) => (
              <div key={t.func} className="ref-hbar-row">
                <span className="ref-hbar-label">{t.func}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${t.util}%`, backgroundColor: t.color }} />
                </div>
                <span className="ref-hbar-val">{t.util}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Critical Work Orders Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">SLA At-Risk Work Orders</span>
            <span className="ref-panel-meta">Immediate Priority</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Customer</th>
                <th>Lead</th>
                <th>SLA Left</th>
              </tr>
            </thead>
            <tbody>
              {criticalOrders.map((wo) => (
                <tr
                  key={wo.id}
                  onClick={() => openWorkOrder(wo.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{wo.code}</td>
                  <td>{wo.customerName}</td>
                  <td style={{ color: '#64748B' }}>{wo.assignedToName}</td>
                  <td style={{ fontWeight: 700, color: '#DC2626' }}>
                    {wo.slaRemainingHours}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROW 3: Department Workload | MTTR Trend | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Department Workload */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Work Order Category Breakdown</span>
            <span className="ref-panel-meta">Active Tasks</span>
          </div>
          <DonutMetricChart
            centerValue="186"
            centerLabel="Categories"
            labels={['Preventive (84)', 'Breakdown (52)', 'Audit (32)', 'Emergency (18)']}
            data={[84, 52, 32, 18]}
            colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>

        {/* Panel 2: Customer Impact Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Work Order Volume by Customer</span>
            <span className="ref-panel-meta">Live Load</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Enterprise</th>
                <th>Open Orders</th>
                <th>Critical</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Acme Industries', open: 24, crit: 3 },
                { name: 'Meridian Tech Park', open: 18, crit: 2 },
                { name: 'Apex Logistics Hub', open: 16, crit: 1 },
                { name: 'Nexus Healthcare', open: 14, crit: 1 },
                { name: 'Zenith Retail Chain', open: 12, crit: 0 },
              ].map((c, idx) => (
                <tr key={c.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{c.name}</td>
                  <td style={{ fontWeight: 700 }}>{c.open}</td>
                  <td style={{ color: c.crit > 0 ? '#DC2626' : '#16A34A', fontWeight: 700 }}>
                    {c.crit}
                  </td>
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
            <span>186 active work orders currently being executed across 5 regional plant hubs.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>12 work orders require urgent intervention to avoid contract SLA penalties.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Mumbai Central Hub holds 44% of total order backlog due to staffing gap.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average Mean Time to Resolve (MTTR) improved to 3.4 hours.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>HVAC and Chiller Plant specialists operating at 92.5% maximum load.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Acme Industries represents highest concentration of open maintenance tickets.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
