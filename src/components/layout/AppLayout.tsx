import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { EmployeeProfileDrawer } from '../drawers/EmployeeProfileDrawer';
import { CustomerDetailDrawer } from '../drawers/CustomerDetailDrawer';
import { ContractDetailDrawer } from '../drawers/ContractDetailDrawer';
import { WorkOrderDetailDrawer } from '../drawers/WorkOrderDetailDrawer';
import { SlaInvestigationDrawer } from '../drawers/SlaInvestigationDrawer';
import { WorkforceInvestigationDrawer } from '../drawers/WorkforceInvestigationDrawer';
import { DecisionSupportDrawer } from '../drawers/DecisionSupportDrawer';
import { FinancialInvestigationDrawer } from '../drawers/FinancialInvestigationDrawer';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { SearchModal } from '../common/SearchModal';
import { HiringRequestModal } from '../drawers/HiringRequestModal';

interface AppLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ currentTab, onSelectTab, children }) => {
  const { user } = useAuth();
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileDrawerOpen]);

  // Auto-close mobile sidebar if resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileDrawerOpen]);

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsDesktopCollapsed((prev) => !prev);
    } else {
      setIsMobileDrawerOpen((prev) => !prev);
    }
  };

  const getSectionTitle = () => {
    switch (currentTab) {
      case 'overview':
        return user?.role === 'ceo' ? 'Executive Overview' : 'People Operations';
      case 'operations':
        return 'Service Operations';
      case 'workforce':
        return 'Workforce Capacity';
      case 'customers':
        return 'Customer Accounts';
      case 'contracts':
        return 'Contracts';
      case 'finance':
        return 'Finance';
      case 'assets_inventory':
        return 'Assets & Inventory';
      case 'ask_company':
        return 'Ask Company';
      case 'people':
        return 'People Directory';
      case 'recruitment':
        return 'Recruitment';
      case 'attendance':
        return 'Attendance & Leave';
      case 'performance':
        return 'Performance';
      case 'skills_certs':
        return 'Skills & Certs';
      case 'training':
        return 'Training';
      case 'workforce_planning':
        return 'Capacity Planning';
      case 'payroll':
        return 'Payroll';
      default:
        return 'Overview';
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        isOpen={isMobileDrawerOpen}
        isCollapsed={isDesktopCollapsed}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <div className="main-layout">
        <TopHeader
          currentSectionTitle={getSectionTitle()}
          isSidebarVisible={!isDesktopCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="content-area">{children}</main>
      </div>

      {/* Global Inspectors, Drawers & Modals */}
      <EmployeeProfileDrawer />
      <CustomerDetailDrawer />
      <ContractDetailDrawer />
      <WorkOrderDetailDrawer />
      <SlaInvestigationDrawer />
      <WorkforceInvestigationDrawer />
      <DecisionSupportDrawer />
      <FinancialInvestigationDrawer />
      <NotificationDrawer />
      <SearchModal
        onNavigate={(pageId) => {
          onSelectTab(pageId);
          setIsMobileDrawerOpen(false);
        }}
      />
      <HiringRequestModal />
    </div>
  );
};
