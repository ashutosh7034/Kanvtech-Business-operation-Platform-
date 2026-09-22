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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 1. Header & Context */}
      <div className="section-header-wrap">
        <div>
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

      {/* 2. Business at a Glance */}
      <div className="executive-brief-strip">
        {/* Revenue */}
        <div className="executive-brief-cell" onClick={openFinancialInvestigation} title="Click to view financial position">
          <span className="brief-label">{rev.label}</span>
          <span className="brief-value">₹{rev.current}L</span>
          <div className={`brief-trend ${rev.growth >= 0 ? 'positive' : 'negative'}`}>
            {rev.growth >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>+{rev.growth}% YoY vs prior</span>
          </div>
          <span className="brief-subtext">Target: ₹{rev.target}L</span>
        </div>

        {/* Operating Margin */}
        <div className="executive-brief-cell" onClick={openFinancialInvestigation} title="Click to view margin analysis">
          <span className="brief-label">Operating Margin</span>
          <span className="brief-value">{fin.marginPct}%</span>
          <div className={`brief-trend ${fin.variancePp >= 0 ? 'positive' : 'negative'}`}>
            {fin.variancePp >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{fin.variancePp}pp vs target</span>
          </div>
          <span className="brief-subtext">Overtime: ₹{fin.overtimeCost}L ({fin.overtimeHours}h)</span>
        </div>

        {/* SLA Compliance */}
        <div className="executive-brief-cell" onClick={openSlaInvestigation} title="Click to investigate SLA delivery">
          <span className="brief-label">SLA Delivery</span>
          <span className="brief-value">{sla.compliance}%</span>
          <div className={`brief-trend ${sla.variancePp >= 0 ? 'positive' : 'negative'}`}>
            {sla.variancePp >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{sla.variancePp}pp vs target ({sla.target}%)</span>
          </div>
          <span className="brief-subtext">{sla.atRiskCount} at risk · {sla.criticalCount} critical</span>
        </div>

        {/* Workforce */}
        <div className="executive-brief-cell" onClick={openWorkforceInvestigation} title="Click to view capacity">
          <span className="brief-label">{workforce.availableLabel}</span>
          <span className="brief-value">{workforce.available} / {workforce.totalHeadcount}</span>
          <div className={`brief-trend ${workforce.gap >= 0 ? 'positive' : 'negative'}`}>
            <span>{workforce.gap < 0 ? `${workforce.gap} capacity gap` : 'Full capacity'}</span>
          </div>
          <span className="brief-subtext">Mumbai: -13 field gap</span>
        </div>
      </div>

      {/* 3. The Business Right Now (Editorial Operational Notice) */}
      <div className="editorial-notice-panel">
        <div className="editorial-notice-header">
          <span className="editorial-notice-tag">Attention</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>High Operational Priority</span>
        </div>

        <div className="editorial-headline">
          Mumbai field capacity is 13 technicians below today's requirement. 18 work orders are affected, with 4 in critical SLA windows. Estimated contract exposure: ₹12.4L.
        </div>

        <div className="editorial-metrics-grid">
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Location Hub</span>
            <span className="editorial-metric-val">Mumbai (Field Ops)</span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Staffing Deficit</span>
            <span className="editorial-metric-val" style={{ color: 'var(--status-critical-dot)' }}>71 / 84 Staff (-13)</span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Service Impact</span>
            <span className="editorial-metric-val">18 Orders (4 Critical)</span>
          </div>
          <div className="editorial-metric-item">
            <span className="editorial-metric-label">Contract Exposure</span>
            <span className="editorial-metric-val">₹12.4L (Acme & Meridian)</span>
          </div>
        </div>

        <div className="editorial-notice-footer">
          <span>Primary driver: HVAC technician availability in Mumbai central district.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="action-link-btn" onClick={openSlaInvestigation}>
              <span>Investigate SLA</span>
              <ArrowRight size={13} />
            </button>
            <button className="action-link-btn" onClick={openDecisionSupport}>
              <span>Simulate Options</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Business Performance (Revenue Trajectory Chart) */}
      <div className="section-panel">
        <div className="section-panel-header">
          <span className="section-panel-title">Business Performance & Revenue Trajectory</span>
          <button className="action-link-btn" onClick={openFinancialInvestigation}>
            <span>View Financial Position</span>
            <ArrowRight size={12} />
          </button>
        </div>
        <RevenueChart height={220} />
      </div>

      {/* 5. Progressive Sections: Operations & Customer Health */}
      <div className="two-col-grid">
        {/* Operations Brief */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Service Operations</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('operations')}>
              <span>View Operations</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '4px 0' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Open Orders</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{ops.openOrders}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Completed</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>{ops.completed}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>At SLA Risk</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--status-critical-dot)' }}>{sla.atRiskCount}</div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
            Average MTTR is <strong>2.8 hrs</strong> with <strong>88.4%</strong> first-time fix rate across 186 active work orders.
          </div>
        </div>

        {/* Customer Health Brief */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Customer Health</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('customers')}>
              <span>View Accounts</span>
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
                  <td style={{ color: account.sla < 92 ? 'var(--status-critical-dot)' : 'var(--text-primary)' }}>
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
        </div>
      </div>

      {/* 6. Progressive Sections: Workforce Capacity & Financial Position */}
      <div className="two-col-grid">
        {/* Workforce Regional Hub Deficits */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Workforce Capacity by Hub</span>
            <button className="action-link-btn" onClick={openWorkforceInvestigation}>
              <span>Investigate</span>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Mumbai Field Operations</td>
                <td>84</td>
                <td>71</td>
                <td style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>-13</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Pune Operations</td>
                <td>52</td>
                <td>49</td>
                <td style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>-3</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Bengaluru Tech Support</td>
                <td>61</td>
                <td>59</td>
                <td style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>-2</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financial Position Brief */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Financial Position</span>
            <button className="action-link-btn" onClick={() => onNavigateTab('finance')}>
              <span>View Finance</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <table className="ledger-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Benchmark</th>
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
                <td>Gross Margin</td>
                <td style={{ fontWeight: 600 }}>{fin.marginPct}%</td>
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

      {/* 7. Quiet Ask Company Query Bar */}
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
