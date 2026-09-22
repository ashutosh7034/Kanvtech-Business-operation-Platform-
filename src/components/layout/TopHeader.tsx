import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModalDrawer } from '../../context/ModalDrawerContext';
import { Search, Bell, Menu } from 'lucide-react';

interface TopHeaderProps {
  currentSectionTitle?: string;
  isSidebarVisible?: boolean;
  onToggleSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  isSidebarVisible = true,
  onToggleSidebar,
}) => {
  const { user, switchRole } = useAuth();
  const { openNotifications, openSearch } = useModalDrawer();

  if (!user) return null;

  const isCeo = user.role === 'ceo';
  const userName = isCeo ? 'Rajesh Verma' : 'Priya Nair';
  const userRoleTitle = isCeo ? 'Chief Executive' : 'HR Head';
  const userInitials = isCeo ? 'RV' : 'PN';

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
          <div className="brand-text-col">
            <span className="brand-name">KANVTECH</span>
            <span className="brand-subtext">
              {isCeo ? 'Facilities & Services' : 'People | Process | Progress'}
            </span>
          </div>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="header-center">
        <div className="top-search-bar" onClick={openSearch} role="button" tabIndex={0}>
          <Search size={14} className="search-icon" />
          <span className="search-placeholder">
            Search employee, customer, work order, contract...
          </span>
          <span className="kbd-shortcut">⌘K</span>
        </div>
      </div>

      {/* Right Controls: Notifications, User Profile */}
      <div className="header-right">
        {/* Notifications with Badge */}
        <button
          className="header-action-btn"
          onClick={openNotifications}
          aria-label="Open notifications"
          title="Operational alerts"
        >
          <Bell size={16} />
          <span className="notification-badge-count">3</span>
        </button>

        <div className="header-divider" />

        {/* User Profile */}
        <div
          className="user-profile-menu"
          onClick={() => switchRole(isCeo ? 'hr' : 'ceo')}
          title="Click to switch between CEO and HR views"
          style={{ cursor: 'pointer' }}
        >
          <div className="user-avatar-badge">{userInitials}</div>
          <div className="user-info-text">
            <span className="user-name">{userName}</span>
            <span className="user-role-label">{userRoleTitle}</span>
          </div>
        </div>
      </div>
    </header>
  );
};


