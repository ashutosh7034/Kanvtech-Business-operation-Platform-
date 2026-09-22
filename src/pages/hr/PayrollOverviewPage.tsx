import React from 'react';
import { PayrollTrendChart } from '../../components/charts/PayrollTrendChart';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Users,
  Wallet,
  Receipt,
  CreditCard,
  FileCheck,
  CalendarCheck,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const PayrollOverviewPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Context Quote */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Payroll Dashboard</h1>
          <p className="ref-page-subtitle">
            Comprehensive payroll insights for better compensation and cost decisions
          </p>
        </div>
        <div className="ref-quote-box">
          <span className="ref-quote-text">"Accurate Payroll. A Happier Workforce."</span>
          <div className="ref-quote-line" />
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Employees in Payroll */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Users size={16} />
            </div>
            <span className="ref-kpi-label">Total in Payroll</span>
          </div>
          <div className="ref-kpi-val">428</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +2.4%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Gross Salary */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <Wallet size={16} />
            </div>
            <span className="ref-kpi-label">Total Gross Salary</span>
          </div>
          <div className="ref-kpi-val">₹ 1.82 Cr</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +3.1%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 3: Total Deductions */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <Receipt size={16} />
            </div>
            <span className="ref-kpi-label">Total Deductions</span>
          </div>
          <div className="ref-kpi-val">₹ 32.8 L</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -1.8%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 4: Total Net Pay */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <CreditCard size={16} />
            </div>
            <span className="ref-kpi-label">Total Net Pay</span>
          </div>
          <div className="ref-kpi-val">₹ 1.49 Cr</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +3.5%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 5: Payroll Processed */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <FileCheck size={16} />
            </div>
            <span className="ref-kpi-label">Payroll Processed</span>
          </div>
          <div className="ref-kpi-val">100%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context" style={{ fontWeight: 600 }}>428 / 428 Employees</span>
          </div>
        </div>

        {/* Card 6: Payroll Date */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <CalendarCheck size={16} />
            </div>
            <span className="ref-kpi-label">Payroll Date</span>
          </div>
          <div className="ref-kpi-val" style={{ fontSize: 20, paddingTop: 3 }}>25 Sep 2026</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><CheckCircle2 size={13} /> Verified</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Monthly Payroll Trend | Salary Component Breakdown | Deductions Breakdown */}
      <div className="ref-grid-3col">
        {/* Panel 1: Monthly Payroll Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Monthly Payroll Trend</span>
            <span className="ref-panel-meta">Gross vs Net</span>
          </div>
          <PayrollTrendChart height={160} />
        </div>

        {/* Panel 2: Salary Component Breakdown */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Salary Component Breakdown (This Month)</span>
            <span className="ref-panel-meta">₹1.82 Cr Total</span>
          </div>
          <DonutMetricChart
            centerValue="₹ 1.82 Cr"
            centerLabel="Total Gross"
            labels={['Basic (42%)', 'HRA (20%)', 'Special (15%)', 'Conveyance (7%)', 'Medical (5%)', 'Bonus/Other (11%)']}
            data={[76.4, 36.4, 27.3, 12.7, 9.1, 20.1]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA', '#06B6D4', '#EC4899']}
            height={160}
          />
        </div>

        {/* Panel 3: Deductions Breakdown */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Deductions Breakdown (This Month)</span>
            <span className="ref-panel-meta">₹32.8 L Total</span>
          </div>
          <DonutMetricChart
            centerValue="₹ 32.8 L"
            centerLabel="Total Deductions"
            labels={['PF (38%)', 'ESIC (12%)', 'Prof. Tax (8%)', 'TDS (32%)', 'Advances (6%)', 'Other (4%)']}
            data={[12.4, 3.9, 2.6, 10.5, 2.0, 1.4]}
            colors={['#EF4444', '#F59E0B', '#3B82F6', '#9333EA', '#06B6D4', '#94A3B8']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 2: Headcount vs Payroll Cost | Salary Distribution | Payment Mode */}
      <div className="ref-grid-3col">
        {/* Panel 1: Headcount vs Payroll Cost by Department */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Payroll Cost by Department</span>
            <span className="ref-panel-meta">Monthly Gross</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { dept: 'Operations', cost: '₹68.5 L', staff: 184, pct: 100, color: '#3B82F6' },
              { dept: 'Engineering & IT', cost: '₹42.0 L', staff: 76, pct: 61.3, color: '#10B981' },
              { dept: 'Sales & Accounts', cost: '₹28.5 L', staff: 54, pct: 41.6, color: '#F59E0B' },
              { dept: 'Customer Support', cost: '₹18.2 L', staff: 48, pct: 26.5, color: '#9333EA' },
              { dept: 'Administration & HR', cost: '₹24.8 L', staff: 66, pct: 36.2, color: '#EC4899' },
            ].map((d) => (
              <div key={d.dept} className="ref-hbar-row">
                <span className="ref-hbar-label">{d.dept}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                </div>
                <span className="ref-hbar-val">{d.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Salary Distribution */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Salary Distribution (CTC Range)</span>
            <span className="ref-panel-meta">Workforce Share</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { range: '< 3 LPA', pct: 18, color: '#3B82F6' },
              { range: '3 – 5 LPA', pct: 28, color: '#60A5FA' },
              { range: '5 – 8 LPA', pct: 24, color: '#93C5FD' },
              { range: '8 – 12 LPA', pct: 16, color: '#F59E0B' },
              { range: '12 – 20 LPA', pct: 10, color: '#F97316' },
              { range: '> 20 LPA', pct: 4, color: '#EF4444' },
            ].map((s) => (
              <div key={s.range} className="ref-hbar-row">
                <span className="ref-hbar-label">{s.range}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${s.pct * 3}%`, backgroundColor: s.color }} />
                </div>
                <span className="ref-hbar-val">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Payment Mode */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Payment Mode</span>
            <span className="ref-panel-meta">428 Employees</span>
          </div>
          <DonutMetricChart
            centerValue="428"
            centerLabel="Employees"
            labels={['Bank Transfer (98%)', 'Cheque (1%)', 'Cash (1%)']}
            data={[420, 4, 4]}
            colors={['#10B981', '#3B82F6', '#F59E0B']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 3: Payroll Processing Status | Top 5 Earners Table | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Payroll Processing Status */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Payroll Processing Status</span>
            <span className="ref-panel-meta">Sep 2026 Cycle</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0', marginTop: 10 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>1. DATA LOCK</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>✓ 22 Sep</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>2. PROCESSING</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>✓ 23 Sep</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>3. VERIFY</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A' }}>✓ 24 Sep</div>
            </div>
            <div style={{ height: 1, width: 20, backgroundColor: '#E2E8F0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 9.5, color: '#64748B' }}>4. PAYSLIP</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB' }}>● 25 Sep</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>Statutory PF &amp; ESIC</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>100% Cleared</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: '#F8FAFC', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 10, color: '#64748B' }}>Audit Status</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>Zero Exceptions</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Top 5 Employees by Gross Salary */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top 5 Employees by Gross Salary</span>
            <span className="ref-panel-meta">Executive Roster</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Gross Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rajesh Verma', dept: 'Management', gross: '4,85,000' },
                { name: 'Priya Nair', dept: 'Human Resources', gross: '3,75,000' },
                { name: 'Neha Kulkarni', dept: 'Operations', gross: '3,20,000' },
                { name: 'Rahul Mehta', dept: 'Engineering', gross: '2,95,000' },
                { name: 'Rohan Iyer', dept: 'Customer Support', gross: '2,80,000' },
              ].map((emp, idx) => (
                <tr key={emp.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{emp.name}</td>
                  <td>{emp.dept}</td>
                  <td style={{ fontWeight: 700, color: '#2563EB' }}>₹{emp.gross}</td>
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
            <span>Total payroll cost increased by 3.1% compared with last month due to new joiners.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Net pay increased by 3.5% aligned with quarterly merit revisions.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Statutory deductions (PF, ESIC, TDS) are 100% reconciled and within expected range.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>98% of total workforce is disbursed via direct corporate bank transfer.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Payroll processing completed successfully with zero pending audit exceptions.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>No critical payroll disbursement delays or discrepancies flagged.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
