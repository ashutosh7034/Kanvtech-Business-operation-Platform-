import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Zap, TrendingUp, Clock, DollarSign } from 'lucide-react';

export const DecisionSupportDrawer: React.FC = () => {
  const { activeDrawer, closeAll, openHiringModal } = useModalDrawer();
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C'>('A');

  const isOpen = activeDrawer === 'decisionSupport';
  if (!isOpen) return null;

  const handleExecuteDecision = () => {
    if (selectedOption === 'A') {
      openHiringModal({
        title: 'Senior Field Technician - Industrial HVAC',
        department: 'Field Operations',
        location: 'Mumbai',
        requiredCount: 5,
        priority: 'critical',
        reason: 'Authorized CEO executive decision to solve Mumbai Field Operations capacity deficit (-13 gap) and stabilize Acme Industries SLA.',
        skillsRequired: ['HVAC Industrial Level III', 'Chiller Plant Operations', 'Preventive Maintenance', 'Safety Protocols'],
      });
    } else {
      closeAll();
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title="EXECUTIVE DECISION SUPPORT & SCENARIO MODELING"
      subtitle="Deterministic Operational Forecast • Modeled Impact Analysis"
      width="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Current State Diagnostic */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
            Current Operational Baseline
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
            Mumbai Field Operations: <strong>71 Available / 84 Required (-13 Gap)</strong>. Current SLA is <strong>94.2%</strong> (-1.8pp below benchmark), exposing <strong>18 work orders</strong> and <strong>₹12.4L contract value</strong> to SLA breach penalties.
          </div>
        </div>

        {/* Model-Generated Scenarios */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Model-Generated Scenarios
            </span>
            <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Select option to review modeled outcome</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Option A */}
            <div
              style={{
                border: selectedOption === 'A' ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedOption === 'A' ? 'rgba(15, 118, 110, 0.03)' : 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                padding: 12,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedOption('A')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--brand-primary)' }}>OPTION A</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Hire 5 Field Technicians (Mumbai Hub)</span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 5px',
                    borderRadius: 2,
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Model-Generated Scenario
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8, padding: '6px 8px', backgroundColor: 'var(--bg-canvas)', borderRadius: 3 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Capacity Gain</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>+6.0%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Projected SLA</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-primary)' }}>97.0%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Monthly Cost</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>₹3.25L / mo</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lead Time</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>7 Days</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                Direct effect: Eliminates 70% of technician deficit, fully protects Acme Industries &amp; Meridian Healthcare MSAs.
              </div>
            </div>

            {/* Option B */}
            <div
              style={{
                border: selectedOption === 'B' ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedOption === 'B' ? 'rgba(15, 118, 110, 0.03)' : 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                padding: 12,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedOption('B')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>OPTION B</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Authorize Emergency Overtime (180 hrs)</span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 5px',
                    borderRadius: 2,
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Model-Generated Scenario
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8, padding: '6px 8px', backgroundColor: 'var(--bg-canvas)', borderRadius: 3 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Capacity Gain</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-attention-text)' }}>+3.0%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Projected SLA</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>95.2%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Monthly Cost</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>₹1.80L</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lead Time</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>Immediate</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                Trade-off: High technician burnout risk, increases overtime cost burden, does not fix core root cause.
              </div>
            </div>

            {/* Option C */}
            <div
              style={{
                border: selectedOption === 'C' ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: selectedOption === 'C' ? 'rgba(15, 118, 110, 0.03)' : 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                padding: 12,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedOption('C')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>OPTION C</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Temporary Technician Reallocation (Pune → Mumbai)</span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 5px',
                    borderRadius: 2,
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Model-Generated Scenario
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8, padding: '6px 8px', backgroundColor: 'var(--bg-canvas)', borderRadius: 3 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Capacity Gain</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-attention-text)' }}>+2.5%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Projected SLA</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>95.0%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Monthly Cost</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>~₹45,000</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lead Time</div>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>24 Hours</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                Trade-off: Transfers 4 technicians from Pune Hub, reducing Pune's buffer staffing from +3 to -1.
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={closeAll}
            style={{
              padding: '7px 14px',
              fontSize: 12,
              backgroundColor: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: 4,
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            Dismiss
          </button>
          <button
            onClick={handleExecuteDecision}
            style={{
              padding: '7px 16px',
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
            {selectedOption === 'A' ? 'Authorize Requisition for Option A (5 Techs)' : 'Execute Selected Option'}
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </Drawer>
  );
};
