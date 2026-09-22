import React from 'react';
import { RevenueChart } from '../../components/charts/RevenueChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  CreditCard,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const FinancePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Finance &amp; P&amp;L Dashboard</h1>
          <p className="ref-page-subtitle">
            Month-to-date revenue ₹48.6L · Operating expenses ₹36.5L · Operating margin 24.8%
          </p>
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Monthly Revenue */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <DollarSign size={16} />
            </div>
            <span className="ref-kpi-label">Monthly Revenue</span>
          </div>
          <div className="ref-kpi-val">₹ 48.6L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +8.4%</span>
            <span className="ref-kpi-context">YoY growth</span>
          </div>
        </div>

        {/* Card 2: Operating Expenses */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <Receipt size={16} />
            </div>
            <span className="ref-kpi-label">Operating Expenses</span>
          </div>
          <div className="ref-kpi-val">₹ 36.5L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Direct labor &amp; spares</span>
          </div>
        </div>

        {/* Card 3: Gross Margin */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <TrendingUp size={16} />
            </div>
            <span className="ref-kpi-label">Gross Margin</span>
          </div>
          <div className="ref-kpi-val">24.8%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +1.4 pts</span>
            <span className="ref-kpi-context">Target: 26.0%</span>
          </div>
        </div>

        {/* Card 4: Payroll Cost */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <CreditCard size={16} />
            </div>
            <span className="ref-kpi-label">Payroll Cost</span>
          </div>
          <div className="ref-kpi-val">₹ 1.82 Cr</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">58.1% of cost base</span>
          </div>
        </div>

        {/* Card 5: Overtime Cost */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">Overtime Burden</span>
          </div>
          <div className="ref-kpi-val">₹ 14.6L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#D97706' }}>312 field hours</span>
          </div>
        </div>

        {/* Card 6: Outstanding Receivables */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <ShieldCheck size={16} />
            </div>
            <span className="ref-kpi-label">Receivables DSO</span>
          </div>
          <div className="ref-kpi-val">38 Days</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><CheckCircle2 size={13} /> Healthy</span>
            <span className="ref-kpi-context">₹62.4L ledger</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Revenue Trajectory | Cost Structure Donut | Department Cost Share */}
      <div className="ref-grid-3col">
        {/* Panel 1: Revenue Trajectory */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Revenue Trajectory vs Target</span>
            <span className="ref-panel-meta">YTD FY 2026-27</span>
          </div>
          <RevenueChart height={160} />
        </div>

        {/* Panel 2: Cost Structure Donut */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Operating Expense Breakdown</span>
            <span className="ref-panel-meta">₹36.5L Total</span>
          </div>
          <DonutMetricChart
            centerValue="₹ 36.5L"
            centerLabel="Expenses"
            labels={['Labor (58%)', 'Spares (24%)', 'Logistics (10%)', 'Admin (8%)']}
            data={[21.2, 8.8, 3.8, 2.7]}
            colors={['#0F766E', '#3B82F6', '#F59E0B', '#94A3B8']}
            height={160}
          />
        </div>

        {/* Panel 3: Department Cost Share */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Cost by Department Function</span>
            <span className="ref-panel-meta">Monthly Share</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Field Operations', val: '₹21.2L', pct: 100, color: '#0F766E' },
              { dept: 'HVAC Spares & Inventory', val: '₹8.8L', pct: 41.5, color: '#3B82F6' },
              { dept: 'Fleet Logistics & Fuel', val: '₹3.8L', pct: 17.9, color: '#F59E0B' },
              { dept: 'General Administration', val: '₹2.7L', pct: 12.7, color: '#94A3B8' },
            ].map((c) => (
              <div key={c.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{c.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                </div>
                <span className="ref-hbar-val">{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Major Revenue Accounts Table | Financial Exceptions Table | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Major Revenue Accounts */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Revenue Contributors</span>
            <span className="ref-panel-meta">Monthly Run-Rate</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Enterprise</th>
                <th>Monthly Run</th>
                <th>Margin</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Acme Industries', rev: '₹6.8 L', margin: '26.4%' },
                { name: 'Meridian Tech Park', rev: '₹5.4 L', margin: '28.2%' },
                { name: 'Apex Logistics Hub', rev: '₹4.8 L', margin: '24.5%' },
                { name: 'Nexus Healthcare', rev: '₹4.2 L', margin: '29.1%' },
                { name: 'Zenith Retail Chain', rev: '₹3.9 L', margin: '23.8%' },
              ].map((c, idx) => (
                <tr key={c.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{c.name}</td>
                  <td style={{ fontWeight: 700, color: '#2563EB' }}>{c.rev}</td>
                  <td style={{ fontWeight: 600, color: '#16A34A' }}>{c.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Financial Exceptions */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Financial Audit Exceptions</span>
            <span className="ref-panel-meta">Variance Tracking</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Variance</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Mumbai Overtime Spikes', var: '+₹4.2L', impact: 'High' },
                { cat: 'Emergency Chiller Parts', var: '+₹1.8L', impact: 'Moderate' },
                { cat: 'Fleet Fuel Cost', var: '-₹0.4L', impact: 'Favorable' },
                { cat: 'Facility Power Usage', var: '-₹0.6L', impact: 'Favorable' },
              ].map((e) => (
                <tr key={e.cat}>
                  <td style={{ fontWeight: 500 }}>{e.cat}</td>
                  <td style={{ fontWeight: 700, color: e.var.startsWith('+') ? '#DC2626' : '#16A34A' }}>
                    {e.var}
                  </td>
                  <td>
                    <span style={{ padding: '1px 5px', borderRadius: 3, fontSize: 10, backgroundColor: e.impact === 'High' ? '#FEE2E2' : '#EFF6FF', color: e.impact === 'High' ? '#991B1B' : '#1E40AF', fontWeight: 600 }}>
                      {e.impact}
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
            <span>Month-to-date revenue reached ₹48.6L with an 8.4% YoY expansion rate.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Gross margin maintained at 24.8% against annual budget target of 26.0%.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Workforce direct labor represents 58.1% of overall operational cost base.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Days Sales Outstanding (DSO) at 38 days reflecting healthy collections.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Overtime expenditure in Mumbai hub (₹14.6L) is the primary margin headwind.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Zero statutory tax or payroll audit non-compliance flags recorded.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
