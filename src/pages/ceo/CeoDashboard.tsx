import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { SlaPerformanceTrendChart } from '../../components/charts/SlaPerformanceTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import { CapacityDemandChart } from '../../components/charts/CapacityDemandChart';
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

interface CeoDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const CeoDashboard: React.FC<CeoDashboardProps> = ({ onNavigateTab }) => {
  const { period, location, department } = useFilters();
  const { openCustomer, openWorkOrder, openContract } = useModalDrawer();

  const metrics = DataService.getCeoMetrics({ period, location, department });
  const customers = DataService.getCustomers(location);

  const topCustomers = customers.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">CEO Business Dashboard</h1>
          <p className="ref-page-subtitle">
            Business performance, operations, workforce and customer overview
          </p>
        </div>
        <FilterBar showDepartment={true} />
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Revenue */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <DollarSign size={16} />
            </div>
            <span className="ref-kpi-label">Revenue</span>
          </div>
          <div className="ref-kpi-val">{metrics.rev.label}</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +6.2%</span>
            <span className="ref-kpi-context">vs previous period</span>
          </div>
        </div>

        {/* Card 2: Gross Margin */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <TrendingUp size={16} />
            </div>
            <span className="ref-kpi-label">Gross Margin</span>
          </div>
          <div className="ref-kpi-val">{metrics.fin.marginPct}%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +1.8 pts</span>
            <span className="ref-kpi-context">vs target (26.0%)</span>
          </div>
        </div>

        {/* Card 3: SLA Compliance */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <ShieldCheck size={16} />
            </div>
            <span className="ref-kpi-label">SLA Compliance</span>
          </div>
          <div className="ref-kpi-val">{metrics.sla.compliance}%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowDownRight size={13} /> -1.8 pts</span>
            <span className="ref-kpi-context">186 live orders</span>
          </div>
        </div>

        {/* Card 4: Current On-Duty */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <Users size={16} />
            </div>
            <span className="ref-kpi-label">Current On-Duty</span>
          </div>
          <div className="ref-kpi-val">{metrics.workforce.available}</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> 92.8%</span>
            <span className="ref-kpi-context">of 428 workforce</span>
          </div>
        </div>

        {/* Card 5: Customer Portfolio */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Building2 size={16} />
            </div>
            <span className="ref-kpi-label">Customer Portfolio</span>
          </div>
          <div className="ref-kpi-val">{metrics.cust.totalAccounts}</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#D97706' }}>4 accounts</span>
            <span className="ref-kpi-context">require attention</span>
          </div>
        </div>

        {/* Card 6: Active Contracts */}
        <div className="ref-kpi-card tint-orange">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#EA580C' }}>
              <FileText size={16} />
            </div>
            <span className="ref-kpi-label">Active Contracts</span>
          </div>
          <div className="ref-kpi-val">{metrics.contracts.activeCount}</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#EA580C' }}>7 MSAs</span>
            <span className="ref-kpi-context">renewing &lt; 30d</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Revenue Trend | SLA Performance Trend | Operational Status */}
      <div className="ref-grid-3col">
        {/* Panel 1: Revenue Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Revenue Trajectory vs Target</span>
            <span className="ref-panel-meta">YTD FY 2026-27</span>
          </div>
          <RevenueChart height={160} />
        </div>

        {/* Panel 2: SLA Performance Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">SLA Performance Trend</span>
            <span className="ref-panel-meta">Target: 96.0%</span>
          </div>
          <SlaPerformanceTrendChart height={160} />
        </div>

        {/* Panel 3: Operational Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Operational Work Order Status</span>
            <span className="ref-panel-meta">186 Total</span>
          </div>
          <DonutMetricChart
            centerValue="186"
            centerLabel="Work Orders"
            labels={['In Progress', 'Dispatched', 'Pending', 'SLA Risk']}
            data={[92, 56, 26, 12]}
            colors={['#0F766E', '#3B82F6', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 2: Workforce Capacity by Location | Work Orders by Priority | Customer Health */}
      <div className="ref-grid-3col">
        {/* Panel 1: Workforce Capacity by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Workforce Capacity by Hub</span>
            <span className="ref-panel-meta">Avail vs Req</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { hub: 'Mumbai Central Hub', avail: 71, req: 84, color: '#EF4444', pct: 84.5 },
              { hub: 'Pune Tech Hub', avail: 48, req: 50, color: '#3B82F6', pct: 96.0 },
              { hub: 'Bengaluru Support Hub', avail: 38, req: 36, color: '#10B981', pct: 100 },
              { hub: 'Delhi NCR Facility', avail: 35, req: 38, color: '#F59E0B', pct: 92.1 },
              { hub: 'Hyderabad Engineering', avail: 25, req: 25, color: '#10B981', pct: 100 },
            ].map((loc) => (
              <div key={loc.hub} className="ref-hbar-row">
                <span className="ref-hbar-label">{loc.hub}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${loc.pct}%`, backgroundColor: loc.color }} />
                </div>
                <span className="ref-hbar-val">{loc.avail}/{loc.req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Work Orders by Priority */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Work Orders by Priority</span>
            <span className="ref-panel-meta">Active Queue</span>
          </div>
          <DonutMetricChart
            centerValue="186"
            centerLabel="Total Queue"
            labels={['P1 Critical', 'P2 High', 'P3 Medium', 'P4 Standard']}
            data={[12, 38, 86, 50]}
            colors={['#EF4444', '#F59E0B', '#3B82F6', '#94A3B8']}
            height={160}
          />
        </div>

        {/* Panel 3: Customer Health Portfolio */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Customer Health Portfolio</span>
            <span className="ref-panel-meta">86 Accounts</span>
          </div>
          <DonutMetricChart
            centerValue="86"
            centerLabel="Accounts"
            labels={['Healthy (95%+)', 'Attention (90-95%)', 'Critical Risk (<90%)']}
            data={[72, 10, 4]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 3: Department Performance | Top Customers Table | Contract Portfolio */}
      <div className="ref-grid-3col">
        {/* Panel 1: Department Performance */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Department SLA Delivery (%)</span>
            <span className="ref-panel-meta">Q3 Target 95%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Field Operations', sla: 92.8, color: '#F59E0B' },
              { dept: 'Engineering & Automation', sla: 96.4, color: '#10B981' },
              { dept: 'Customer Support', sla: 95.8, color: '#10B981' },
              { dept: 'Sales & Enterprise Accounts', sla: 94.2, color: '#3B82F6' },
              { dept: 'Administration & Logistics', sla: 96.0, color: '#10B981' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.sla}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.sla}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Top Customers Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Enterprise Accounts</span>
            <span
              style={{ fontSize: 11, color: '#2563EB', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => onNavigateTab && onNavigateTab('customers')}
            >
              View All &rarr;
            </span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Customer</th>
                <th>Monthly</th>
                <th>SLA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={() => openCustomer(c.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{c.name}</td>
                  <td>{c.contractValue}</td>
                  <td style={{ fontWeight: 600, color: c.slaCompliance < 95 ? '#DC2626' : '#16A34A' }}>
                    {c.slaCompliance}%
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '1px 6px',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        backgroundColor: c.health === 'healthy' ? '#DCFCE7' : c.health === 'attention' ? '#FEF3C7' : '#FEE2E2',
                        color: c.health === 'healthy' ? '#166534' : c.health === 'attention' ? '#9A3412' : '#991B1B',
                      }}
                    >
                      {c.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 3: Contract Portfolio */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Contract Portfolio Status</span>
            <span className="ref-panel-meta">112 MSAs</span>
          </div>
          <DonutMetricChart
            centerValue="112"
            centerLabel="Active MSAs"
            labels={['Active & Stable', 'Expiring < 90 Days', 'Expiring < 30 Days']}
            data={[86, 19, 7]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 4: Workforce Capacity Demand | Cost Structure Breakdown | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Capacity vs Demand Chart */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Capacity vs Demand by Function</span>
            <span className="ref-panel-meta">Staffing Load</span>
          </div>
          <CapacityDemandChart height={160} />
        </div>

        {/* Panel 2: Cost Structure Breakdown */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Operating Cost Structure</span>
            <span className="ref-panel-meta">₹36.5L Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { item: 'Workforce Direct Labor', amount: '₹21.2L', pct: 58.1, color: '#0F766E' },
              { item: 'HVAC & Electrical Spares', amount: '₹8.8L', pct: 24.1, color: '#3B82F6' },
              { item: 'Fleet Logistics & Fuel', amount: '₹3.8L', pct: 10.4, color: '#F59E0B' },
              { item: 'General Administration', amount: '₹2.7L', pct: 7.4, color: '#94A3B8' },
            ].map((cost) => (
              <div key={cost.item} className="ref-hbar-row">
                <span className="ref-hbar-label">{cost.item}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${cost.pct}%`, backgroundColor: cost.color }} />
                </div>
                <span className="ref-hbar-val">{cost.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Key Insights (Green Checkmark List) */}
        <div className="ref-insights-panel">
          <div className="ref-insights-header">
            <Lightbulb size={16} style={{ color: '#F59E0B' }} />
            <span>Key Insights</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Revenue is ₹{metrics.rev.current}L ({metrics.rev.label}) tracking at +{metrics.rev.growth}% growth.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>
              {department === 'Administration & HR'
                ? 'Administration & HR staffing is 100% stable with 0 SLA risks and 0 overtime hours.'
                : location === 'Pune'
                ? 'Pune Tech Zone operations at 95.8% SLA with 39 work orders completed.'
                : location === 'Bengaluru'
                ? 'Bengaluru Hub operating at 96.4% SLA with optimal technician distribution.'
                : `Mumbai field operations has a 13-technician capacity gap affecting ${metrics.sla.affectedOrdersCount} work orders.`}
            </span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>SLA compliance is currently at {metrics.sla.compliance}% against target of 96.0%.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>{metrics.sla.atRiskCount} work orders are approaching critical SLA risk windows.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>{metrics.contracts.expiring30d} Master Service Agreements are renewing within 30 days.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>{metrics.cust.attention + metrics.cust.critical} customer accounts in {location === 'All Locations' ? 'portfolio' : location} require operational attention.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
