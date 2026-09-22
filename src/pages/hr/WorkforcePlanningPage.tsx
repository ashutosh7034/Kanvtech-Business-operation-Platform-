import React, { useState } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { CapacityDemandChart } from '../../components/charts/CapacityDemandChart';
import { UserPlus } from 'lucide-react';

export const WorkforcePlanningPage: React.FC = () => {
  const { openHiringModal } = useModalDrawer();
  const [techsToAdd, setTechsToAdd] = useState(5);
  const simulation = DataService.runSimulation(techsToAdd);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Workforce Planning &gt; Capacity Modeling &amp; Simulation</div>
          <h1 className="greeting-title">Capacity Planning</h1>
          <p className="greeting-subtitle">
            Model headcount additions, overtime reduction, and SLA recovery impact
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() =>
            openHiringModal({
              requiredCount: techsToAdd,
              reason: `Strategic workforce expansion adding ${techsToAdd} technicians to eliminate Field Operations capacity gap.`,
            })
          }
        >
          <UserPlus size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          <span>Create Requisition ({techsToAdd} Techs)</span>
        </button>
      </div>

      {/* Simulator Control Panel */}
      <div className="section-panel">
        <div className="section-panel-header">
          <span className="section-panel-title">Technician Capacity Simulator</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Model ROI on hiring vs SLA risk</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Simulate Onboarding:</span>
          <input
            type="range"
            min={1}
            max={15}
            value={techsToAdd}
            onChange={(e) => setTechsToAdd(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--brand-primary)' }}
          />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-primary)', width: 80, textAlign: 'right' }}>
            +{techsToAdd} Techs
          </span>
        </div>

        <div className="ops-summary-strip">
          <div className="ops-summary-block">
            <span className="ops-summary-label">Capacity Gain</span>
            <span className="ops-summary-val" style={{ color: 'var(--brand-primary)' }}>+{simulation.capacityGainPct}%</span>
            <span className="ops-summary-sub">Avail: {simulation.projectedMumbaiCapacity.projectedAvailable} / {simulation.projectedMumbaiCapacity.required}</span>
          </div>
          <div className="ops-summary-block">
            <span className="ops-summary-label">Projected SLA</span>
            <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>{(94.2 + simulation.slaImprovementPct).toFixed(1)}%</span>
            <span className="ops-summary-sub">Target: 96.0% (Met)</span>
          </div>
          <div className="ops-summary-block">
            <span className="ops-summary-label">Monthly Payroll</span>
            <span className="ops-summary-val">{simulation.estimatedMonthlyHiringCost}</span>
            <span className="ops-summary-sub">Base ₹65k / tech</span>
          </div>
          <div className="ops-summary-block">
            <span className="ops-summary-label">Risk Protection</span>
            <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>₹12.4L</span>
            <span className="ops-summary-sub">Acme & Meridian save</span>
          </div>
        </div>
      </div>

      {/* Capacity & Regional Analysis */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Department Capacity Baseline</span>
          </div>
          <CapacityDemandChart height={220} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Regional Staffing Gap Analysis</span>
          </div>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Regional Facility</th>
                <th>Gap</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Mumbai Central Hub</td>
                <td>Field Operations deficit of 13 technicians</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot critical" />
                    <span>High</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Pune Tech Hub</td>
                <td>Engineering automation short by 2 engineers</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot attention" />
                    <span>Moderate</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Bengaluru Support Hub</td>
                <td>Operating with +2 personnel buffer</td>
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
      </div>
    </div>
  );
};
