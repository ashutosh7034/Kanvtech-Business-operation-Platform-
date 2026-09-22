import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FilterProvider } from './context/FilterContext';
import { ModalDrawerProvider } from './context/ModalDrawerContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';

// CEO Pages
import { CeoDashboard } from './pages/ceo/CeoDashboard';
import { OperationsPage } from './pages/ceo/OperationsPage';
import { WorkforcePage } from './pages/ceo/WorkforcePage';
import { CustomersPage } from './pages/ceo/CustomersPage';
import { ContractsPage } from './pages/ceo/ContractsPage';
import { FinancePage } from './pages/ceo/FinancePage';
import { AssetsInventoryPage } from './pages/ceo/AssetsInventoryPage';
import { AskCompanyWidget } from './components/ai/AskCompanyWidget';

// HR Pages
import { HrDashboard } from './pages/hr/HrDashboard';
import { PeopleDirectoryPage } from './pages/hr/PeopleDirectoryPage';
import { RecruitmentPage } from './pages/hr/RecruitmentPage';
import { AttendancePage } from './pages/hr/AttendancePage';
import { PerformancePage } from './pages/hr/PerformancePage';
import { SkillsCertificationsPage } from './pages/hr/SkillsCertificationsPage';
import { TrainingPage } from './pages/hr/TrainingPage';
import { WorkforcePlanningPage } from './pages/hr/WorkforcePlanningPage';
import { PayrollOverviewPage } from './pages/hr/PayrollOverviewPage';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('overview');

  // Reset tab to overview whenever the active role switches
  useEffect(() => {
    setCurrentTab('overview');
  }, [user?.role]);

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    if (user.role === 'ceo') {
      switch (currentTab) {
        case 'overview':
          return <CeoDashboard onNavigateTab={(tab) => setCurrentTab(tab)} />;
        case 'operations':
          return <OperationsPage />;
        case 'workforce':
          return <WorkforcePage />;
        case 'customers':
          return <CustomersPage />;
        case 'contracts':
          return <ContractsPage />;
        case 'finance':
          return <FinancePage />;
        case 'assets_inventory':
          return <AssetsInventoryPage />;
        case 'ask_company':
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="section-header-wrap">
                <div>
                  <h1 className="greeting-title">Ask Company • Intelligence & Simulation</h1>
                  <p className="greeting-subtitle">
                    Enterprise Decision Support & Capacity Forecasting Engine
                  </p>
                </div>
              </div>
              <AskCompanyWidget />
            </div>
          );
        case 'settings':
          return (
            <div className="enterprise-card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                Executive Platform & Role Configuration
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Company: <strong>KANVTECH FACILITIES & SERVICES</strong> • Version 2.4.1 (Enterprise Production)
              </p>
            </div>
          );
        default:
          return <CeoDashboard onNavigateTab={(tab) => setCurrentTab(tab)} />;
      }
    } else {
      // HR Role
      switch (currentTab) {
        case 'overview':
          return <HrDashboard onNavigateTab={(tab) => setCurrentTab(tab)} />;
        case 'people':
          return <PeopleDirectoryPage />;
        case 'recruitment':
          return <RecruitmentPage />;
        case 'attendance':
          return <AttendancePage />;
        case 'performance':
          return <PerformancePage />;
        case 'skills_certs':
          return <SkillsCertificationsPage />;
        case 'training':
          return <TrainingPage />;
        case 'workforce_planning':
          return <WorkforcePlanningPage />;
        case 'payroll':
          return <PayrollOverviewPage />;
        case 'settings':
          return (
            <div className="enterprise-card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                Human Resources Compliance & Policy Settings
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Workforce Scale: 428 Employees across 5 Hubs. Standard Statutory Audits: Active.
              </p>
            </div>
          );
        default:
          return <HrDashboard onNavigateTab={(tab) => setCurrentTab(tab)} />;
      }
    }
  };

  return (
    <AppLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
      {renderContent()}
    </AppLayout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <FilterProvider>
        <ModalDrawerProvider>
          <AppContent />
        </ModalDrawerProvider>
      </FilterProvider>
    </AuthProvider>
  );
};

export default App;
