import React, { useState } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { MOCK_CANDIDATES } from '../../data/mockData';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RecruitmentJob, Candidate } from '../../types';
import { UserPlus, Star } from 'lucide-react';

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
          <div className="section-breadcrumb">Recruitment &gt; Talent Acquisition &amp; Pipeline</div>
          <h1 className="greeting-title">Recruitment</h1>
          <p className="greeting-subtitle">
            14 open positions · 4 critical field requisitions · 182 active candidates
          </p>
        </div>
        <button className="btn-primary" onClick={() => openHiringModal()}>
          <UserPlus size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
          <span>Create Requisition</span>
        </button>
      </div>

      {/* Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Open Positions</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>14</span>
          <span className="ops-summary-sub">4 critical Field Ops</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Active Applicants</span>
          <span className="ops-summary-val">182</span>
          <span className="ops-summary-sub">Across 5 hubs</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">In Technical Review</span>
          <span className="ops-summary-val">36</span>
          <span className="ops-summary-sub">12 for HVAC</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Offers Extended</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>9</span>
          <span className="ops-summary-sub">2 accepted this week</span>
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
          title="Active Requisitions"
          data={recruitmentJobs}
          columns={jobColumns}
          keyExtractor={(j) => j.id}
          searchPlaceholder="Filter positions by title, department, priority..."
        />
      ) : (
        <DataTable
          title="Candidate Pipeline"
          data={MOCK_CANDIDATES}
          columns={candidateColumns}
          keyExtractor={(c) => c.id}
          searchPlaceholder="Filter candidates by name, position, stage..."
        />
      )}
    </div>
  );
};
