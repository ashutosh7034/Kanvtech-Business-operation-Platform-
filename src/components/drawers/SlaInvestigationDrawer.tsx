import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { useFilters } from '../../context/FilterContext';
import { DataService } from '../../data/dataService';
import { SlaTrendChart } from '../charts/SlaTrendChart';
import { SlaRootCauseChart } from '../charts/SlaRootCauseChart';
import { AlertTriangle, TrendingDown, ArrowRight, ShieldAlert, Users, Wrench, Building2 } from 'lucide-react';

export const SlaInvestigationDrawer: React.FC = () => {
  const { activeDrawer, closeAll, openCustomer, openWorkOrder, openDecisionSupport } = useModalDrawer();
  const { period, location, department } = useFilters();

  const isOpen = activeDrawer === 'slaInvestigation';
  if (!isOpen) return null;

  const ceoData = DataService.getCeoMetrics({ period, location, department });
  const { sla } = ceoData;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title="SLA DELIVERY & ROOT CAUSE INVESTIGATION"
      subtitle={`Live Analysis • Filter: ${period} • ${location} • ${department}`}
      width="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Executive Metric Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Current SLA Compliance
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                {sla.compliance}%
              </span>
              <span style={{ fontSize: 12, color: 'var(--status-critical-text)', display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingDown size={13} />
                {sla.variancePp}pp vs Target ({sla.target}%)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, textAlign: 'right' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Orders at Risk</div>
              <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--status-attention-text)' }}>
                {sla.atRiskCount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Critical Breaches</div>
              <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                {sla.criticalCount}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Root Cause Breakdown */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10, color: 'var(--text-primary)' }}>
            Root Cause Decomposition (% SLA Variance)
          </h4>
          <SlaRootCauseChart />
        </div>

        {/* SLA Compliance Timeline Trend */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, color: 'var(--text-primary)' }}>
            14-Day SLA Delivery Timeline vs 96.0% Benchmark
          </h4>
          <SlaTrendChart height={160} />
        </div>

        {/* Affected Accounts & Hotspots */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Affected Accounts */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Building2 size={13} />
              Top Exposed Accounts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 8px',
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 3,
                  cursor: 'pointer',
                }}
                onClick={() => openCustomer('cust-101')}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-primary)' }}>Acme Industries</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>3 SLA Risks • ₹12.4L ACV</div>
                </div>
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                  91.0%
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 8px',
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 3,
                  cursor: 'pointer',
                }}
                onClick={() => openCustomer('cust-102')}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-primary)' }}>Meridian Healthcare</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>1 SLA Risk • ₹15.2L ACV</div>
                </div>
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--status-attention-text)' }}>
                  89.4%
                </span>
              </div>
            </div>
          </div>

          {/* Primary Operational Hotspot */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Users size={13} />
              Primary Bottleneck
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong>Mumbai Field Operations:</strong> 84 required vs 71 available (<span style={{ color: 'var(--status-critical-dot)', fontWeight: 700 }}>-13 technician deficit</span>).
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
              Driver: 3 unplanned absentees, 6 HVAC certification renewal constraints, 4 tech overload.
            </div>
          </div>
        </div>

        {/* Critical Work Orders In Queue */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Critical Work Orders Running Late
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Showing primary breach order</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              backgroundColor: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            onClick={() => openWorkOrder('wo-8921')}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                  WO-8921
                </span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Emergency Chiller Compressor Trip</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                Customer: Acme Industries • Lead: Amit Sharma (EMP-10482) • Mumbai
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="font-mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-critical-dot)' }}>
                1.2 hrs remaining
              </span>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>SLA Breach Imminent</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => openDecisionSupport()}
            style={{
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: 'var(--brand-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Simulate Capacity Solution <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </Drawer>
  );
};
