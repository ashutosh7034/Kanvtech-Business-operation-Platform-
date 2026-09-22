import React from 'react';
import { RevenueChart } from '../../components/charts/RevenueChart';

export const FinancePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Finance</h1>
          <p className="greeting-subtitle">
            Month-to-date revenue ₹48.6L · Operating expenses ₹36.5L · Operating margin 24.8%
          </p>
        </div>
      </div>

      {/* Financial Summary Strip */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Monthly Revenue</span>
          <span className="ops-summary-val">₹48.6L</span>
          <span className="ops-summary-sub">+8.4% YoY growth</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Operating Expenses</span>
          <span className="ops-summary-val">₹36.5L</span>
          <span className="ops-summary-sub">Direct labor & spares</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Gross Margin</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>24.8%</span>
          <span className="ops-summary-sub">Target: 26.0%</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Receivables Outstanding</span>
          <span className="ops-summary-val">₹62.4L</span>
          <span className="ops-summary-sub">38 Days DSO (Healthy)</span>
        </div>
      </div>

      {/* Trajectory & Cost Breakdown */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Revenue Trajectory vs Target</span>
          </div>
          <RevenueChart height={220} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Cost Structure & Expense Breakdown</span>
          </div>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Expense Category</th>
                <th>Amount</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 500 }}>Workforce Direct Labor & Payroll</td>
                <td style={{ fontWeight: 600 }}>₹21.2L</td>
                <td>58.1%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>HVAC & Electrical Spares / Consumables</td>
                <td style={{ fontWeight: 600 }}>₹8.8L</td>
                <td>24.1%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>Fleet Transport & Site Logistics</td>
                <td style={{ fontWeight: 600 }}>₹3.8L</td>
                <td>10.4%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 500 }}>General Administration & Facilities</td>
                <td style={{ fontWeight: 600 }}>₹2.7L</td>
                <td>7.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
