import React, { useState, useEffect, useRef } from 'react';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { MOCK_EMPLOYEES, MOCK_CUSTOMERS, MOCK_CONTRACTS, MOCK_WORK_ORDERS } from '../../data/mockData';
import { Search, User, Building, FileText, Wrench, X } from 'lucide-react';

interface SearchModalProps {
  onNavigate?: (pageId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onNavigate }) => {
  const { activeDrawer, closeAll, openEmployee, openCustomer, openContract, openWorkOrder } = useModalDrawer();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = activeDrawer === 'search';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) closeAll();
        else openEmployee(''); // fallback or open search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAll, openEmployee]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingEmployees = MOCK_EMPLOYEES.filter(
    (e) => e.name.toLowerCase().includes(cleanQuery) || e.role.toLowerCase().includes(cleanQuery) || e.code.toLowerCase().includes(cleanQuery)
  );

  const matchingCustomers = MOCK_CUSTOMERS.filter(
    (c) => c.name.toLowerCase().includes(cleanQuery) || c.industry.toLowerCase().includes(cleanQuery)
  );

  const matchingContracts = MOCK_CONTRACTS.filter(
    (cntr) => cntr.contractNumber.toLowerCase().includes(cleanQuery) || cntr.customerName.toLowerCase().includes(cleanQuery)
  );

  const matchingWorkOrders = MOCK_WORK_ORDERS.filter(
    (wo) => wo.code.toLowerCase().includes(cleanQuery) || wo.title.toLowerCase().includes(cleanQuery) || wo.customerName.toLowerCase().includes(cleanQuery)
  );

  const totalResults =
    (cleanQuery ? matchingEmployees.length : 0) +
    (cleanQuery ? matchingCustomers.length : 0) +
    (cleanQuery ? matchingContracts.length : 0) +
    (cleanQuery ? matchingWorkOrders.length : 0);

  return (
    <div className="modal-backdrop" onClick={closeAll}>
      <div className="modal-dialog" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search employees, customers, contracts, work orders, assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
          <button onClick={closeAll} className="header-action-btn" style={{ width: 26, height: 26 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ maxHeight: 400, overflowY: 'auto', padding: 12 }}>
          {!cleanQuery ? (
            <div style={{ padding: '20px 10px', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
              Type a name, customer, work order ID, or keyword to search across the enterprise database.
              <div style={{ marginTop: 12, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="quick-prompt-btn" onClick={() => setQuery('Amit Sharma')}>Amit Sharma</span>
                <span className="quick-prompt-btn" onClick={() => setQuery('Acme Industries')}>Acme Industries</span>
                <span className="quick-prompt-btn" onClick={() => setQuery('WO-8921')}>WO-8921</span>
                <span className="quick-prompt-btn" onClick={() => setQuery('HVAC')}>HVAC</span>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No operational records matching "<strong>{query}</strong>"
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {matchingEmployees.length > 0 && (
                <div>
                  <div className="sidebar-group-label">Employees ({matchingEmployees.length})</div>
                  {matchingEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        closeAll();
                        openEmployee(emp.id);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <User size={15} style={{ color: 'var(--brand-primary)' }} />
                        <div>
                          <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>{emp.name}</strong>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
                            {emp.role} • {emp.department} ({emp.location})
                          </span>
                        </div>
                      </div>
                      <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-subtle)' }}>
                        {emp.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {matchingCustomers.length > 0 && (
                <div>
                  <div className="sidebar-group-label">Customers ({matchingCustomers.length})</div>
                  {matchingCustomers.map((cust) => (
                    <div
                      key={cust.id}
                      onClick={() => {
                        closeAll();
                        openCustomer(cust.id);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Building size={15} style={{ color: 'var(--status-info-dot)' }} />
                        <div>
                          <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>{cust.name}</strong>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
                            {cust.industry} • SLA {cust.slaCompliance}%
                          </span>
                        </div>
                      </div>
                      <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {cust.contractValue}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {matchingWorkOrders.length > 0 && (
                <div>
                  <div className="sidebar-group-label">Work Orders ({matchingWorkOrders.length})</div>
                  {matchingWorkOrders.map((wo) => (
                    <div
                      key={wo.id}
                      onClick={() => {
                        closeAll();
                        openWorkOrder(wo.id);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Wrench size={15} style={{ color: 'var(--status-attention-dot)' }} />
                        <div>
                          <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>{wo.code}</strong>
                          <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 8 }}>
                            {wo.title}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {wo.customerName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Press <kbd style={{ padding: '1px 4px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 3 }}>ESC</kbd> to close</span>
          <span>Jump to entity with 1-click</span>
        </div>
      </div>
    </div>
  );
};
