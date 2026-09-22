import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { AttendanceTrendChart } from '../../components/charts/AttendanceTrendChart';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataTable, Column } from '../../components/common/DataTable';
import { Employee } from '../../types';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees(location, department);

  const columns: Column<Employee>[] = [
    {
      key: 'code',
      header: 'Employee & ID',
      sortable: true,
      render: (e) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600 }}>{e.code}</span>
            <span style={{ fontWeight: 600 }}>· {e.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.role}</div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'location',
      header: 'Location Hub',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Attendance Today',
      sortable: true,
      render: (e) => <StatusBadge status={e.status} />,
    },
    {
      key: 'manager',
      header: 'Reporting Lead',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Attendance &gt; Attendance, Availability &amp; Workforce Discipline</div>
          <h1 className="greeting-title">Attendance &amp; Availability</h1>
          <p className="greeting-subtitle">
            397 present on duty (92.8%) · 21 approved leave (4.9%) · 10 unplanned absent (2.3%) across 5 regional hubs
          </p>
        </div>
        <FilterBar />
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label">TOTAL WORKFORCE</div>
          <div className="brief-val">428</div>
          <div className="brief-sub">Active roster</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">PRESENT TODAY</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>397 (92.8%)</div>
          <div className="brief-sub">On site across 5 hubs</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label" style={{ color: 'var(--status-critical-dot)' }}>ABSENT TODAY</div>
          <div className="brief-val" style={{ color: 'var(--status-critical-dot)' }}>10 (2.3%)</div>
          <div className="brief-sub">Unplanned field gap</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">ON LEAVE TODAY</div>
          <div className="brief-val">21 (4.9%)</div>
          <div className="brief-sub">Approved PTO</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">WEEK OFF / REST</div>
          <div className="brief-val">0</div>
          <div className="brief-sub">Standard weekday</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label" style={{ color: 'var(--status-attention-dot)' }}>LATE ARRIVALS</div>
          <div className="brief-val" style={{ color: 'var(--status-attention-dot)' }}>14 (3.3%)</div>
          <div className="brief-sub">Avg 18 min delay</div>
        </div>
      </div>

      {/* 7-Day Attendance Trend & Status Breakdown */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Daily Attendance Trend (7-Day Overview)</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Present vs Leave vs Absent</span>
          </div>
          <AttendanceTrendChart height={190} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Department-wise Attendance Delivery (%)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
            {[
              { dept: 'Field Operations', rate: 92.8, onDuty: 171, total: 184, color: '#0F766E' },
              { dept: 'Engineering & Automation', rate: 94.7, onDuty: 72, total: 76, color: '#17202A' },
              { dept: 'Customer Support', rate: 93.8, onDuty: 45, total: 48, color: '#5F6B76' },
              { dept: 'Finance & Accounts', rate: 92.0, onDuty: 23, total: 25, color: '#8898AA' },
              { dept: 'Sales & Enterprise Accounts', rate: 90.7, onDuty: 49, total: 54, color: '#A0AEC0' },
              { dept: 'Human Resources & Admin', rate: 90.2, onDuty: 37, total: 41, color: '#CBD5E1' },
            ].map((item) => (
              <div key={item.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ fontWeight: 500 }}>{item.dept}</span>
                  <span style={{ fontWeight: 600 }}>{item.rate}% ({item.onDuty}/{item.total})</span>
                </div>
                <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.rate}%`, height: '100%', backgroundColor: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Hub Attendance & Late Arrivals / What Needs Attention */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Regional Hub Attendance &amp; Shift Compliance</span>
          </div>
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Regional Hub</th>
                <th>Present</th>
                <th>Leave</th>
                <th>Absent</th>
                <th>Presence Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Mumbai Central Hub</td>
                <td>71</td>
                <td>9</td>
                <td style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>4</td>
                <td style={{ fontWeight: 600 }}>84.5%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Pune Tech Hub</td>
                <td>48</td>
                <td>3</td>
                <td>1</td>
                <td style={{ fontWeight: 600 }}>92.3%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Bengaluru Support Hub</td>
                <td>38</td>
                <td>2</td>
                <td>0</td>
                <td style={{ fontWeight: 600 }}>95.0%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Delhi NCR Hub</td>
                <td>35</td>
                <td>4</td>
                <td>2</td>
                <td style={{ fontWeight: 600 }}>85.4%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Hyderabad Engineering</td>
                <td>25</td>
                <td>1</td>
                <td>0</td>
                <td style={{ fontWeight: 600 }}>96.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Attention Panel */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">What Needs Attention</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Discipline &amp; Punctuality</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-critical-dot)' }}>
                <AlertCircle size={13} />
                <span>Unplanned Field Absences in Mumbai (3 Techs)</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Vikram Deshmukh and 2 HVAC field technicians are absent without prior notice, escalating Acme SLA risk.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-attention-dot)' }}>
                <Clock size={13} />
                <span>14 Late Arrivals Recorded Today</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Average late arrival duration is 18 minutes. 8 occurrences logged in Field Operations morning shift.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-healthy-dot)' }}>
                <CheckCircle2 size={13} />
                <span>Bengaluru &amp; Hyderabad Operating at 95%+ Presence</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                No unplanned absences reported across South regional tech support facilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Employee Presence Table */}
      <DataTable
        title="Employee Presence Roster"
        data={employees}
        columns={columns}
        keyExtractor={(e) => e.id}
        onRowClick={(e) => openEmployee(e.id)}
        searchPlaceholder="Search presence by employee name, status, dept..."
      />
    </div>
  );
};
