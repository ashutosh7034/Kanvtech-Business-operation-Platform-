import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { useFilters } from '../../context/FilterContext';
import { DataService } from '../../data/dataService';
import { DollarSign, TrendingUp, TrendingDown, Clock, PieChart, ShieldAlert } from 'lucide-react';

export const FinancialInvestigationDrawer: React.FC = () => {
  const { activeDrawer, closeAll } = useModalDrawer();
  const { period, location, department } = useFilters();

  const isOpen = activeDrawer === 'financialInvestigation';
  if (!isOpen) return null;

  const ceoData = DataService.getCeoMetrics({ period, location, department });
  const { rev, fin } = ceoData;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title="FINANCIAL POSITION & OPERATING MARGIN ANALYSIS"
      subtitle={`Fiscal Analysis • Period: ${period} (${rev.dateRange}) • ${location}`}
      width="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Financial KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Revenue</div>
            <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 2 }}>
              ₹{rev.current}L
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--status-healthy-text)', marginTop: 2 }}>
              +{rev.growth}% YoY
            </div>
          </div>

          <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Operating Cost</div>
            <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
              ₹{fin.operatingCost}L
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
              Profit: ₹{Math.round((rev.current - fin.operatingCost) * 10) / 10}L
            </div>
          </div>

          <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Margin</div>
            <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: fin.marginPct < 25 ? 'var(--status-attention-text)' : 'var(--status-healthy-dot)', marginTop: 2 }}>
              {fin.marginPct}%
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--status-critical-text)', marginTop: 2 }}>
              {fin.variancePp}pp vs Target
            </div>
          </div>

          <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 4 }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Receivables (DSO)</div>
            <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
              ₹{fin.receivables}L
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
              {fin.dsoDays} Days DSO
            </div>
          </div>
        </div>

        {/* Operating Cost Breakdown */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 10 }}>
            Operating Expense Structure &amp; Variance
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 11 }}>
                <th style={{ padding: '6px 8px' }}>Cost Category</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Actual</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Budget</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Variance</th>
                <th style={{ padding: '6px 8px', textAlign: 'left' }}>Driver Analysis</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Field Technician Payroll</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹18.4L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹18.0L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right', color: 'var(--status-attention-text)' }}>+₹0.4L</td>
                <td style={{ padding: '8px', fontSize: 11, color: 'var(--text-muted)' }}>Base staffing salaries</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'rgba(239, 68, 68, 0.03)' }}>
                <td style={{ padding: '8px', fontWeight: 600, color: 'var(--status-critical-dot)' }}>
                  Emergency Overtime Labor
                </td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>
                  ₹{fin.overtimeCost}L
                </td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹8.0L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                  +₹6.6L
                </td>
                <td style={{ padding: '8px', fontSize: 11, color: 'var(--status-critical-text)' }}>
                  <strong>{fin.overtimeHours} hours</strong> due to Mumbai technician shortage (-13 gap)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>Spares &amp; Consumables</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹8.2L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹7.8L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right', color: 'var(--status-attention-text)' }}>+₹0.4L</td>
                <td style={{ padding: '8px', fontSize: 11, color: 'var(--text-muted)' }}>HVAC compressors &amp; chiller parts</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Logistics &amp; Fleet Operations</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹5.3L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>₹5.2L</td>
                <td className="font-mono" style={{ padding: '8px', textAlign: 'right', color: 'var(--status-healthy-dot)' }}>+₹0.1L</td>
                <td style={{ padding: '8px', fontSize: 11, color: 'var(--text-muted)' }}>Inter-hub dispatch vehicles</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Portfolio Revenue Distribution */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 8 }}>
            Contract Portfolio Tier Distribution (₹18.7 Cr Total ACV)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Tier 1 Enterprise (68%)</div>
              <div className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 2 }}>
                ₹12.8 Cr ACV
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>Acme, Meridian, Vertex (34 MSAs)</div>
            </div>

            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mid-Market Accounts (22%)</div>
              <div className="font-mono" style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
                ₹4.1 Cr ACV
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>48 Commercial Facilities</div>
            </div>

            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Regional &amp; Branch (10%)</div>
              <div className="font-mono" style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
                ₹1.8 Cr ACV
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>30 Service Points</div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
