import React from 'react';
import { useFilters } from '../../context/FilterContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { FilterBar } from '../../components/common/FilterBar';
import { HeadcountTrendChart } from '../../components/charts/HeadcountTrendChart';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Employee } from '../../types';
import { Users, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

export const PeopleDirectoryPage: React.FC = () => {
  const { location, department } = useFilters();
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees(location, department);

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee Name & ID',
      sortable: true,
      render: (emp) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.code}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>· {emp.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.role}</div>
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
      header: 'Regional Hub',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (emp) => <StatusBadge status={emp.status} />,
    },
    {
      key: 'workloadTasks',
      header: 'Active Tasks',
      sortable: true,
      render: (emp) => (
        <span>
          {emp.workloadTasks} tasks {emp.slaRiskCount > 0 && <span style={{ color: 'var(--status-critical-dot)', fontWeight: 600 }}>({emp.slaRiskCount} at risk)</span>}
        </span>
      ),
    },
    {
      key: 'performanceScore',
      header: 'Performance Rating',
      sortable: true,
      render: (emp) => <span style={{ fontWeight: 600 }}>{emp.performanceScore}%</span>,
    },
    {
      key: 'certifications',
      header: 'Primary Certification',
      render: (emp) => (
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          {emp.certifications[0] || 'Standard Qualified'}
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">People &gt; Workforce Structure, Movement &amp; Demographics</div>
          <h1 className="greeting-title">People &amp; Workforce Analytics</h1>
          <p className="greeting-subtitle">
            428 total employees · 397 active on duty · 48 new joiners YTD · 3.4 yrs average tenure across 5 regional operational hubs
          </p>
        </div>
        <FilterBar />
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label">TOTAL WORKFORCE</div>
          <div className="brief-val">428</div>
          <div className="brief-sub">Across 5 hubs</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">NEW JOINERS (YTD)</div>
          <div className="brief-val" style={{ color: 'var(--brand-primary)' }}>48</div>
          <div className="brief-sub">+12.0% vs last year</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">EXITS (YTD)</div>
          <div className="brief-val">16</div>
          <div className="brief-sub" style={{ color: 'var(--status-healthy-dot)' }}>3.7% turnover rate</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">ACTIVE PERSONNEL</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>397</div>
          <div className="brief-sub">92.8% on duty today</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">AVERAGE TENURE</div>
          <div className="brief-val">3.4 Yrs</div>
          <div className="brief-sub">High retention</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">GENDER DIVERSITY</div>
          <div className="brief-val">64% : 36%</div>
          <div className="brief-sub">Male : Female</div>
        </div>
      </div>

      {/* Row 1: Headcount Growth & Department Composition */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Employee Headcount Trend (2026 Progression)</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>385 in Jan &rarr; 428 in Sep (+11.2%)</span>
          </div>
          <HeadcountTrendChart height={180} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Headcount by Department</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
            {[
              { dept: 'Field Operations', count: 184, pct: 43.0, color: '#0F766E' },
              { dept: 'Engineering & Automation', count: 76, pct: 17.8, color: '#17202A' },
              { dept: 'Sales & Enterprise Accounts', count: 54, pct: 12.6, color: '#5F6B76' },
              { dept: 'Customer Support', count: 48, pct: 11.2, color: '#8898AA' },
              { dept: 'Finance & Accounts', count: 34, pct: 7.9, color: '#A0AEC0' },
              { dept: 'Human Resources & Admin', count: 32, pct: 7.5, color: '#CBD5E1' },
            ].map((item) => (
              <div key={item.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ fontWeight: 500 }}>{item.dept}</span>
                  <span style={{ fontWeight: 600 }}>{item.count} staff ({item.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Demographics & What Needs Attention */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Workforce Category &amp; Tenure Distribution</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Permanent</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>78% (334)</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Probation</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>10% (43)</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Contract</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>8% (34)</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Intern / Trainee</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>4% (17)</div>
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
            Tenure Distribution (Years of Service)
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { label: '< 1 Year', pct: 22, color: '#0F766E' },
              { label: '1–3 Years', pct: 34, color: '#17202A' },
              { label: '3–5 Years', pct: 24, color: '#5F6B76' },
              { label: '5–10 Years', pct: 14, color: '#8898AA' },
              { label: '> 10 Years', pct: 6, color: '#CBD5E1' },
            ].map((t) => (
              <div key={t.label} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{t.pct}%</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attention / Findings Panel */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">What Needs Attention</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Workforce Demographics</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-critical-dot)' }}>
                <AlertCircle size={13} />
                <span>Field Operations Technicians: High Utilization (84.5%)</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                184 technicians managing 186 live work orders across 5 hubs. Mumbai field cluster operates at capacity ceiling.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-healthy-dot)' }}>
                <CheckCircle2 size={13} />
                <span>Attrition Remains Controlled at 3.7% Annualized</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Only 16 exits YTD against 48 additions, maintaining a positive net workforce velocity of +32 personnel.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--brand-primary)' }}>
                <TrendingUp size={13} />
                <span>43 Employees Eligible for Probation Confirmation</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Appraisal reviews completed for 39 candidates with 92% recommendation for permanent absorption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Employee Directory Table */}
      <DataTable
        title="Employee Roster Directory"
        data={employees}
        columns={columns}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => openEmployee(item.id)}
        searchPlaceholder="Search employees by name, ID, role, skill..."
        pageSize={10}
      />
    </div>
  );
};
