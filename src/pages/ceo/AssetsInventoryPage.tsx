import React from 'react';
import { MOCK_ASSETS, MOCK_INVENTORY } from '../../data/mockData';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Boxes,
  ShieldCheck,
  ArrowUpRight,
  Lightbulb,
} from 'lucide-react';

export const AssetsInventoryPage: React.FC = () => {
  const criticalAssets = MOCK_ASSETS.filter((a) => a.status === 'critical' || a.status === 'maintenance_due').slice(0, 5);
  const lowStockItems = MOCK_INVENTORY.filter((i) => i.status === 'critical' || i.stockLevel <= i.minThreshold).slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Assets &amp; Inventory Dashboard</h1>
          <p className="ref-page-subtitle">
            1,284 tracked assets · 91.6% operational health across 5 regional plant hubs
          </p>
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Assets */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Package size={16} />
            </div>
            <span className="ref-kpi-label">Total Assets</span>
          </div>
          <div className="ref-kpi-val">1,284</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> Tracked</span>
            <span className="ref-kpi-context">across 5 hubs</span>
          </div>
        </div>

        {/* Card 2: Operational Assets */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Operational Assets</span>
          </div>
          <div className="ref-kpi-val">1,176</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> 91.6%</span>
            <span className="ref-kpi-context">readiness rate</span>
          </div>
        </div>

        {/* Card 3: Maintenance Due */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">Maintenance Due</span>
          </div>
          <div className="ref-kpi-val">64</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Next 7 days</span>
          </div>
        </div>

        {/* Card 4: Critical Assets */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">Critical Condition</span>
          </div>
          <div className="ref-kpi-val" style={{ color: '#DC2626' }}>12</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down" style={{ color: '#DC2626' }}>Requires parts</span>
          </div>
        </div>

        {/* Card 5: Inventory Valuation */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <Boxes size={16} />
            </div>
            <span className="ref-kpi-label">Inventory Value</span>
          </div>
          <div className="ref-kpi-val">₹ 68.4L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ShieldCheck size={13} /> Stocked</span>
            <span className="ref-kpi-context">1,420 line items</span>
          </div>
        </div>

        {/* Card 6: Low Stock Alerts */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <AlertTriangle size={16} />
            </div>
            <span className="ref-kpi-label">Low Stock SKUs</span>
          </div>
          <div className="ref-kpi-val">8</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">Reorder threshold</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Asset Health | Asset Category | Assets by Location */}
      <div className="ref-grid-3col">
        {/* Panel 1: Asset Health */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Asset Operational Condition</span>
            <span className="ref-panel-meta">1,284 Units</span>
          </div>
          <DonutMetricChart
            centerValue="1,284"
            centerLabel="Equipment"
            labels={['Operational (1,176)', 'Maintenance Due (64)', 'Critical (12)', 'Under Repair (32)']}
            data={[1176, 64, 12, 32]}
            colors={['#10B981', '#F59E0B', '#EF4444', '#94A3B8']}
            height={160}
          />
        </div>

        {/* Panel 2: Asset Category */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Assets by Category</span>
            <span className="ref-panel-meta">Coverage</span>
          </div>
          <DonutMetricChart
            centerValue="1,284"
            centerLabel="Total Assets"
            labels={['HVAC Chillers (482)', 'Electrical Substations (324)', 'Fire & Safety (268)', 'Cleanroom BMS (210)']}
            data={[482, 324, 268, 210]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 3: Assets by Location */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Equipment by Regional Facility</span>
            <span className="ref-panel-meta">Location Count</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { loc: 'Mumbai Central Hub', count: 486, pct: 100, color: '#3B82F6' },
              { loc: 'Pune Tech Hub', count: 342, pct: 70.3, color: '#60A5FA' },
              { loc: 'Bengaluru Facility', count: 218, pct: 44.8, color: '#93C5FD' },
              { loc: 'Delhi NCR Hub', count: 146, pct: 30.0, color: '#BFDBFE' },
              { loc: 'Hyderabad Tech Center', count: 92, pct: 18.9, color: '#DBEAFE' },
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

      {/* ROW 2: Critical Assets Table | Low Stock Spares Table | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Critical Assets Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Critical Condition Equipment</span>
            <span className="ref-panel-meta">Immediate Action</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Asset Name</th>
                <th>Customer Site</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {criticalAssets.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{a.code}</td>
                  <td>{a.name}</td>
                  <td>{a.customerSite}</td>
                  <td style={{ color: '#DC2626', fontWeight: 700 }}>{a.nextServiceDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Low Stock Spares Table */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Critical Spares Inventory Stock</span>
            <span className="ref-panel-meta">Low Stock Alert</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Part Name</th>
                <th>Stock</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((i) => (
                <tr key={i.id}>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{i.sku}</td>
                  <td>{i.name}</td>
                  <td style={{ color: i.stockLevel <= i.minThreshold ? '#DC2626' : '#1E293B', fontWeight: 700 }}>
                    {i.stockLevel} (Min: {i.minThreshold})
                  </td>
                  <td>₹{(i.totalValue).toLocaleString('en-IN')}</td>
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
            <span>1,284 total tracked plant equipment units with 91.6% operational health.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>12 critical equipment units require immediate technician parts dispatch.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>64 routine preventive maintenance services scheduled for the next 7 days.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Critical HVAC and Chiller inventory valuation stands at ₹68.4L.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>8 spare part SKUs reached minimum reorder thresholds in Mumbai warehouse.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Zero critical safety equipment non-compliance failures reported this month.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
