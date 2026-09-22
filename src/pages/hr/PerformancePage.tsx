import React from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { PerformanceTrendChart } from '../../components/charts/PerformanceTrendChart';
import { RatingDistributionChart } from '../../components/charts/RatingDistributionChart';
import { DataTable, Column } from '../../components/common/DataTable';
import { Employee } from '../../types';
import { CheckCircle2, AlertCircle, TrendingUp, Award } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const { openEmployee } = useModalDrawer();
  const employees = DataService.getEmployees();

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee Name & ID',
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
      key: 'performanceScore',
      header: 'Appraisal Rating',
      sortable: true,
      render: (e) => (
        <span
          style={{
            fontWeight: 600,
            color: e.performanceScore >= 90 ? 'var(--status-healthy-dot)' : e.performanceScore >= 80 ? 'var(--text-primary)' : 'var(--status-critical-dot)',
          }}
        >
          {e.performanceScore}% ({(e.performanceScore / 20).toFixed(1)} / 5.0)
        </span>
      ),
    },
    {
      key: 'workloadTasks',
      header: 'Active Tasks',
      sortable: true,
      render: (e) => <span>{e.workloadTasks} tasks</span>,
    },
    {
      key: 'manager',
      header: 'Reviewing Manager',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Performance &gt; Employee Performance, Goals &amp; Development</div>
          <h1 className="greeting-title">Performance Management</h1>
          <p className="greeting-subtitle">
            87% organizational score · 94.8% review completion · 98 high performers across 5 regional hubs
          </p>
        </div>
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label">TOTAL EMPLOYEES</div>
          <div className="brief-val">428</div>
          <div className="brief-sub">Active appraisals</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">REVIEWS COMPLETED</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>406 (94.8%)</div>
          <div className="brief-sub">+8.3% vs last cycle</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">AVERAGE RATING</div>
          <div className="brief-val" style={{ color: 'var(--brand-primary)' }}>4.1 / 5.0</div>
          <div className="brief-sub">87% baseline score</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">HIGH PERFORMERS</div>
          <div className="brief-val">98 (22.9%)</div>
          <div className="brief-sub">Rating &ge; 4.5</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">DEV PLANS ASSIGNED</div>
          <div className="brief-val">128</div>
          <div className="brief-sub">Active coaching</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">GOAL ACHIEVEMENT</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>78.4%</div>
          <div className="brief-sub">+6.5% vs last cycle</div>
        </div>
      </div>

      {/* Rating Distribution & 5-Year Trend */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Performance Rating Distribution</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>FY 2026-27 Cycle</span>
          </div>
          <RatingDistributionChart height={180} />
        </div>

        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Performance Multi-Year Trajectory</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>FY 2022-23 to Current</span>
          </div>
          <PerformanceTrendChart height={180} />
        </div>
      </div>

      {/* Department-wise Average Ratings & Review Cycle Milestones */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Department-wise Appraisal Averages</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {[
              { dept: 'Field Operations', rating: 4.3, pct: 86, color: '#0F766E' },
              { dept: 'Engineering & Automation', rating: 4.1, pct: 82, color: '#17202A' },
              { dept: 'Customer Support', rating: 4.0, pct: 80, color: '#5F6B76' },
              { dept: 'Human Resources & Admin', rating: 4.2, pct: 84, color: '#8898AA' },
              { dept: 'Finance & Accounts', rating: 3.9, pct: 78, color: '#A0AEC0' },
              { dept: 'Sales & Enterprise Accounts', rating: 4.0, pct: 80, color: '#CBD5E1' },
            ].map((d) => (
              <div key={d.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ fontWeight: 500 }}>{d.dept}</span>
                  <span style={{ fontWeight: 600 }}>{d.rating} / 5.0 ({d.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', backgroundColor: d.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cycle Milestones & Training Focus */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Review Cycle Status &amp; Development Needs</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>GOAL SETTING</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>✓ Jan 2026</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>MID-YEAR REVIEW</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-healthy-dot)' }}>✓ Jun 2026</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>FINAL REVIEW</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-primary)' }}>● Sep (94.8%)</div>
            </div>
            <div style={{ height: 1, width: 24, backgroundColor: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>PUBLISH</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Oct 2026</div>
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
            Training &amp; Development Areas (Identified via Appraisals)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Leadership</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>52 staff</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>HVAC &amp; Technical</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>38 staff</div>
            </div>
            <div style={{ padding: '6px 8px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Client SLA Comms</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>46 staff</div>
            </div>
          </div>
        </div>
      </div>

      {/* Appraisal Scorecards Table */}
      <DataTable
        title="Appraisal Scorecard & Performance Records"
        data={employees}
        columns={columns}
        keyExtractor={(e) => e.id}
        onRowClick={(e) => openEmployee(e.id)}
        searchPlaceholder="Filter appraisal records by employee, role, rating..."
      />
    </div>
  );
};
