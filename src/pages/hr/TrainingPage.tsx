import React from 'react';
import { MOCK_TRAINING_PROGRAMS } from '../../data/mockData';
import { DataTable, Column } from '../../components/common/DataTable';
import { TrainingProgram } from '../../types';

export const TrainingPage: React.FC = () => {
  const columns: Column<TrainingProgram>[] = [
    {
      key: 'title',
      header: 'Training Program',
      sortable: true,
      render: (t) => <strong style={{ color: 'var(--text-primary)' }}>{t.title}</strong>,
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'enrolledCount',
      header: 'Enrolled Staff',
      sortable: true,
      render: (t) => <span>{t.enrolledCount} personnel</span>,
    },
    {
      key: 'completionRate',
      header: 'Completion Rate',
      sortable: true,
      render: (t) => (
        <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>
          {t.completionRate}% ({t.completedCount}/{t.enrolledCount})
        </span>
      ),
    },
    {
      key: 'trainer',
      header: 'Lead Instructor',
    },
    {
      key: 'dueDate',
      header: 'Target Completion',
      sortable: true,
      render: (t) => <span style={{ color: 'var(--text-secondary)' }}>{t.dueDate}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Training</h1>
          <p className="greeting-subtitle">
            86% overall training completion rate · 145 active enrolled personnel
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Average Completion</span>
          <span className="ops-summary-val" style={{ color: 'var(--brand-primary)' }}>86%</span>
          <span className="ops-summary-sub">Target: 90%</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Enrolled Personnel</span>
          <span className="ops-summary-val">145</span>
          <span className="ops-summary-sub">3 Active Cohorts</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Cleanroom Safety</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>90%</span>
          <span className="ops-summary-sub">38 Completed</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">High-Voltage OSHA</span>
          <span className="ops-summary-val">86%</span>
          <span className="ops-summary-sub">30 Completed</span>
        </div>
      </div>

      {/* Table */}
      <DataTable
        title="Technical & Safety Training Modules"
        data={MOCK_TRAINING_PROGRAMS}
        columns={columns}
        keyExtractor={(t) => t.id}
        searchPlaceholder="Filter training modules..."
      />
    </div>
  );
};
