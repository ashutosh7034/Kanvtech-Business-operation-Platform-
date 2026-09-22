import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { Search, Bell, ArrowLeftRight, Menu, X } from 'lucide-react';

interface TopHeaderProps {
  currentSectionTitle: string;
  isSidebarVisible?: boolean;
  onToggleSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentSectionTitle,
  isSidebarVisible = true,
  onToggleSidebar,
}) => {
  const { user, switchRole } = useAuth();
  const { openNotifications, openSearch } = useModalDrawer();

  if (!user) return null;

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Navigation Toggle (Desktop collapse / Mobile drawer) */}
        <button
          className="hamburger-btn"
          aria-label={isSidebarVisible ? 'Collapse navigation' : 'Expand navigation'}
          title={isSidebarVisible ? 'Collapse navigation' : 'Expand navigation'}
          onClick={onToggleSidebar}
        >
          <Menu size={18} />
        </button>

        <div className="company-brand">
          <span className="brand-badge">KANVTECH</span>
          <span className="brand-subtext" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
            Facilities & Services
          </span>
        </div>

        <div className="header-divider" />

        <div className="header-role-context">
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentSectionTitle}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Quick Search */}
        <button className="quick-search-trigger" onClick={openSearch}>
          <Search size={13} />
          <span>Search records...</span>
          <span className="kbd-shortcut">⌘K</span>
        </button>

        {/* 1-Click Role Switcher */}
        <button
          className="role-switch-btn"
          onClick={() => switchRole(user.role === 'ceo' ? 'hr' : 'ceo')}
          title={`Switch view to ${user.role === 'ceo' ? 'HR Operations' : 'CEO Overview'}`}
        >
          <ArrowLeftRight size={13} />
          <span className="role-switch-label">Switch to {user.role === 'ceo' ? 'HR View' : 'CEO View'}</span>
        </button>

        {/* Notifications */}
        <button
          className="header-action-btn"
          onClick={openNotifications}
          aria-label="Open notifications"
          title="Operational alerts"
        >
          <Bell size={16} />
          <span className="notification-pill" />
        </button>

        <div className="header-divider" />

        {/* User Profile */}
        <div className="user-profile-menu">
          <div className="user-avatar-badge">{user.avatar}</div>
          <div className="user-info-text">
            <span className="user-name">{user.name}</span>
            <span className="user-role-label">{user.role === 'ceo' ? 'Chief Executive' : 'People Operations'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
