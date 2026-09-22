import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { useFilters } from '../../context/FilterContext';
import { DataService } from '../../data/dataService';
import { Users, AlertTriangle, ArrowRight, UserCheck, ShieldAlert, Award } from 'lucide-react';

export const WorkforceInvestigationDrawer: React.FC = () => {
  const { activeDrawer, closeAll, openEmployee, openDecisionSupport } = useModalDrawer();
  const { period, location, department } = useFilters();

  const isOpen = activeDrawer === 'workforceInvestigation';
  if (!isOpen) return null;

  const hrData = DataService.getHrMetrics({ period, location, department });
  const ceoData = DataService.getCeoMetrics({ period, location, department });
  const { workforce } = ceoData;
  const { regionalCapacity } = hrData;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title="WORKFORCE CAPACITY & REGIONAL ALLOCATION"
      subtitle={`Live Deployment Analysis • Total Headcount: ${workforce.totalHeadcount} • Active on Duty: ${workforce.available}`}
      width="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Metric Header Strip */}
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
              {workforce.isHistorical ? 'Historical Avg Deployment' : 'Field Operations Capacity'}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
              <span className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                {workforce.available} / {workforce.required}
              </span>
              <span style={{ fontSize: 12, color: 'var(--status-critical-text)', fontWeight: 600 }}>
                {workforce.percentage}% Available ({workforce.gap} Deficit in Mumbai)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, textAlign: 'right' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Approved Leave</div>
              <div className="font-mono" style={{ fontSize: 15, fontWeight: 700 }}>21 Staff</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Unplanned Absent</div>
              <div className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--status-critical-dot)' }}>10 Staff</div>
            </div>
          </div>
        </div>

        {/* Regional Capacity vs Requirement Table */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 10 }}>
            Regional Hub Deployment Breakdown
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 11 }}>
                <th style={{ padding: '6px 8px' }}>Regional Hub</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Required</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Available</th>
                <th style={{ padding: '6px 8px', textAlign: 'right' }}>Capacity Gap</th>
                <th style={{ padding: '6px 8px', textAlign: 'center' }}>Operating Status</th>
              </tr>
            </thead>
            <tbody>
              {regionalCapacity.map((r) => (
                <tr key={r.region} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '8px', fontWeight: 600 }}>{r.region}</td>
                  <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>{r.required}</td>
                  <td className="font-mono" style={{ padding: '8px', textAlign: 'right' }}>{r.available}</td>
                  <td
                    className="font-mono"
                    style={{
                      padding: '8px',
                      textAlign: 'right',
                      fontWeight: 700,
                      color: r.gap < -5 ? 'var(--status-critical-dot)' : r.gap < 0 ? 'var(--status-attention-text)' : 'var(--status-healthy-dot)',
                    }}
                  >
                    {r.gap}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontSize: 10.5,
                        padding: '2px 6px',
                        borderRadius: 3,
                        fontWeight: 600,
                        backgroundColor: r.gap < -5 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: r.gap < -5 ? 'var(--status-critical-text)' : 'var(--status-healthy-text)',
                      }}
                    >
                      {r.status === 'Deficit' ? 'Deficit Pressure' : 'Operational'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Root Causes of Mumbai Capacity Gap */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 8 }}>
            Root Cause Factors in Mumbai Field Operations (-13 Gap)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 3 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Unplanned Absences</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--status-critical-dot)', marginTop: 2 }}>
                3 Technicians
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4 }}>Medical &amp; emergency leave</div>
            </div>

            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 3 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Certification Constraints</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--status-attention-text)', marginTop: 2 }}>
                6 Technicians
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4 }}>HVAC Level III renewal required</div>
            </div>

            <div style={{ padding: 10, backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 3 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Severe Task Overload</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 2 }}>
                4 Technicians
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4 }}>&gt; 5 active jobs concurrently</div>
            </div>
          </div>
        </div>

        {/* Most Loaded Technicians */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Most Loaded Field Technicians
            </h4>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Click technician to inspect profile</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {workforce.loadedTechnicians.map((t) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                onClick={() => openEmployee(t.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-primary)' }}>{t.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>• {t.location} Hub</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    Active Jobs: <strong>{t.activeJobs}</strong> • High Priority: <strong>{t.priorityJobs}</strong> • SLA Risk: <strong style={{ color: t.slaRiskCount > 0 ? 'var(--status-critical-dot)' : 'inherit' }}>{t.slaRiskCount}</strong>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEmployee(t.id);
                  }}
                  style={{
                    padding: '4px 8px',
                    fontSize: 11,
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 3,
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                  }}
                >
                  View Profile
                </button>
              </div>
            ))}
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
            Simulate Staffing Options <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </Drawer>
  );
};
