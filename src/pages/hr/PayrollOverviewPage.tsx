import React, { useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { PayrollTrendChart } from '../../components/charts/PayrollTrendChart';

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
  { id: '1', code: 'EMP-10204', name: 'Neha Kulkarni', department: 'Field Operations', location: 'Mumbai', gross: '₹1,45,000', overtime: '₹18,500', deductions: '₹22,400', net: '₹1,41,100', status: 'Approved' },
  { id: '2', code: 'EMP-10640', name: 'Priya Nair', department: 'Human Resources', location: 'Mumbai', gross: '₹1,20,000', overtime: '₹0', deductions: '₹18,200', net: '₹1,01,800', status: 'Approved' },
  { id: '3', code: 'EMP-10512', name: 'Rahul Mehta', department: 'Engineering', location: 'Pune', gross: '₹95,000', overtime: '₹6,400', deductions: '₹14,800', net: '₹86,600', status: 'Approved' },
  { id: '4', code: 'EMP-10482', name: 'Amit Sharma', department: 'Field Operations', location: 'Mumbai', gross: '₹78,000', overtime: '₹14,200', deductions: '₹11,600', net: '₹80,600', status: 'Approved' },
  { id: '5', code: 'EMP-10822', name: 'Sneha Patil', department: 'Customer Support', location: 'Bengaluru', gross: '₹72,000', overtime: '₹2,400', deductions: '₹9,800', net: '₹64,600', status: 'Approved' },
  { id: '6', code: 'EMP-10711', name: 'Vikram Deshmukh', department: 'Field Operations', location: 'Mumbai', gross: '₹62,000', overtime: '₹12,800', deductions: '₹8,400', net: '₹66,400', status: 'Approved' },
  { id: '7', code: 'EMP-10944', name: 'Karthik Raman', department: 'Engineering', location: 'Bengaluru', gross: '₹88,000', overtime: '₹0', deductions: '₹13,200', net: '₹74,800', status: 'Approved' },
  { id: '8', code: 'EMP-11012', name: 'Deepak Verma', department: 'Field Operations', location: 'Delhi NCR', gross: '₹58,000', overtime: '₹5,800', deductions: '₹7,600', net: '₹56,200', status: 'Approved' },
];

export const PayrollOverviewPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = MOCK_PAYROLL_RECORDS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Payroll &gt; Payroll Processing, Compensation &amp; Workforce Cost</div>
          <h1 className="greeting-title">Payroll Operations</h1>
          <p className="greeting-subtitle">
            September 2026 disbursement register · 428 employees · Gross run-rate ₹1.82 Cr · 100% statutory compliant
          </p>
        </div>
      </div>

      {/* RBAC Notice */}
      <div style={{ padding: '8px 12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Lock size={13} style={{ color: 'var(--brand-primary)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            <strong>Executive Access Level:</strong> Authorized for Head of People &amp; CFO. All statutory deductions (PF, ESIC, TDS) reconciled.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--status-healthy-dot)', fontWeight: 600 }}>
          <ShieldCheck size={13} />
          <span>Statutory Audit Cleared</span>
        </div>
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label">TOTAL HEADCOUNT</div>
          <div className="brief-val">428</div>
          <div className="brief-sub">100% payroll covered</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">GROSS PAYROLL</div>
          <div className="brief-val">₹1.82 Cr</div>
          <div className="brief-sub" style={{ color: 'var(--brand-primary)' }}>+3.1% vs last month</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">TOTAL DEDUCTIONS</div>
          <div className="brief-val">₹32.8 L</div>
          <div className="brief-sub">PF, ESIC, TDS &amp; Adv</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">NET DISBURSEMENT</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>₹1.49 Cr</div>
          <div className="brief-sub">Bank direct transfer</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">PROCESSING STATUS</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>100%</div>
          <div className="brief-sub">Data verified &amp; locked</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">DISBURSEMENT DATE</div>
          <div className="brief-val">25 Sep 2026</div>
          <div className="brief-sub">Scheduled release</div>
        </div>
      </div>

      {/* Row 1: Trend & Component Breakdowns */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Monthly Payroll Trend (Gross vs Net)</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Apr 2026 – Sep 2026</span>
          </div>
          <PayrollTrendChart height={190} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Salary Component Breakdown (Gross ₹1.82 Cr)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {[
              { label: 'Basic Salary', pct: 42, val: '₹76.4 L', color: '#0F766E' },
              { label: 'House Rent Allowance (HRA)', pct: 20, val: '₹36.4 L', color: '#17202A' },
              { label: 'Special Allowance', pct: 15, val: '₹27.3 L', color: '#5F6B76' },
              { label: 'Field Conveyance & Logistics', pct: 7, val: '₹12.7 L', color: '#8898AA' },
              { label: 'Medical & Health Allowance', pct: 5, val: '₹9.1 L', color: '#A0AEC0' },
              { label: 'Performance Bonus & Overtime', pct: 11, val: '₹20.1 L', color: '#CBD5E1' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.pct}% ({item.val})</span>
                </div>
                <div style={{ width: '100%', height: 5, backgroundColor: 'var(--bg-subtle)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Department Cost & Processing Milestones */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Headcount vs Payroll Cost by Department</span>
          </div>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Headcount</th>
                <th>Monthly Gross</th>
                <th>Overtime Share</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Field Operations</td>
                <td>184 staff</td>
                <td style={{ fontWeight: 600 }}>₹68.5 L</td>
                <td style={{ color: 'var(--status-attention-dot)', fontWeight: 600 }}>₹11.4 L (78%)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Engineering &amp; Automation</td>
                <td>76 staff</td>
                <td style={{ fontWeight: 600 }}>₹42.0 L</td>
                <td>₹1.8 L (12%)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Sales &amp; Enterprise Accounts</td>
                <td>54 staff</td>
                <td style={{ fontWeight: 600 }}>₹28.5 L</td>
                <td>₹0 (0%)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Customer Support</td>
                <td>48 staff</td>
                <td style={{ fontWeight: 600 }}>₹18.2 L</td>
                <td>₹0.8 L (5%)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Administration, Finance &amp; HR</td>
                <td>66 staff</td>
                <td style={{ fontWeight: 600 }}>₹24.8 L</td>
                <td>₹0.6 L (4%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Processing Tracker & What Needs Attention */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Processing Lifecycle &amp; Audit Notes</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>DATA LOCK</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>✓ 22 Sep</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PROCESSING</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>✓ 23 Sep</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>VERIFICATION</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>✓ 24 Sep</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PAYSLIP RELEASE</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)' }}>● 25 Sep</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--text-primary)' }}>
                Field Operations Overtime Burden: ₹14.6 L (312 hours)
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Overtime incurred primarily in Mumbai Central Hub due to -13 technician staffing deficit.
              </p>
            </div>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--status-healthy-dot)' }}>
                Statutory Remittances: 100% Cleared
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                EPFO (₹14.2L) and ESIC (₹4.8L) reconciliation files ready for auto-debit on 26 Sep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Master Payroll Register Table */}
      <div className="section-panel">
        <div className="section-panel-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="section-panel-title">Payroll Disbursement Register — September 2026</span>
          <input
            type="text"
            placeholder="Filter payroll records by name, ID, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '4px 10px',
              fontSize: 12,
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              width: 260,
              backgroundColor: 'var(--bg-surface)',
            }}
          />
        </div>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Employee &amp; ID</th>
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
            {filteredRecords.map((rec) => (
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
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{rec.net}</td>
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
