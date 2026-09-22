import React, { useState, useEffect } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService, SimulationResult } from '../../data/dataService';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  FileCheck,
  Zap,
} from 'lucide-react';

interface AskCompanyWidgetProps {
  embedded?: boolean;
}

export const AskCompanyWidget: React.FC<AskCompanyWidgetProps> = ({ embedded = false }) => {
  const { openHiringModal, openWorkOrder, openEmployee, openCustomer, askCompanyInitialQuery } = useModalDrawer();
  const [query, setQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [simulationCount, setSimulationCount] = useState<number>(5);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const presetQuestions = [
    'Why are SLA risks increasing?',
    'What happens if we hire 5 technicians?',
    'Where are we short on workforce capacity?',
    'Which customers need attention?',
    'How is the company performing today?',
  ];

  useEffect(() => {
    if (askCompanyInitialQuery) {
      handleAsk(askCompanyInitialQuery);
    }
  }, [askCompanyInitialQuery]);

  const handleAsk = (q: string) => {
    setQuery(q);
    setActiveQuestion(q);

    if (q.toLowerCase().includes('hire') || q.toLowerCase().includes('technician') || q.toLowerCase().includes('what happens')) {
      const sim = DataService.runSimulation(simulationCount);
      setSimulationResult(sim);
    } else {
      setSimulationResult(null);
    }
  };

  const handleSimulateChange = (val: number) => {
    setSimulationCount(val);
    const sim = DataService.runSimulation(val);
    setSimulationResult(sim);
  };

  return (
    <div className="ask-company-container">
      <div className="ask-company-header">
        <div className="ask-company-title">
          <Zap size={16} style={{ color: 'var(--brand-primary)' }} />
          <span>ASK COMPANY • Operational Intelligence & Simulation</span>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Enterprise Model v2.4</span>
      </div>

      <div className="ask-company-body">
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search size={15} style={{ position: 'absolute', left: 10, color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Ask anything about revenue, workforce capacity, SLA risks, customers, or simulations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query.trim() && handleAsk(query)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                fontSize: 13,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button
            className="btn-primary"
            onClick={() => query.trim() && handleAsk(query)}
            disabled={!query.trim()}
          >
            Analyze
          </button>
        </div>

        {/* Quick Question Pills */}
        <div className="quick-prompt-pills">
          <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center', marginRight: 4 }}>
            Suggested Queries:
          </span>
          {presetQuestions.map((q) => (
            <button
              key={q}
              className={`quick-prompt-btn ${activeQuestion === q ? 'active' : ''}`}
              onClick={() => handleAsk(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Structured Output */}
        {activeQuestion && (
          <div className="structured-response-card">
            {/* Question Header */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Executive Query
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                "{activeQuestion}"
              </div>
            </div>

            {/* If SLA risks inquiry */}
            {activeQuestion.includes('SLA risks') && (
              <>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>
                  SLA risk increased by 18% since yesterday across Western Region commercial sites.
                </div>

                <div>
                  <div className="response-section-title">Primary Contributing Factors</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 12 }}>
                    <div style={{ padding: '8px 10px', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-xs)', border: '1px solid #FECACA' }}>
                      <strong style={{ color: '#991B1B' }}>1. Technician Availability</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                        Mumbai availability dropped 11% (3 technicians absent today).
                      </div>
                    </div>
                    <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                      <strong>2. Emergency Surge</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                        14 additional emergency chiller tickets generated this morning.
                      </div>
                    </div>
                    <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                      <strong>3. Certification Constraints</strong>
                      <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
                        6 technicians unavailable for high-voltage and cleanroom work.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="response-section-title">Quantified Business Impact</div>
                  <div style={{ display: 'flex', gap: 16, padding: '8px 12px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                    <span>Work Orders at Risk: <strong className="num">12 Orders (4 Critical)</strong></span>
                    <span>•</span>
                    <span>Affected Customers: <strong className="num">4 Key Accounts</strong></span>
                    <span>•</span>
                    <span>Financial Penalty Exposure: <strong className="num" style={{ color: '#DC2626' }}>₹8.4L</strong></span>
                  </div>
                </div>

                <div>
                  <div className="response-section-title">Recommended Executive Actions</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      className="btn-secondary"
                      onClick={() => openWorkOrder('wo-8921')}
                    >
                      Review Affected Work Orders (12) →
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => handleAsk('What happens if we hire 5 technicians?')}
                    >
                      Run Hiring Capacity Simulation →
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => openHiringModal()}
                    >
                      Create HR Hiring Request →
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* If Simulation inquiry */}
            {simulationResult && (
              <>
                <div className="simulation-banner">
                  <div className="simulation-disclaimer">
                    <Zap size={14} />
                    <span>ILLUSTRATIVE SIMULATION ENGINE • WORKFORCE TO REVENUE MODEL</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#166534', lineHeight: 1.4 }}>
                    Simulating impact of onboarding <strong>{simulationCount} additional Senior Field Technicians</strong> to the Mumbai Field Operations Hub.
                  </p>
                </div>

                {/* Simulation Control Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Adjust Simulated Headcount:</span>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={simulationCount}
                    onChange={(e) => handleSimulateChange(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--brand-primary)' }}
                  />
                  <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, width: 60, textAlign: 'right' }}>
                    +{simulationCount} Techs
                  </span>
                </div>

                {/* Simulation Matrix Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Workforce Capacity</div>
                    <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 2 }}>
                      +{simulationResult.capacityGainPct}% Gain
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Mumbai available: {simulationResult.projectedMumbaiCapacity.projectedAvailable} / {simulationResult.projectedMumbaiCapacity.required}</div>
                  </div>

                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimated Hiring Cost</div>
                    <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
                      {simulationResult.estimatedMonthlyHiringCost}/mo
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Avg ₹65K / technician</div>
                  </div>

                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Projected SLA Delivery</div>
                    <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--status-healthy-dot)', marginTop: 2 }}>
                      97.0% (Target: 96%)
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--status-healthy-text)' }}>+{simulationResult.slaImprovementPct}% improvement</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Work Orders Stabilized:</span>
                    <strong className="num" style={{ marginLeft: 6 }}>{simulationResult.workOrdersStabilized} open tickets</strong>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Contract Risk Mitigated:</span>
                    <strong style={{ marginLeft: 6, color: 'var(--status-healthy-text)' }}>{simulationResult.contractRiskMitigated}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                  <button
                    className="btn-primary"
                    onClick={() =>
                      openHiringModal({
                        requiredCount: simulationCount,
                        title: 'Senior Field Technician - Industrial HVAC',
                        reason: `Simulated hiring of ${simulationCount} technicians to eliminate the Mumbai workforce deficit and recover SLA compliance to 97%.`,
                      })
                    }
                  >
                    <Users size={14} />
                    Create Hiring Request for {simulationCount} Technicians →
                  </button>
                </div>
              </>
            )}

            {/* If Workforce Capacity question */}
            {activeQuestion.includes('short on workforce') && (
              <>
                <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                  Workforce deficit is concentrated in <strong>Field Operations (Mumbai Hub)</strong>:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 12 }}>
                  <div style={{ padding: '8px 10px', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-xs)', border: '1px solid #FECACA' }}>
                    <strong style={{ color: '#991B1B' }}>Field Operations (Mumbai)</strong>
                    <div style={{ marginTop: 2 }}>Required: 84 • Available: 71 (<span style={{ color: '#DC2626', fontWeight: 700 }}>-13 Gap</span>)</div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <strong>Engineering (Pune)</strong>
                    <div style={{ marginTop: 2 }}>Required: 42 • Available: 40 (<span style={{ color: '#D97706', fontWeight: 700 }}>-2 Gap</span>)</div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <strong>Customer Support (BLR)</strong>
                    <div style={{ marginTop: 2 }}>Required: 28 • Available: 31 (<span style={{ color: '#16A34A', fontWeight: 700 }}>+3 Buffer</span>)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn-primary"
                    onClick={() => openHiringModal()}
                  >
                    Create Field Operations Requisition →
                  </button>
                </div>
              </>
            )}

            {/* If Customers question */}
            {activeQuestion.includes('customers') && (
              <>
                <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                  <strong>4 Enterprise Customers</strong> currently require executive oversight:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                  <div style={{ padding: '8px 10px', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-xs)', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>1. Meridian Healthcare:</strong> 89% SLA (Critical cleanroom differential pressure)</span>
                    <button className="btn-secondary" style={{ padding: '2px 6px', fontSize: 11 }} onClick={() => openCustomer('cust-104')}>Inspect</button>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: '#FFFBEB', borderRadius: 'var(--radius-xs)', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>2. Acme Industries:</strong> 91% SLA (3 work orders on Chiller Unit 2)</span>
                    <button className="btn-secondary" style={{ padding: '2px 6px', fontSize: 11 }} onClick={() => openCustomer('cust-101')}>Inspect</button>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: '#FFFBEB', borderRadius: 'var(--radius-xs)', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>3. Vertex Properties:</strong> 93% SLA (Overdue hydronic pump maintenance)</span>
                    <button className="btn-secondary" style={{ padding: '2px 6px', fontSize: 11 }} onClick={() => openCustomer('cust-103')}>Inspect</button>
                  </div>
                </div>
              </>
            )}

            {/* General query */}
            {!activeQuestion.includes('SLA') && !simulationResult && !activeQuestion.includes('workforce') && !activeQuestion.includes('customers') && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Company operations are running at <strong>94.2% SLA compliance</strong> across 86 enterprise accounts. Month-to-date revenue is at <strong>₹48.6L</strong> (+8.4% YoY). Primary operational focus remains stabilizing the 13-technician capacity deficit in Mumbai Field Hub.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
