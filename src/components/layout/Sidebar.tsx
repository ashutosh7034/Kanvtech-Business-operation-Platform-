import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Wrench,
  Users,
  Building2,
  FileText,
  DollarSign,
  Package,
  Sparkles,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  CreditCard,
  Settings,
  ArrowLeftRight,
  LogOut,
  Sliders,
  X,
  LucideIcon,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeType?: 'critical' | 'warning';
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen = false,
  isCollapsed = false,
  onClose,
}) => {
  const { user, switchRole, logout } = useAuth();

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!user) return null;

  const isCeo = user.role === 'ceo';

  const ceoSections: NavSection[] = [
    {
      label: 'Overview',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      ],
    },
    {
      label: 'Operations',
      items: [
        { id: 'operations', label: 'Service Operations', icon: Wrench, badge: '12 at risk', badgeType: 'critical' },
        { id: 'workforce', label: 'Workforce Capacity', icon: Users, badge: '-13 gap', badgeType: 'warning' },
        { id: 'customers', label: 'Customer Accounts', icon: Building2 },
        { id: 'contracts', label: 'Contracts', icon: FileText },
      ],
    },
    {
      label: 'Resources',
      items: [
        { id: 'finance', label: 'Finance', icon: DollarSign },
        { id: 'assets_inventory', label: 'Assets & Inventory', icon: Package },
      ],
    },
    {
      label: 'Intelligence',
      items: [
        { id: 'ask_company', label: 'Ask Company', icon: Sparkles },
      ],
    },
    {
      label: 'Administration',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const hrSections: NavSection[] = [
    {
      label: 'Overview',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      ],
    },
    {
      label: 'Talent',
      items: [
        { id: 'people', label: 'People Directory', icon: Users },
        { id: 'recruitment', label: 'Recruitment', icon: Briefcase, badge: '14 open', badgeType: 'critical' },
        { id: 'workforce_planning', label: 'Capacity Planning', icon: Sliders },
      ],
    },
    {
      label: 'Operations',
      items: [
        { id: 'attendance', label: 'Attendance & Leave', icon: Calendar, badge: '10 absent', badgeType: 'warning' },
        { id: 'performance', label: 'Performance', icon: TrendingUp },
        { id: 'skills_certs', label: 'Skills & Certs', icon: Award, badge: '9 expiring', badgeType: 'warning' },
        { id: 'training', label: 'Training', icon: BookOpen },
      ],
    },
    {
      label: 'Financial & Audit',
      items: [
        { id: 'payroll', label: 'Payroll', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const sections = isCeo ? ceoSections : hrSections;

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const handleRoleSwitch = () => {
    switchRole(isCeo ? 'hr' : 'ceo');
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for tablet & mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span className="sidebar-company-title">KANVTECH</span>
            <span className="sidebar-company-sub">
              {isCeo ? 'Executive Suite' : 'People Operations'}
            </span>
          </div>
          {/* Close button visible only on mobile/tablet drawer */}
          <button
            className="mobile-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sections.map((sec, idx) => (
            <div key={idx}>
              <div className="sidebar-group-label">{sec.label}</div>
              <ul className="sidebar-nav-list">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        className={`nav-item-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <Icon size={14} style={{ opacity: isActive ? 1 : 0.65 }} />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className={`nav-item-badge ${
                              item.badgeType === 'critical'
                                ? 'critical'
                                : item.badgeType === 'warning'
                                ? 'warning'
                                : ''
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button
            className="role-switch-btn"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={handleRoleSwitch}
          >
            <ArrowLeftRight size={12} />
            <span>Switch to {isCeo ? 'HR View' : 'CEO View'}</span>
          </button>

          <button
            onClick={logout}
            className="nav-item-btn"
            style={{ padding: '6px 10px', fontSize: 12, color: 'var(--text-muted)' }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
