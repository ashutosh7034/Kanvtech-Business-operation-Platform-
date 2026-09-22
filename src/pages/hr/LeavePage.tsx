import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { FilterBar } from '../../components/common/FilterBar';
import { LeaveTrendChart } from '../../components/charts/LeaveTrendChart';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AlertCircle, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface LeaveRequest {
  id: string;
  code: string;
  name: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  approver: string;
}

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: '1', code: 'EMP-10482', name: 'Amit Sharma', department: 'Field Operations', leaveType: 'Privilege Leave (PL)', startDate: '28 Sep 2026', endDate: '30 Sep 2026', days: 3, status: 'pending', approver: 'Neha Kulkarni' },
  { id: '2', code: 'EMP-10711', name: 'Vikram Deshmukh', department: 'Field Operations', leaveType: 'Casual Leave (CL)', startDate: '29 Sep 2026', endDate: '30 Sep 2026', days: 2, status: 'pending', approver: 'Neha Kulkarni' },
  { id: '3', code: 'EMP-10512', name: 'Rahul Mehta', department: 'Engineering', leaveType: 'Sick Leave (SL)', startDate: '22 Sep 2026', endDate: '24 Sep 2026', days: 3, status: 'approved', approver: 'Rajesh Verma' },
  { id: '4', code: 'EMP-10640', name: 'Priya Nair', department: 'Human Resources', leaveType: 'Casual Leave (CL)', startDate: '02 Oct 2026', endDate: '02 Oct 2026', days: 1, status: 'approved', approver: 'Rajesh Verma' },
  { id: '5', code: 'EMP-10822', name: 'Sneha Patil', department: 'Customer Support', leaveType: 'Compensatory Off (CO)', startDate: '25 Sep 2026', endDate: '25 Sep 2026', days: 1, status: 'pending', approver: 'Rohan Iyer' },
  { id: '6', code: 'EMP-10944', name: 'Karthik Raman', department: 'Engineering', leaveType: 'Privilege Leave (PL)', startDate: '05 Oct 2026', endDate: '09 Oct 2026', days: 5, status: 'approved', approver: 'Rahul Mehta' },
];

export const LeavePage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();

  const columns: Column<LeaveRequest>[] = [
    {
      key: 'name',
      header: 'Employee & Code',
      sortable: true,
      render: (r) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600 }}>{r.code}</span>
            <span style={{ fontWeight: 600 }}>· {r.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.department}</div>
        </div>
      ),
    },
    {
      key: 'leaveType',
      header: 'Leave Type',
      sortable: true,
      render: (r) => <span style={{ fontWeight: 500 }}>{r.leaveType}</span>,
    },
    {
      key: 'startDate',
      header: 'From — To',
      render: (r) => (
        <span style={{ fontSize: 12 }}>
          {r.startDate} → {r.endDate} ({r.days} {r.days === 1 ? 'day' : 'days'})
        </span>
      ),
    },
    {
      key: 'approver',
      header: 'Reporting Approver',
      render: (r) => <span style={{ color: 'var(--text-secondary)' }}>{r.approver}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Leave &gt; Leave Balances, Utilization &amp; Approvals</div>
          <h1 className="greeting-title">Leave Management</h1>
          <p className="greeting-subtitle">
            3,842 total leave days taken YTD · 5,210 available balance · 18 pending requests across 5 regional hubs
          </p>
        </div>
        <FilterBar />
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label">TOTAL WORKFORCE</div>
          <div className="brief-val">428</div>
          <div className="brief-sub">5 regional hubs</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">LEAVE TAKEN (YTD)</div>
          <div className="brief-val">3,842</div>
          <div className="brief-sub" style={{ color: 'var(--status-healthy-dot)' }}>-12.6% vs last year</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">AVAILABLE BALANCE</div>
          <div className="brief-val">5,210</div>
          <div className="brief-sub">Avg 12.2 days / emp</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">AVG LEAVE PER EMP</div>
          <div className="brief-val">7.5 Days</div>
          <div className="brief-sub" style={{ color: 'var(--status-healthy-dot)' }}>-10.2% vs last year</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label" style={{ color: 'var(--status-attention-dot)' }}>PENDING REQUESTS</div>
          <div className="brief-val" style={{ color: 'var(--status-attention-dot)' }}>18</div>
          <div className="brief-sub">12 await lead signoff</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">APPROVAL RATE</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>96.4%</div>
          <div className="brief-sub">+2.1% vs last cycle</div>
        </div>
      </div>

      {/* Analytical Grids: Monthly Trend & Leave Type Distribution */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Monthly Leave Trend (Requested vs Approved)</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Jan 2026 – Sep 2026</span>
          </div>
          <LeaveTrendChart height={200} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Leave Type Distribution (YTD 3,842 Days)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {[
              { label: 'Casual Leave (CL)', pct: 34, days: 1306, color: '#0F766E' },
              { label: 'Privilege Leave (PL)', pct: 28, days: 1075, color: '#17202A' },
              { label: 'Sick Leave (SL)', pct: 18, days: 691, color: '#5F6B76' },
              { label: 'Compensatory Off (CO)', pct: 8, days: 307, color: '#8898AA' },
              { label: 'Maternity / Paternity', pct: 8, days: 307, color: '#A0AEC0' },
              { label: 'Leave Without Pay (LWP)', pct: 4, days: 156, color: '#E2E8F0' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.pct}% ({item.days} days)</span>
                </div>
                <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Leave Usage & Top Leave Consumers */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Department Leave Usage &amp; Utilization Rate</span>
          </div>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Leave Taken</th>
                <th>Utilization</th>
                <th>Active on Leave</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Field Operations</td>
                <td>920 days</td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--status-attention-dot)' }}>68%</span>
                </td>
                <td>12 techs</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Sales &amp; Enterprise Accounts</td>
                <td>680 days</td>
                <td>62%</td>
                <td>3 execs</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Engineering &amp; Automation</td>
                <td>520 days</td>
                <td>55%</td>
                <td>2 engineers</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Finance &amp; Accounts</td>
                <td>480 days</td>
                <td>49%</td>
                <td>2 personnel</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Human Resources &amp; Admin</td>
                <td>410 days</td>
                <td>52%</td>
                <td>2 personnel</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Attention / Findings Panel */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title" style={{ color: 'var(--text-primary)' }}>
              What Needs Attention
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Operational &amp; Policy Notes</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-critical-dot)' }}>
                <AlertCircle size={13} />
                <span>Overlapping Mumbai Field Leave (Sep 28–30)</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                4 field technicians in Mumbai hub have pending leave on the same 3-day window during Acme maintenance cycle.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-attention-dot)' }}>
                <Clock size={13} />
                <span>18 Requests Pending &gt; 48 Hours</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Escalated automated reminders to Field Operations lead and Engineering manager.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-healthy-dot)' }}>
                <CheckCircle2 size={13} />
                <span>Overall Annual Leave Consumption Within Policy Bounds</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Average leave taken per employee is 7.5 days vs annual limit of 18 days (41.6% consumed).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Leave Requests Table */}
      <DataTable
        title="Leave Requests Queue"
        data={MOCK_LEAVE_REQUESTS}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Filter leave requests by employee, department, type..."
      />
    </div>
  );
};
