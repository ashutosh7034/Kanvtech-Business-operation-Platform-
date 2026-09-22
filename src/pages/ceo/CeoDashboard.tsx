import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { COMPANY_INFO } from '../../data/mockData';
import { FilterBar } from '../../components/common/FilterBar';
import { RevenueChart } from '../../components/charts/RevenueChart';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  ChevronRight,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface CeoDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const CeoDashboard: React.FC<CeoDashboardProps> = ({ onNavigateTab }) => {
  const { period, location, department } = useFilters();
  const {
    openCustomer,
    openSlaInvestigation,
    openWorkforceInvestigation,
    openDecisionSupport,
    openFinancialInvestigation,
  } = useModalDrawer();

  // Canonical CEO metrics derived from FilterContext
  const ceoData = DataService.getCeoMetrics({ period, location, department });
  const { rev, fin, sla, workforce, ops, cust } = ceoData;

  const exposedAccounts = [
    { id: 'cust-1', name: cust.topExposure.name, sla: cust.topExposure.sla, exposure: cust.topExposure.contractValue },
    { id: 'cust-2', name: 'Meridian Healthcare', sla: 89, exposure: '₹15.2L' },
    { id: 'cust-3', name: 'Vertex Commercial Towers', sla: 93, exposure: '₹6.9L' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* 1. Header & Context */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">
            <span>Overview</span>
            <ChevronRight size={11} />
            <span className="current">Business Performance</span>
          </div>
          <h1 className="greeting-title">CEO Overview</h1>
          <div className="greeting-subtitle">
            <span>Monday, 22 September 2026</span>
            <span className="dot-separator">·</span>
            <span>{COMPANY_INFO.name}</span>
            <span className="dot-separator">·</span>
            <span>{location}</span>
            <span className="dot-separator">·</span>
            <span>{department}</span>
          </div>
        </div>
        <FilterBar />
      </div>

      {/* 2. Executive Metric Strip (6 Cards Aligned) */}
      <div className="executive-brief-strip six-col">
        {/* Revenue */}
        <div className="executive-brief-cell" onClick={openFinancialInvestigation} title="Click to view financial position">
          <span className="brief-label">{rev.label}</span>
          <span className="brief-value">₹{rev.current}L</span>
          <div className={`brief-trend ${rev.growth >= 0 ? 'positive' : 'negative'}`}>
            {rev.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>+{rev.growth}% YoY</span>
          </div>
          <span className="brief-subtext">Target: ₹{rev.target}L</span>
        </div>

        {/* Operating Margin */}
        <div className="executive-brief-cell" onClick={openFinancialInvestigation} title="Click to view margin analysis">
          <span className="brief-label">Gross Margin</span>
          <span className="brief-value">{fin.marginPct}%</span>
          <div className={`brief-trend ${fin.variancePp >= 0 ? 'positive' : 'negative'}`}>
            {fin.variancePp >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{fin.variancePp}pp vs target</span>
          </div>
          <span className="brief-subtext">Overtime: ₹{fin.overtimeCost}L</span>
        </div>

        {/* SLA Compliance */}
        <div className="executive-brief-cell" onClick={openSlaInvestigation} title="Click to investigate SLA delivery">
          <span className="brief-label">SLA Compliance</span>
          <span className="brief-value">{sla.compliance}%</span>
          <div className={`brief-trend ${sla.variancePp >= 0 ? 'positive' : 'negative'}`}>
            {sla.variancePp >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{sla.variancePp}pp vs target ({sla.target}%)</span>
          </div>
          <span className="brief-subtext">{sla.atRiskCount} at risk · {sla.criticalCount} critical</span>
        </div>

        {/* Workforce */}
        <div className="executive-brief-cell" onClick={openWorkforceInvestigation} title="Click to view capacity">
          <span className="brief-label">{workforce.availableLabel}</span>
          <span className="brief-value">{workforce.available} / {workforce.totalHeadcount}</span>
          <div className={`brief-trend ${workforce.gap >= 0 ? 'positive' : 'negative'}`}>
            <span>{workforce.gap < 0 ? `${workforce.gap} gap` : 'Full capacity'}</span>
          </div>
          <span className="brief-subtext">Mumbai: -13 field gap</span>
        </div>

        {/* Customers */}
        <div className="executive-brief-cell" onClick={() => onNavigateTab('customers')} title="Click to view customer accounts">
          <span className="brief-label">Customer Portfolio</span>
          <span className="brief-value">86</span>
          <div className="brief-trend" style={{ color: 'var(--status-critical-dot)' }}>
            <span>4 requiring attention</span>
          </div>
          <span className="brief-subtext">₹48.6L monthly run-rate</span>
        </div>

        {/* Contracts */}
        <div className="executive-brief-cell" onClick={() => onNavigateTab('contracts')} title="Click to view contracts">
          <span className="brief-label">Active Contracts</span>
          <span className="brief-value">112</span>
          <div className="brief-trend" style={{ color: 'var(--status-attention-dot)' }}>
            <span>7 renewing &lt; 30d</span>
          </div>
          <span className="brief-subtext">₹18.7 Cr Total ACV</span>
        </div>
      </div>

      {/* 3. Operational Attention Required Queue */}
      <div className="section-panel" style={{ padding: '14px 18px' }}>
        <div className="section-panel-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="section-panel-title">Operational Attention Queue</span>
            <span style={{ fontSize: 11, padding: '2px 6px', backgroundColor: 'var(--status-critical-bg)', color: 'var(--status-critical-dot)', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}>
              3 Action Items
            </span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>High Operational Priority</span>
        </div>

        <table className="ledger-table" style={{ marginTop: 6 }}>
          <thead>
            <tr>
              <th>Operational Issue</th>
              <th>Deployment Area</th>
              <th>Business Impact</th>
              <th>Owner</th>
              <th>Severity</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ fontWeight: 600 }}>Mumbai Field Technician Deficit</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>71 active vs 84 required (13 technician gap)</div>
              </td>
              <td>Field Operations (Mumbai)</td>
              <td>
                <span style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>18 Orders (4 Critical SLA)</span>
              </td>
              <td>Operations Lead</td>
              <td>
                <span className="status-indicator">
                  <span className="status-dot critical" />
                  <span style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>Critical</span>
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 8 }}>
                  <button className="action-link-btn" onClick={openSlaInvestigation}>
                    <span>Investigate</span>
                    <ArrowRight size={11} />
                  </button>
                  <button className="action-link-btn" onClick={openDecisionSupport}>
                    <span>Simulate</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ fontWeight: 600 }}>Acme Industries SLA Window Risk</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>3 critical work orders approaching penalty deadline</div>
              </td>
              <td>Service Operations (Pune)</td>
              <td>
                <span style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>₹12.4L Contract Exposure</span>
              </td>
              <td>Service Desk</td>
              <td>
                <span className="status-indicator">
                  <span className="status-dot attention" />
                  <span style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>At Risk</span>
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="action-link-btn" onClick={() => openCustomer('cust-1')}>
                  <span>View Account</span>
                  <ArrowRight size={11} />
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ fontWeight: 600 }}>Horizon Commercial Towers Renewal</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Master Service Agreement expires in 22 days</div>
              </td>
              <td>Enterprise Accounts</td>
              <td>₹18.4L Annual Contract Value</td>
              <td>Commercial Team</td>
              <td>
                <span className="status-indicator">
                  <span className="status-dot info" />
                  <span>Upcoming</span>
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="action-link-btn" onClick={() => onNavigateTab('contracts')}>
                  <span>Review MSA</span>
                  <ArrowRight size={11} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Business Performance & Customer Portfolio Health */}
      <div className="two-col-grid">
        {/* Business Performance (Revenue Trajectory Chart) */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Business Performance &amp; Revenue Trajectory</span>
            <button className="action-link-btn" onClick={openFinancialInvestigation}>
              <span>Financial Detail</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <RevenueChart height={220} />
        </div>

        {/* Customer Health Portfolio */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Customer Health Portfolio</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('customers')}>
              <span>View All Accounts</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>SLA</th>
                <th>Risk Exposure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {exposedAccounts.map((account) => (
                <tr
                  key={account.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => openCustomer(account.id)}
                >
                  <td style={{ fontWeight: 600 }}>{account.name}</td>
                  <td style={{ color: account.sla < 92 ? 'var(--status-critical-dot)' : 'var(--text-primary)', fontWeight: 600 }}>
                    {account.sla}%
                  </td>
                  <td>{account.exposure}</td>
                  <td>
                    <span className="status-indicator">
                      <span className={`status-dot ${account.sla < 92 ? 'critical' : 'attention'}`} />
                      <span>{account.sla < 92 ? 'Critical' : 'Attention'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', paddingTop: 4 }}>
            86 active accounts · 94.2% portfolio average SLA delivery
          </div>
        </div>
      </div>

      {/* 5. Regional Hub Capacity & Financial Position */}
      <div className="two-col-grid">
        {/* Workforce Regional Hub Deficits */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Workforce Capacity by Regional Hub</span>
            <button className="action-link-btn" onClick={openWorkforceInvestigation}>
              <span>Capacity Detail</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Regional Hub</th>
                <th>Required</th>
                <th>Available</th>
                <th>Deficit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Mumbai Field Operations</td>
                <td>84</td>
                <td>71</td>
                <td style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>-13</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot critical" />
                    <span>Deficit</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Pune Operations</td>
                <td>52</td>
                <td>49</td>
                <td style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>-3</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot attention" />
                    <span>Balanced</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Bengaluru Tech Support</td>
                <td>61</td>
                <td>59</td>
                <td style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>-2</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot attention" />
                    <span>Balanced</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Hyderabad Regional Facility</td>
                <td>45</td>
                <td>45</td>
                <td style={{ color: 'var(--status-healthy-dot)', fontWeight: 600 }}>0</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot healthy" />
                    <span>Optimal</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Position Brief */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Financial Position &amp; Cost Structure</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('finance')}>
              <span>View Finance</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Financial Metric</th>
                <th>Current Value</th>
                <th>Benchmark / Context</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gross Revenue</td>
                <td style={{ fontWeight: 600 }}>₹{rev.current}L</td>
                <td style={{ color: 'var(--text-muted)' }}>Target: ₹{rev.target}L</td>
              </tr>
              <tr>
                <td>Operating Gross Cost</td>
                <td style={{ fontWeight: 600 }}>₹{fin.operatingCost}L</td>
                <td style={{ color: 'var(--text-muted)' }}>Includes ₹{fin.overtimeCost}L overtime</td>
              </tr>
              <tr>
                <td>Operating Margin</td>
                <td style={{ fontWeight: 600, color: 'var(--status-healthy-dot)' }}>{fin.marginPct}%</td>
                <td style={{ color: 'var(--text-muted)' }}>Target: {fin.targetMarginPct}%</td>
              </tr>
              <tr>
                <td>Receivables Outstanding</td>
                <td style={{ fontWeight: 600 }}>₹62.4L</td>
                <td style={{ color: 'var(--text-muted)' }}>38 Days DSO (Healthy)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Ask Company Query Bar */}
      <div className="ask-company-bar">
        <Search size={14} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="ask-company-input"
          placeholder="Ask Company: query operational data, investigate SLA drivers, or forecast capacity..."
          onClick={() => onNavigateTab('ask_company')}
          readOnly
        />
        <div className="ask-company-chips">
          <span className="ask-chip" onClick={() => onNavigateTab('ask_company')}>Why is SLA declining in Mumbai?</span>
          <span className="ask-chip" onClick={() => onNavigateTab('ask_company')}>Where are we understaffed?</span>
          <span className="ask-chip" onClick={() => onNavigateTab('ask_company')}>Which customers are at risk?</span>
        </div>
      </div>
    </div>
  );
};
