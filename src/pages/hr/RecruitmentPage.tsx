import React, { useState } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { MOCK_CANDIDATES } from '../../data/mockData';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RecruitmentJob, Candidate } from '../../types';
import { UserPlus, Star, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export const RecruitmentPage: React.FC = () => {
  const { openHiringModal } = useModalDrawer();
  const recruitmentJobs = DataService.getRecruitmentJobs();
  const [activeTab, setActiveTab] = useState<'positions' | 'pipeline'>('positions');

  const jobColumns: Column<RecruitmentJob>[] = [
    {
      key: 'title',
      header: 'Requisition Title',
      sortable: true,
      render: (job) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Posted: {job.postedDate}</div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department & Hub',
      sortable: true,
      render: (job) => <span>{job.department} ({job.location})</span>,
    },
    {
      key: 'requiredCount',
      header: 'Openings',
      sortable: true,
      render: (job) => <span style={{ fontWeight: 600 }}>{job.requiredCount}</span>,
    },
    {
      key: 'currentApplicants',
      header: 'Applicant Funnel',
      sortable: true,
      render: (job) => (
        <span>
          {job.currentApplicants} applied · {job.interviews} interviews · {job.offers} offers
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (job) => <StatusBadge status={job.priority} />,
    },
    {
      key: 'reason',
      header: 'Operational Reason',
      render: (job) => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{job.reason}</span>,
    },
  ];

  const candidateColumns: Column<Candidate>[] = [
    {
      key: 'name',
      header: 'Candidate Name',
      sortable: true,
      render: (c) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.currentCompany}</div>
        </div>
      ),
    },
    {
      key: 'jobTitle',
      header: 'Applied Position',
      sortable: true,
    },
    {
      key: 'experienceYears',
      header: 'Experience',
      sortable: true,
      render: (c) => <span>{c.experienceYears} Years</span>,
    },
    {
      key: 'rating',
      header: 'Technical Rating',
      sortable: true,
      render: (c) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
          <Star size={12} style={{ fill: '#F59E0B', color: '#F59E0B' }} /> {c.rating} / 5.0
        </span>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      sortable: true,
      render: (c) => <StatusBadge status={c.stage} />,
    },
    {
      key: 'email',
      header: 'Contact',
      render: (c) => <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.email}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <div className="section-breadcrumb">Recruitment &gt; Hiring Pipeline, Workforce Demand &amp; Recruitment Performance</div>
          <h1 className="greeting-title">Recruitment Operations</h1>
          <p className="greeting-subtitle">
            14 open positions · 4 critical field requisitions · 182 active candidates across 5 regional hubs
          </p>
        </div>
        <button className="btn-primary" onClick={() => openHiringModal()}>
          <UserPlus size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          <span>Create Requisition</span>
        </button>
      </div>

      {/* 6-Card Metric Strip */}
      <div className="executive-brief-strip six-col">
        <div className="brief-cell">
          <div className="brief-label" style={{ color: 'var(--status-critical-dot)' }}>OPEN POSITIONS</div>
          <div className="brief-val" style={{ color: 'var(--status-critical-dot)' }}>14</div>
          <div className="brief-sub">4 critical Field Ops</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">APPLICATIONS</div>
          <div className="brief-val">182</div>
          <div className="brief-sub">Across 5 hubs</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">IN PROCESS</div>
          <div className="brief-val">36</div>
          <div className="brief-sub">12 in technical review</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">OFFERS EXTENDED</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>9</div>
          <div className="brief-sub">2 accepted this week</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">AVG TIME TO HIRE</div>
          <div className="brief-val">24 Days</div>
          <div className="brief-sub" style={{ color: 'var(--status-healthy-dot)' }}>-4 days vs benchmark</div>
        </div>
        <div className="brief-cell">
          <div className="brief-label">OFFER ACCEPTANCE</div>
          <div className="brief-val" style={{ color: 'var(--status-healthy-dot)' }}>88.5%</div>
          <div className="brief-sub">Target &ge; 85%</div>
        </div>
      </div>

      {/* Row 1: Funnel & Department Positions */}
      <div className="two-col-grid">
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">Hiring Funnel Conversion</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>182 Applicants &rarr; 7 Hires</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
            {[
              { stage: '1. Applied / Inflow', count: 182, pct: 100, color: '#17202A' },
              { stage: '2. Screened & Qualified', count: 84, pct: 46.2, color: '#0F766E' },
              { stage: '3. Technical Interview', count: 36, pct: 19.8, color: '#5F6B76' },
              { stage: '4. Executive Offer Stage', count: 9, pct: 4.9, color: '#8898AA' },
              { stage: '5. Joined / Onboarded', count: 7, pct: 3.8, color: '#0F766E' },
            ].map((item) => (
              <div key={item.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 2 }}>
                  <span style={{ fontWeight: 500 }}>{item.stage}</span>
                  <span style={{ fontWeight: 600 }}>{item.count} candidates ({item.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: 6, backgroundColor: 'var(--bg-subtle)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source of Hire & Attention */}
        <div className="section-panel">
          <div className="section-panel-header">
            <span className="section-panel-title">What Needs Attention</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Staffing Velocity</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-critical-dot)' }}>
                <AlertCircle size={13} />
                <span>Urgent: 4 HVAC Technicians for Mumbai Hub</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Requisitions open for 18 days. 6 candidates screened, 2 technical tests scheduled for tomorrow.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--status-healthy-dot)' }}>
                <CheckCircle2 size={13} />
                <span>Engineering Lead Candidate Accepted Offer</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Karthik Raman joining Bengaluru engineering team on Oct 05. Background verification cleared.
              </p>
            </div>

            <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 12, color: 'var(--brand-primary)' }}>
                <TrendingUp size={13} />
                <span>Employee Referral Drive Contributing 26% of Pipeline</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Referral bonuses scheduled for disbursement in next month's payroll cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          className={`filter-period-btn ${activeTab === 'positions' ? 'active' : ''}`}
          style={{ padding: '6px 12px', border: '1px solid var(--border-subtle)' }}
          onClick={() => setActiveTab('positions')}
        >
          Active Requisitions ({recruitmentJobs.length})
        </button>
        <button
          className={`filter-period-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
          style={{ padding: '6px 12px', border: '1px solid var(--border-subtle)' }}
          onClick={() => setActiveTab('pipeline')}
        >
          Candidate Pipeline ({MOCK_CANDIDATES.length})
        </button>
      </div>

      {activeTab === 'positions' ? (
        <DataTable
          title="Active Requisitions Queue"
          data={recruitmentJobs}
          columns={jobColumns}
          keyExtractor={(j) => j.id}
          searchPlaceholder="Filter positions by title, department, priority..."
        />
      ) : (
        <DataTable
          title="Candidate Pipeline Register"
          data={MOCK_CANDIDATES}
          columns={candidateColumns}
          keyExtractor={(c) => c.id}
          searchPlaceholder="Filter candidates by name, position, stage..."
        />
      )}
    </div>
  );
};
