import React, { useState } from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { StatusBadge } from '../common/StatusBadge';
import {
  User,
  Briefcase,
  MapPin,
  Calendar,
  Award,
  AlertTriangle,
  Clock,
  FileCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const EmployeeProfileDrawer: React.FC = () => {
  const { activeDrawer, selectedId, closeAll, openWorkOrder } = useModalDrawer();
  const [activeTab, setActiveTab] = useState<'overview' | 'workload' | 'skills' | 'performance' | 'payroll'>('overview');

  const isOpen = activeDrawer === 'employee';
  const employee = selectedId ? DataService.getEmployeeById(selectedId) || DataService.getEmployeeById('emp-10482') : DataService.getEmployeeById('emp-10482');

  if (!isOpen || !employee) return null;

  const assignedWorkOrders = DataService.getWorkOrdersByEmployee(employee.id);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title={employee.name}
      subtitle={`${employee.role} • ${employee.department} (${employee.location})`}
      width="640px"
    >
      {/* Top Profile Summary Card */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: '14px 16px',
          backgroundColor: 'var(--bg-canvas)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            backgroundColor: 'var(--brand-surface)',
            color: 'var(--brand-primary)',
            border: '2px solid var(--brand-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {employee.name.split(' ').map((n) => n[0]).join('')}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{employee.name}</h3>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>({employee.code})</span>
            <StatusBadge status={employee.status} />
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 12, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Briefcase size={13} style={{ color: 'var(--text-muted)' }} /> {employee.role}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={13} style={{ color: 'var(--text-muted)' }} /> {employee.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <User size={13} style={{ color: 'var(--text-muted)' }} /> Mgr: {employee.manager}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview & Stats
        </button>
        <button
          className={`tab-btn ${activeTab === 'workload' ? 'active' : ''}`}
          onClick={() => setActiveTab('workload')}
        >
          Workload ({assignedWorkOrders.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills & Certifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`tab-btn ${activeTab === 'payroll' ? 'active' : ''}`}
          onClick={() => setActiveTab('payroll')}
        >
          Compensation
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Tasks</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{employee.workloadTasks}</div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>Assigned Work Orders</div>
            </div>
            <div style={{ padding: '10px 12px', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-sm)', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: 11, color: '#991B1B', textTransform: 'uppercase', fontWeight: 600 }}>SLA Risk</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: '#DC2626', marginTop: 2 }}>{employee.slaRiskCount}</div>
              <div style={{ fontSize: 10, color: '#991B1B' }}>Task in critical window</div>
            </div>
            <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Performance</div>
              <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)', marginTop: 2 }}>{employee.performanceScore}%</div>
              <div style={{ fontSize: 10, color: 'var(--text-subtle)' }}>Quarterly Appraisal</div>
            </div>
          </div>

          <div className="enterprise-card">
            <div className="card-header" style={{ padding: '8px 12px' }}>
              <span className="card-title" style={{ fontSize: 12 }}>Employment Metadata</span>
            </div>
            <div className="card-body" style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: 12 }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <strong style={{ marginLeft: 6 }}>{employee.email}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Phone:</span> <strong style={{ marginLeft: 6 }}>{employee.phone}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Joined Date:</span> <strong style={{ marginLeft: 6 }}>{employee.joinedDate}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Reporting Manager:</span> <strong style={{ marginLeft: 6 }}>{employee.manager}</strong></div>
            </div>
          </div>

          {employee.certExpiryDays && employee.certExpiryDays < 30 && (
            <div className="attention-item attention">
              <AlertTriangle size={18} style={{ color: 'var(--status-attention-dot)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: 12, color: 'var(--status-attention-text)' }}>Certification Renewal Imminent</strong>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  HVAC Industrial Level III certification expires in <strong>{employee.certExpiryDays} days</strong>. Recertification is required to maintain compliance for hospital cleanroom work orders.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Workload */}
      {activeTab === 'workload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
            Currently assigned {assignedWorkOrders.length} active work orders in the Mumbai sector:
          </div>

          {assignedWorkOrders.map((wo) => (
            <div
              key={wo.id}
              onClick={() => openWorkOrder(wo.id)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: wo.slaRisk ? '#FEF2F2' : 'var(--bg-canvas)',
                borderLeft: wo.slaRisk ? '3px solid var(--status-critical-dot)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {wo.code}
                  </span>
                  <StatusBadge status={wo.status} />
                </div>
                {wo.slaRisk && (
                  <span className="status-badge critical" style={{ fontSize: 10 }}>
                    {wo.slaRemainingHours}h SLA remaining
                  </span>
                )}
              </div>

              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                {wo.title}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                <span>Customer: <strong>{wo.customerName}</strong></span>
                <span>Due: {wo.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Skills */}
      {activeTab === 'skills' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Verified Technical Competencies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {employee.skills.map((s, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                  }}
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Active Certifications & Credentials
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {employee.certifications.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-canvas)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Award size={16} style={{ color: 'var(--brand-primary)' }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{c}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Issued: National Technical Board</div>
                    </div>
                  </div>
                  {idx === 0 && employee.certExpiryDays ? (
                    <span className="status-badge attention" style={{ fontSize: 10 }}>
                      Expires in {employee.certExpiryDays}d
                    </span>
                  ) : (
                    <span className="status-badge healthy" style={{ fontSize: 10 }}>
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Performance */}
      {activeTab === 'performance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '14px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Overall Quality & SLA Adherence Rating</span>
              <strong className="num" style={{ fontSize: 16, color: 'var(--brand-primary)' }}>87% (Exceeds Expectations)</strong>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ width: '87%', height: '100%', backgroundColor: 'var(--brand-primary)' }} />
            </div>
          </div>

          <div className="enterprise-card">
            <div className="card-header" style={{ padding: '8px 12px' }}>
              <span className="card-title" style={{ fontSize: 12 }}>Q3 Key Performance Goals</span>
            </div>
            <div className="card-body" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>1. First-Time Fix Rate on Chiller Alarms &gt; 85%</span>
                <strong style={{ color: 'var(--status-healthy-text)' }}>91% Achieved</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>2. Emergency SLA Response Time &lt; 2.0 hrs</span>
                <strong style={{ color: 'var(--status-healthy-text)' }}>1.8 hrs Achieved</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>3. Zero Safety Incidents in Cleanroom Environments</span>
                <strong style={{ color: 'var(--status-healthy-text)' }}>100% Compliant</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Payroll */}
      {activeTab === 'payroll' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={15} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              RBAC Protected: Executive & HR compensation view with masked personal identifiers.
            </span>
          </div>

          <div className="enterprise-card">
            <div className="card-body" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Monthly Fixed Gross CTC:</span>
                <strong className="font-mono">{employee.monthlyPayrollMasked}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>Standard Overtime Billing Rate:</span>
                <strong className="font-mono">₹{employee.hourlyRate}/hr</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Month-to-Date Overtime Accrued:</span>
                <strong className="font-mono">18 hrs (₹8,640)</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
