import React from 'react';
import { Drawer } from '../common/Drawer';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { DataService } from '../../data/dataService';
import { StatusBadge } from '../common/StatusBadge';
import { Building, FileText, AlertTriangle, ShieldCheck, UserCheck, Wrench } from 'lucide-react';

export const CustomerDetailDrawer: React.FC = () => {
  const { activeDrawer, selectedId, closeAll, openWorkOrder, openContract, openEmployee } = useModalDrawer();

  const isOpen = activeDrawer === 'customer';
  const customer = selectedId ? DataService.getCustomerById(selectedId) || DataService.getCustomerById('cust-101') : DataService.getCustomerById('cust-101');

  if (!isOpen || !customer) return null;

  const workOrders = DataService.getWorkOrdersByCustomer(customer.id);
  const contract = DataService.getContractById(customer.id);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeAll}
      title={customer.name}
      subtitle={`${customer.industry} • Account Owner: ${customer.accountOwner}`}
      width="640px"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 16px',
          backgroundColor: 'var(--bg-canvas)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>{customer.name}</h3>
            <StatusBadge status={customer.health} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            Location: <strong>{customer.location}</strong> • {customer.activeContractsCount} Active Master Service Agreements
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contract Run-Rate</div>
          <div className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-primary)' }}>
            {customer.contractValue}
          </div>
        </div>
      </div>

      {customer.riskReasons && customer.riskReasons.length > 0 && (
        <div className="attention-item critical" style={{ marginBottom: 16 }}>
          <AlertTriangle size={18} style={{ color: 'var(--status-critical-dot)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ fontSize: 12, color: 'var(--status-critical-text)' }}>
              Operational SLA Risk Detected
            </strong>
            <ul style={{ paddingLeft: 16, marginTop: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
              {customer.riskReasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* KPI 3-strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Open Orders</div>
          <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{customer.openWorkOrders}</div>
        </div>
        <div style={{ padding: '10px 12px', backgroundColor: customer.slaCompliance < 95 ? '#FFFBEB' : 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: customer.slaCompliance < 95 ? 'var(--status-attention-text)' : 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SLA Delivery</div>
          <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, marginTop: 2, color: customer.slaCompliance < 95 ? 'var(--status-attention-dot)' : 'var(--status-healthy-dot)' }}>
            {customer.slaCompliance}%
          </div>
        </div>
        <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Account Lead</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{customer.accountOwner}</div>
        </div>
      </div>

      {/* Active Work Orders Table */}
      <div className="enterprise-card" style={{ marginBottom: 16 }}>
        <div className="card-header" style={{ padding: '10px 14px' }}>
          <span className="card-title" style={{ fontSize: 13 }}>
            Active Work Orders ({workOrders.length})
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Click to inspect dispatch</span>
        </div>
        <div className="card-body no-padding">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Task Title</th>
                <th>Priority</th>
                <th>Assigned Technician</th>
                <th>SLA Time</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr
                  key={wo.id}
                  className="clickable-row"
                  onClick={() => openWorkOrder(wo.id)}
                >
                  <td className="font-mono" style={{ fontWeight: 700 }}>{wo.code}</td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {wo.title}
                  </td>
                  <td>
                    <StatusBadge status={wo.priority} />
                  </td>
                  <td>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (wo.assignedToId) openEmployee(wo.assignedToId);
                      }}
                      style={{ color: 'var(--brand-primary)', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {wo.assignedToName}
                    </span>
                  </td>
                  <td>
                    {wo.slaRisk ? (
                      <span className="font-mono" style={{ color: 'var(--status-critical-dot)', fontWeight: 700 }}>
                        {wo.slaRemainingHours}h
                      </span>
                    ) : (
                      <span className="font-mono" style={{ color: 'var(--text-muted)' }}>Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Reference */}
      {contract && (
        <div className="enterprise-card">
          <div className="card-header" style={{ padding: '10px 14px' }}>
            <span className="card-title" style={{ fontSize: 13 }}>Associated Master Service Agreement</span>
            <button
              className="btn-secondary"
              style={{ padding: '2px 8px', fontSize: 11 }}
              onClick={() => openContract(contract.id)}
            >
              View Contract Details →
            </button>
          </div>
          <div className="card-body" style={{ padding: '12px', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Contract Reference:</span>
              <strong className="font-mono">{contract.contractNumber}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Annual Value:</span>
              <strong className="font-mono">{contract.valueAnnual}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>SLA Target Commitment:</span>
              <strong className="font-mono">{contract.slaTarget}%</strong>
            </div>
            <div style={{ marginTop: 4, padding: '8px 10px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)', fontSize: 11, color: 'var(--text-secondary)' }}>
              <strong>Penalty Term:</strong> {contract.penaltyClause}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
