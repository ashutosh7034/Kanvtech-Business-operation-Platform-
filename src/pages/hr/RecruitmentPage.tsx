import React, { useState } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { DonutMetricChart } from '../../components/charts/DonutMetricChart';
import {
  Briefcase,
  Users,
  UserCheck,
  UserPlus,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

export const RecruitmentPage: React.FC = () => {
  const { openHiringModal } = useModalDrawer();
  const recruitmentJobs = DataService.getRecruitmentJobs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Page Header with Context Quote */}
      <div className="ref-page-header">
        <div>
          <h1 className="ref-page-title">Recruitment Dashboard</h1>
          <p className="ref-page-subtitle">
            Hiring pipeline, workforce demand and talent acquisition performance
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn-primary" onClick={() => openHiringModal()} style={{ padding: '6px 12px' }}>
            <UserPlus size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            <span>Create Requisition</span>
          </button>
          <div className="ref-quote-box">
            <span className="ref-quote-text">"Right Talent. Strong Teams. High Growth."</span>
            <div className="ref-quote-line" />
          </div>
        </div>
      </div>

      {/* 6 Soft Tinted KPI Cards Row */}
      <div className="ref-kpi-row">
        {/* Card 1: Total Job Openings */}
        <div className="ref-kpi-card tint-rose">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}>
              <Briefcase size={16} />
            </div>
            <span className="ref-kpi-label">Total Openings</span>
          </div>
          <div className="ref-kpi-val">14</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend down"><ArrowUpRight size={13} /> 4 critical</span>
            <span className="ref-kpi-context">Field Ops roles</span>
          </div>
        </div>

        {/* Card 2: Total Applications */}
        <div className="ref-kpi-card tint-blue">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#2563EB' }}>
              <Users size={16} />
            </div>
            <span className="ref-kpi-label">Total Applications</span>
          </div>
          <div className="ref-kpi-val">182</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +15.6%</span>
            <span className="ref-kpi-context">vs last month</span>
          </div>
        </div>

        {/* Card 3: Candidates in Process */}
        <div className="ref-kpi-card tint-amber">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
              <UserCheck size={16} />
            </div>
            <span className="ref-kpi-label">In Process</span>
          </div>
          <div className="ref-kpi-val">36</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-context">12 in technical review</span>
          </div>
        </div>

        {/* Card 4: Hired YTD */}
        <div className="ref-kpi-card tint-green">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <UserPlus size={16} />
            </div>
            <span className="ref-kpi-label">Hired (YTD)</span>
          </div>
          <div className="ref-kpi-val">48</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +12.0%</span>
            <span className="ref-kpi-context">vs last year</span>
          </div>
        </div>

        {/* Card 5: Average Time to Hire */}
        <div className="ref-kpi-card tint-teal">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(15, 118, 110, 0.15)', color: '#0F766E' }}>
              <Clock size={16} />
            </div>
            <span className="ref-kpi-label">Avg Time to Hire</span>
          </div>
          <div className="ref-kpi-val">24 Days</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowDownRight size={13} /> -4 days</span>
            <span className="ref-kpi-context">vs benchmark (28d)</span>
          </div>
        </div>

        {/* Card 6: Offer Acceptance Rate */}
        <div className="ref-kpi-card tint-purple">
          <div className="ref-kpi-header">
            <div className="ref-kpi-icon" style={{ backgroundColor: 'rgba(147, 51, 234, 0.15)', color: '#9333EA' }}>
              <CheckCircle2 size={16} />
            </div>
            <span className="ref-kpi-label">Offer Acceptance</span>
          </div>
          <div className="ref-kpi-val">88.5%</div>
          <div className="ref-kpi-footer">
            <span className="ref-kpi-trend up"><ArrowUpRight size={13} /> +3.2%</span>
            <span className="ref-kpi-context">vs target (85%)</span>
          </div>
        </div>
      </div>

      {/* ROW 1: Recruitment Funnel | Monthly Hiring Trend | Open Positions by Dept */}
      <div className="ref-grid-3col">
        {/* Panel 1: Recruitment Funnel */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Recruitment Pipeline Funnel</span>
            <span className="ref-panel-meta">182 Applicants</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { stage: '1. Applied / Inflow', count: 182, pct: 100, color: '#3B82F6' },
              { stage: '2. Screened & Qualified', count: 84, pct: 46.2, color: '#10B981' },
              { stage: '3. Technical Interview', count: 36, pct: 19.8, color: '#F59E0B' },
              { stage: '4. Executive Offer', count: 9, pct: 4.9, color: '#9333EA' },
              { stage: '5. Joined / Onboarded', count: 7, pct: 3.8, color: '#0F766E' },
            ].map((s) => (
              <div key={s.stage} className="ref-hbar-row">
                <span className="ref-hbar-label">{s.stage}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
                <span className="ref-hbar-val">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Monthly Hiring Trend */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Monthly Hiring Trend</span>
            <span className="ref-panel-meta">Openings vs Hired</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 140, paddingTop: 20, paddingBottom: 6 }}>
            {[
              { month: 'Apr', open: 12, hired: 9 },
              { month: 'May', open: 15, hired: 11 },
              { month: 'Jun', open: 10, hired: 8 },
              { month: 'Jul', open: 14, hired: 10 },
              { month: 'Aug', open: 16, hired: 12 },
              { month: 'Sep', open: 14, hired: 7 },
            ].map((m) => (
              <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                  <div style={{ width: 10, height: `${m.open * 7}px`, backgroundColor: '#93C5FD', borderRadius: '2px 2px 0 0' }} />
                  <div style={{ width: 10, height: `${m.hired * 7}px`, backgroundColor: '#34D399', borderRadius: '2px 2px 0 0' }} />
                </div>
                <span style={{ fontSize: 9.5, color: '#64748B', marginTop: 4 }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Open Positions by Department */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Open Positions by Department</span>
            <span className="ref-panel-meta">14 Requisitions</span>
          </div>
          <DonutMetricChart
            centerValue="14"
            centerLabel="Open Roles"
            labels={['Field Ops (6)', 'Engineering (4)', 'Support (2)', 'Sales (2)']}
            data={[6, 4, 2, 2]}
            colors={['#EF4444', '#3B82F6', '#10B981', '#F59E0B']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 2: Source of Hire | Time to Hire | Offer Acceptance */}
      <div className="ref-grid-3col">
        {/* Panel 1: Source of Hire */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Source of Hire (Inflow)</span>
            <span className="ref-panel-meta">182 Applicants</span>
          </div>
          <DonutMetricChart
            centerValue="182"
            centerLabel="Applicants"
            labels={['Job Portals (48%)', 'Referrals (26%)', 'Campus (14%)', 'Direct (12%)']}
            data={[88, 47, 25, 22]}
            colors={['#3B82F6', '#10B981', '#F59E0B', '#9333EA']}
            height={160}
          />
        </div>

        {/* Panel 2: Time to Hire by Function */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Average Time to Hire (Days)</span>
            <span className="ref-panel-meta">By Function</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {[
              { func: 'Field Operations', days: 18, pct: 60, color: '#10B981' },
              { func: 'Engineering & IT', days: 28, pct: 93.3, color: '#EF4444' },
              { func: 'Customer Support', days: 16, pct: 53.3, color: '#10B981' },
              { func: 'Sales & Accounts', days: 24, pct: 80, color: '#F59E0B' },
              { func: 'Administration & HR', days: 22, pct: 73.3, color: '#3B82F6' },
            ].map((t) => (
              <div key={t.func} className="ref-hbar-row">
                <span className="ref-hbar-label">{t.func}</span>
                <div className="ref-hbar-track">
                  <div className="ref-hbar-fill" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
                </div>
                <span className="ref-hbar-val">{t.days}d</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Offer Acceptance vs Rejection */}
        <div className="ref-panel">
          <div className="ref-panel-header">
            <span className="ref-panel-title">Offer Acceptance Rate</span>
            <span className="ref-panel-meta">YTD Offers</span>
          </div>
          <DonutMetricChart
            centerValue="88.5%"
            centerLabel="Acceptance"
            labels={['Accepted (88.5%)', 'Declined / Renegotiated (11.5%)']}
            data={[48, 6]}
            colors={['#10B981', '#EF4444']}
            height={160}
          />
        </div>
      </div>

      {/* ROW 3: Top Open Positions | Top Hiring Managers | Key Insights */}
      <div className="ref-grid-3col">
        {/* Panel 1: Top Open Positions */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Open Requisitions</span>
            <span className="ref-panel-meta">Active</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Requisition Title</th>
                <th>Hub</th>
                <th>Req</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {recruitmentJobs.slice(0, 5).map((job, idx) => (
                <tr key={job.id}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{job.title}</td>
                  <td>{job.location}</td>
                  <td style={{ fontWeight: 700 }}>{job.requiredCount}</td>
                  <td style={{ color: '#DC2626', fontWeight: 600 }}>18d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel 2: Top Hiring Managers */}
        <div className="ref-panel" style={{ padding: '12px 14px' }}>
          <div className="ref-panel-header">
            <span className="ref-panel-title">Top Hiring Managers</span>
            <span className="ref-panel-meta">YTD Velocity</span>
          </div>
          <table className="ref-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}>#</th>
                <th>Manager Name</th>
                <th>Department</th>
                <th>Hired Count</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Neha Kulkarni', dept: 'Operations', count: 18 },
                { name: 'Rahul Mehta', dept: 'Engineering', count: 12 },
                { name: 'Rohan Iyer', dept: 'Support', count: 8 },
                { name: 'Priya Nair', dept: 'Human Resources', count: 6 },
                { name: 'Rajesh Verma', dept: 'Leadership', count: 4 },
              ].map((mgr, idx) => (
                <tr key={mgr.name}>
                  <td className="ref-table-rank">{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#0F766E' }}>{mgr.name}</td>
                  <td>{mgr.dept}</td>
                  <td style={{ fontWeight: 700, color: '#2563EB' }}>{mgr.count}</td>
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
            <span>14 active job openings across 5 regional operational hubs.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Application inflow increased by 15.6% vs previous operating month.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Average time to hire improved to 24 days (4 days faster than target).</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Offer acceptance rate maintained at a robust 88.5%.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>Employee referral program contributes 26% of qualified candidates.</span>
          </div>
          <div className="ref-insight-item">
            <CheckCircle2 size={14} className="ref-insight-icon" />
            <span>4 urgent HVAC field roles in Mumbai in final technical evaluation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
