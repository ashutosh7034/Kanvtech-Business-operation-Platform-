import React from 'react';
import { Lock } from 'lucide-react';

interface PayrollRecord {
  id: string;
  code: string;
  name: string;
  department: string;
  location: string;
  gross: string;
  overtime: string;
  deductions: string;
  net: string;
  status: string;
}

const MOCK_PAYROLL_RECORDS: PayrollRecord[] = [
  { id: '1', code: 'EMP-4012', name: 'Amit Sharma', department: 'Field Operations', location: 'Mumbai', gross: '₹68,500', overtime: '₹14,200', deductions: '₹8,200', net: '₹74,500', status: 'Approved' },
  { id: '2', code: 'EMP-4015', name: 'Rajesh Kumar', department: 'Field Operations', location: 'Mumbai', gross: '₹62,000', overtime: '₹11,800', deductions: '₹7,400', net: '₹66,400', status: 'Approved' },
  { id: '3', code: 'EMP-4019', name: 'Suresh Patil', department: 'Field Operations', location: 'Mumbai', gross: '₹58,000', overtime: '₹9,600', deductions: '₹6,900', net: '₹60,700', status: 'Approved' },
  { id: '4', code: 'EMP-4022', name: 'Vikram Joshi', department: 'Field Operations', location: 'Pune', gross: '₹64,000', overtime: '₹4,200', deductions: '₹7,600', net: '₹60,600', status: 'Approved' },
  { id: '5', code: 'EMP-4031', name: 'Karthik Raman', department: 'Engineering', location: 'Bengaluru', gross: '₹95,000', overtime: '₹0', deductions: '₹14,200', net: '₹80,800', status: 'Approved' },
  { id: '6', code: 'EMP-4045', name: 'Neha Deshmukh', department: 'Customer Support', location: 'Pune', gross: '₹48,000', overtime: '₹1,500', deductions: '₹5,800', net: '₹43,700', status: 'Approved' },
  { id: '7', code: 'EMP-4052', name: 'Ananya Roy', department: 'Sales & Accounts', location: 'Mumbai', gross: '₹82,000', overtime: '₹0', deductions: '₹11,500', net: '₹70,500', status: 'Approved' },
  { id: '8', code: 'EMP-4061', name: 'Deepak Verma', department: 'Field Operations', location: 'Delhi NCR', gross: '₹56,000', overtime: '₹3,400', deductions: '₹6,700', net: '₹52,700', status: 'Approved' },
];

export const PayrollOverviewPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Payroll &gt; Executive Disbursement &amp; Statutory Compliance</div>
          <h1 className="greeting-title">Payroll</h1>
          <p className="greeting-subtitle">
            September 2026 disbursement register · 428 employees · Gross run-rate ₹1.82 Cr
          </p>
        </div>
      </div>

      {/* RBAC Notice */}
      <div style={{ padding: '8px 12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Lock size={13} style={{ color: 'var(--brand-primary)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          <strong>Executive Access Level:</strong> RBAC authorized for Head of People. Statutory remittance: 100% PF & ESIC compliant.
        </span>
      </div>

      {/* Payroll Summary Strip */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Gross Payroll</span>
          <span className="ops-summary-val">₹1.82 Cr</span>
          <span className="ops-summary-sub">September 2026</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Total Employees</span>
          <span className="ops-summary-val">428</span>
          <span className="ops-summary-sub">5 Regional Hubs</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-attention-dot)' }}>Overtime Payout</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>₹14.6L</span>
          <span className="ops-summary-sub">312 Field Hours</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Statutory Remittance</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>100%</span>
          <span className="ops-summary-sub">PF / ESIC cleared</span>
        </div>
      </div>

      {/* Payroll Register Table */}
      <div className="section-panel">
        <div className="section-panel-header">
          <span className="section-panel-title">Payroll Register — September 2026</span>
        </div>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Employee & ID</th>
              <th>Department</th>
              <th>Location</th>
              <th>Base Gross</th>
              <th>Overtime</th>
              <th>Deductions</th>
              <th>Net Payout</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYROLL_RECORDS.map((rec) => (
              <tr key={rec.id}>
                <td>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="font-mono" style={{ fontWeight: 600 }}>{rec.code}</span>
                      <span style={{ fontWeight: 600 }}>· {rec.name}</span>
                    </div>
                  </div>
                </td>
                <td>{rec.department}</td>
                <td>{rec.location}</td>
                <td>{rec.gross}</td>
                <td style={{ color: rec.overtime !== '₹0' ? 'var(--status-attention-dot)' : 'inherit', fontWeight: rec.overtime !== '₹0' ? 600 : 400 }}>
                  {rec.overtime}
                </td>
                <td>{rec.deductions}</td>
                <td style={{ fontWeight: 600 }}>{rec.net}</td>
                <td>
                  <span className="status-indicator">
                    <span className="status-dot healthy" />
                    <span>{rec.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
