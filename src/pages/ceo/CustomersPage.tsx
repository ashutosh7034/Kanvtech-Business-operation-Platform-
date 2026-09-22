import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Building2,
  DollarSign,
  ShieldCheck,
  Wrench,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { location } = useFilters();
  const { openCustomer } = useModalDrawer();
  const customers = DataService.getCustomers(location);

  const atRiskCustomers = customers.filter((c) => c.health === 'critical' || c.slaCompliance < 95);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Filter Bar */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Customer Portfolio Dashboard</h1>
          <p className="ref-page-subtitle">
            86 active enterprise accounts · 4 require immediate SLA attention · Total ACV ₹18.7 Cr
          </p>
        </div>
        <FilterBar showDepartment={false} />
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Accounts */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Building2 size={16} />
            </div>
            <span className="ref-kpi-label">Total Accounts</span>
          </div>
          <div className="ref-kpi-val">86</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> Active</span>
            <span className="ref-kpi-context">across 5 hubs</span>
          </div>
        </div>

        {/* Card 2: Monthly Revenue */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <DollarSign size={16} />
            </div>
            <span className="ref-kpi-label">Monthly Run-Rate</span>
          </div>
          <div className="ref-kpi-val">₹ 48.6L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +8.4%</span>
            <span className="ref-kpi-context">YoY growth</span>
          </div>
        </div>

        {/* Card 3: Average SLA */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <ShieldCheck size={16} />
            </div>
            <span className="ref-kpi-label">Portfolio SLA</span>
          </div>
          <div className="ref-kpi-val">94.2%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowDownRight size={13} /> -1.8 pts</span>
            <span className="ref-kpi-context">target: 96.0%</span>
          </div>
        </div>

        {/* Card 4: Open Work Orders */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <Wrench size={16} />
            </div>
            <span className="ref-kpi-label">Open Work Orders</span>
          </div>
          <div className="ref-kpi-val">186</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Active execution</span>
          </div>
        </div>

        {/* Card 5: At-Risk Accounts */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">At-Risk Accounts</span>
          </div>
          <div className="ref-kpi-val" style={{ color: '#DC2626' }}>4</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#DC2626' }}>Urgent attention</span>
          </div>
        </div>

        {/* Card 6: Renewals <30d */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Renewals &lt; 30d</span>
          </div>
          <div className="ref-kpi-val">7</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">₹2.3 Cr ACV</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Customer Health | Industry Vertical | Revenue Concentration */}
      <div className="ref-grid-3col">
        {/* Panel 1: Customer Health */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Customer Health Portfolio</span>
            <span className="ref-panel-meta">86 Accounts</span>
          </div>
          <DonutMetricChart
            centerValue="86"
            centerLabel="Accounts"
            labels={['Healthy (72)', 'Attention (10)', 'Critical (4)']}
            data={[72, 10, 4]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>

        {/* Panel 2: Industry Vertical Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Accounts by Industry Vertical</span>
            <span className="ref-panel-meta">86 Clients</span>
          </div>
          <DonutMetricChart
            centerValue="86"
            centerLabel="Enterprises"
            labels={['Manufacturing (34)', 'IT Tech Parks (24)', 'Logistics & Warehousing (16)', 'Healthcare (12)']}
            data={[34, 24, 16, 12]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 3: Revenue Concentration */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top 5 Enterprise Revenue Run-Rates</span>
            <span className="ref-panel-meta">Monthly Value</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { name: 'Acme Industries', val: '₹6.8L', pct: 100, color: '#3B82F6' },
              { name: 'Meridian Tech Park', val: '₹5.4L', pct: 79.4, color: '#60A5FA' },
              { name: 'Apex Logistics Hub', val: '₹4.8L', pct: 70.5, color: '#93C5FD' },
              { name: 'Nexus Healthcare', val: '₹4.2L', pct: 61.7, color: '#F59E0B' },
              { name: 'Zenith Retail Chain', val: '₹3.9L', pct: 57.3, color: '#10B981' },
            ].map((c) => (
              <div key={c.name} className="ref-hbar-row">
                <span className="ref-hbar-label">{c.name}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                </div>
                <span className="ref-hbar-val">{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: At-Risk Accounts Table | Top Accounts Table | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: At-Risk Accounts Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">At-Risk Customer Watchlist</span>
            <span className="ref-panel-meta">SLA &lt; 95%</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>SLA</th>
                <th>Open Orders</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => openCustomer(c.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{c.name}</td>
                  <td style={{ fontWeight: 700, color: '#DC2626' }}>{c.slaCompliance}%</td>
                  <td>{c.openWorkOrders}</td>
                  <td style={{ color: '#64748B' }}>{c.accountOwner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Renewal Horizon Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Upcoming Contract Renewals</span>
            <span className="ref-panel-meta">&lt; 30 Days</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>ACV</th>
                <th>Renewal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Acme Industries', acv: '₹81.6L', days: '22d', status: 'Discussion' },
                { name: 'Meridian Tech Park', acv: '₹64.8L', days: '26d', status: 'Proposal' },
                { name: 'Zenith Retail Chain', acv: '₹46.8L', days: '18d', status: 'Review' },
                { name: 'Apex Logistics Hub', acv: '₹57.6L', days: '29d', status: 'Discussion' },
              ].map((r) => (
                <tr key={r.name}>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{r.name}</td>
                  <td style={{ fontWeight: 700 }}>{r.acv}</td>
                  <td style={{ color: '#DC2626', fontWeight: 600 }}>{r.days}</td>
                  <td>
                    <span style={{ padding: '1px 5px', borderRadius: 3, fontSize: 10, backgroundColor: '#FEF3C7', color: '#9A3412', fontWeight: 600 }}>
                      {r.status}
                    </span>
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
            <span>86 active enterprise client accounts across 5 regional plant hubs.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Total portfolio generates ₹48.6L in monthly operational run-rate.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>72 accounts maintain excellent healthy delivery status (95%+ SLA).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>4 accounts require executive intervention due to Mumbai field dispatch delays.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>7 Master Service Agreements (₹2.3 Cr ACV) are up for renewal within 30 days.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Client retention rate remains solid with zero account churn over the last 12 months.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
