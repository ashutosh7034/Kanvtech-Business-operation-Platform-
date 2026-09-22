import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  FileText,
  DollarSign,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';

export const ContractsPage: React.FC = () => {
  const { openContract, openCustomer } = useModalDrawer();
  const contracts = DataService.getContracts();

  const expiringContracts = contracts.filter((c) => c.daysRemaining < 45);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Context Quote */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Contracts Portfolio Dashboard</h1>
          <p className="ref-page-subtitle">
            112 active Master Service Agreements · Total portfolio ACV: ₹18.7 Cr
          </p>
        </div>
        <div className="ref-quote-box">
          <span className="ref-quote-text">"Contract Governance. Risk Mitigation."</span>
          <div className="ref-quote-line" />
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Active Contracts */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <FileText size={16} />
            </div>
            <span className="ref-kpi-label">Active Contracts</span>
          </div>
          <div className="ref-kpi-val">112</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> Active</span>
            <span className="ref-kpi-context">MSAs in force</span>
          </div>
        </div>

        {/* Card 2: Total ACV */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <DollarSign size={16} />
            </div>
            <span className="ref-kpi-label">Portfolio ACV</span>
          </div>
          <div className="ref-kpi-val">₹ 18.7 Cr</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +11.4%</span>
            <span className="ref-kpi-context">annualized run-rate</span>
          </div>
        </div>

        {/* Card 3: Renewals <30d */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Renewing &lt; 30d</span>
          </div>
          <div className="ref-kpi-val" style={{ color: '#DC2626' }}>7</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">₹2.3 Cr at renewal</span>
          </div>
        </div>

        {/* Card 4: Renewals <90d */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Calendar size={16} />
            </div>
            <span className="ref-kpi-label">Renewing &lt; 90d</span>
          </div>
          <div className="ref-kpi-val">19</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Active discussions</span>
          </div>
        </div>

        {/* Card 5: SLA Risk Contracts */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">SLA Risk Contracts</span>
          </div>
          <div className="ref-kpi-val">8</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Penalty exposure</span>
          </div>
        </div>

        {/* Card 6: Average Contract Value */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <ShieldCheck size={16} />
            </div>
            <span className="ref-kpi-label">Avg ACV / Contract</span>
          </div>
          <div className="ref-kpi-val">₹ 16.7L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +4.2%</span>
            <span className="ref-kpi-context">expansion rate</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Contract Status | Scope Distribution | ACV by Vertical */}
      <div className="ref-grid-3col">
        {/* Panel 1: Contract Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Contract Portfolio Lifecycle</span>
            <span className="ref-panel-meta">112 MSAs</span>
          </div>
          <DonutMetricChart
            centerValue="112"
            centerLabel="Active MSAs"
            labels={['Active & Stable (86)', 'Renewing < 90d (19)', 'Expiring < 30d (7)']}
            data={[86, 19, 7]}
            colors={['#10B981', '#F59E0B', '#EF4444']}
            height={160}
          />
        </div>

        {/* Panel 2: Scope Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Contracts by Service Scope</span>
            <span className="ref-panel-meta">Coverage</span>
          </div>
          <DonutMetricChart
            centerValue="112"
            centerLabel="Agreements"
            labels={['Integrated Facility Mgmt (48)', 'HVAC & MEP Maintenance (36)', 'Energy & Utilities (18)', 'Cleanroom Operations (10)']}
            data={[48, 36, 18, 10]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 3: ACV by Vertical */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Contract ACV by Client Industry</span>
            <span className="ref-panel-meta">₹18.7 Cr Total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { ind: 'Manufacturing Plants', val: '₹7.8 Cr', pct: 100, color: '#3B82F6' },
              { ind: 'IT & Business Parks', val: '₹5.2 Cr', pct: 66.6, color: '#60A5FA' },
              { ind: 'Logistics Hubs', val: '₹3.4 Cr', pct: 43.5, color: '#93C5FD' },
              { ind: 'Healthcare & Biotech', val: '₹2.3 Cr', pct: 29.4, color: '#F59E0B' },
            ].map((v) => (
              <div key={v.ind} className="ref-hbar-row">
                <span className="ref-hbar-label">{v.ind}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${v.pct}%`, backgroundColor: v.color }} />
                </div>
                <span className="ref-hbar-val">{v.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Upcoming Renewals Table | Top Contracts Table | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Upcoming Renewals Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Renewals Required (&lt; 45 Days)</span>
            <span className="ref-panel-meta">Priority Action</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Enterprise</th>
                <th>ACV</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {expiringContracts.slice(0, 5).map((cntr) => (
                <tr
                  key={cntr.id}
                  onClick={() => openContract(cntr.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{cntr.contractNumber}</td>
                  <td>{cntr.customerName}</td>
                  <td style={{ fontWeight: 600 }}>{cntr.valueAnnual}</td>
                  <td style={{ color: cntr.daysRemaining < 30 ? '#DC2626' : '#D97706', fontWeight: 700 }}>
                    {cntr.daysRemaining}d
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Top Value Contracts */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Value MSA Portfolio</span>
            <span className="ref-panel-meta">Annual Run-Rate</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Customer</th>
                <th>ACV</th>
                <th>SLA Target</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Acme Industries', acv: '₹81.6 L', sla: '98.0%' },
                { name: 'Meridian Tech Park', acv: '₹64.8 L', sla: '96.0%' },
                { name: 'Apex Logistics Hub', acv: '₹57.6 L', sla: '95.0%' },
                { name: 'Nexus Healthcare', acv: '₹50.4 L', sla: '99.0%' },
                { name: 'Zenith Retail Chain', acv: '₹46.8 L', sla: '95.0%' },
              ].map((c, idx) => (
                <tr key={c.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{c.name}</td>
                  <td style={{ fontWeight: 700, color: '#2563EB' }}>{c.acv}</td>
                  <td>{c.sla}</td>
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
            <span>112 active Master Service Agreements representing ₹18.7 Cr annual portfolio value.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>7 contracts (₹2.3 Cr ACV) are up for renewal within the next 30 days.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>8 contracts flagged for SLA penalty review due to regional staffing gaps.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Integrated Facility Management represents the largest contract scope (43%).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average contract value grew by 4.2% through scope expansion and addendums.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Renewal discussions currently underway with Acme and Meridian management teams.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
