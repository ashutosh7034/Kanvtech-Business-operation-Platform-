import React, { useState, useEffect } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { X, CheckCircle2, UserPlus } from 'lucide-react';

export const HiringRequestModal: React.FC = () => {
  const { activeDrawer, prefilledRequisition, closeAll } = useModalDrawer();
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Field Operations');
  const [location, setLocation] = useState('Mumbai');
  const [requiredCount, setRequiredCount] = useState(5);
  const [priority, setPriority] = useState<'critical' | 'high' | 'medium'>('critical');
  const [reason, setReason] = useState('');
  const [skills, setSkills] = useState('HVAC Industrial Level III, Chiller Plant Operations, Preventive Maintenance');
  const [submitted, setSubmitted] = useState(false);

  const isOpen = activeDrawer === 'hiringModal';

  useEffect(() => {
    if (prefilledRequisition) {
      setTitle(prefilledRequisition.title);
      setDepartment(prefilledRequisition.department);
      setLocation(prefilledRequisition.location);
      setRequiredCount(prefilledRequisition.requiredCount);
      setPriority(prefilledRequisition.priority);
      setReason(prefilledRequisition.reason);
      setSkills(prefilledRequisition.skillsRequired.join(', '));
      setSubmitted(false);
    }
  }, [prefilledRequisition, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    DataService.createRecruitmentJob({
      title,
      department,
      location,
      requiredCount,
      priority,
      status: 'open',
      reason,
      skillsRequired: skills.split(',').map((s) => s.trim()),
    });
    setSubmitted(true);
    setTimeout(() => {
      closeAll();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={closeAll}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserPlus size={18} style={{ color: 'var(--brand-primary)' }} />
            <h3 className="modal-title">Create Executive Hiring Requisition</h3>
          </div>
          <button onClick={closeAll} className="header-action-btn" style={{ width: 26, height: 26 }}>
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <CheckCircle2 size={44} style={{ color: 'var(--status-healthy-dot)', margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
              Requisition Successfully Published
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
              Job opening for <strong>{requiredCount}x {title}</strong> has been routed to HR Recruitment Pipeline (Priya Nair).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-secondary)' }}>
                <strong>Operational Connection:</strong> This requisition will automatically link field technician capacity to active customer SLAs and work order throughput.
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  Job Position Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', fontSize: 13, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="Field Operations">Field Operations</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                    Location Hub
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                    Headcount Needed
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={requiredCount}
                    onChange={(e) => setRequiredCount(Number(e.target.value))}
                    style={{ width: '100%', padding: '6px 10px', fontSize: 13, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  Business Justification & Capacity Reason
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', fontSize: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-subtle)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  Required Skills & Certifications (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', fontSize: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={closeAll}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm & Create Requisition
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
