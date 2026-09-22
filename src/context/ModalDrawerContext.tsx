import React, { createContext, useContext, useState } from 'react';

export type DrawerType =
  | 'employee'
  | 'customer'
  | 'contract'
  | 'workOrder'
  | 'notifications'
  | 'search'
  | 'hiringModal'
  | 'askCompany'
  | 'slaInvestigation'
  | 'workforceInvestigation'
  | 'decisionSupport'
  | 'financialInvestigation'
  | null;

export interface PrefilledRequisitionData {
  title: string;
  department: string;
  location: string;
  requiredCount: number;
  priority: 'critical' | 'high' | 'medium';
  reason: string;
  skillsRequired: string[];
}

interface ModalDrawerContextType {
  activeDrawer: DrawerType;
  selectedId: string | null;
  prefilledRequisition: PrefilledRequisitionData | null;
  askCompanyInitialQuery: string | null;
  openEmployee: (id: string) => void;
  openCustomer: (id: string) => void;
  openContract: (id: string) => void;
  openWorkOrder: (id: string) => void;
  openHiringModal: (data?: Partial<PrefilledRequisitionData>) => void;
  openAskCompany: (query?: string) => void;
  openNotifications: () => void;
  openSearch: () => void;
  openSlaInvestigation: () => void;
  openWorkforceInvestigation: () => void;
  openDecisionSupport: () => void;
  openFinancialInvestigation: () => void;
  closeAll: () => void;
}

const ModalDrawerContext = createContext<ModalDrawerContextType | undefined>(undefined);

export const ModalDrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [prefilledRequisition, setPrefilledRequisition] = useState<PrefilledRequisitionData | null>(null);
  const [askCompanyInitialQuery, setAskCompanyInitialQuery] = useState<string | null>(null);

  const openEmployee = (id: string) => {
    setSelectedId(id);
    setActiveDrawer('employee');
  };

  const openCustomer = (id: string) => {
    setSelectedId(id);
    setActiveDrawer('customer');
  };

  const openContract = (id: string) => {
    setSelectedId(id);
    setActiveDrawer('contract');
  };

  const openWorkOrder = (id: string) => {
    setSelectedId(id);
    setActiveDrawer('workOrder');
  };

  const openHiringModal = (data?: Partial<PrefilledRequisitionData>) => {
    const defaultData: PrefilledRequisitionData = {
      title: 'Senior Field Technician - Industrial HVAC',
      department: 'Field Operations',
      location: 'Mumbai',
      requiredCount: 5,
      priority: 'critical',
      reason: 'Mumbai Field Operations capacity deficit (-13 gap) directly impacting 18 open work orders and 4 critical SLAs.',
      skillsRequired: ['HVAC Industrial Level III', 'Chiller Plant Operations', 'Preventive Maintenance', 'Safety Protocols'],
      ...data,
    };
    setPrefilledRequisition(defaultData);
    setActiveDrawer('hiringModal');
  };

  const openAskCompany = (query?: string) => {
    setAskCompanyInitialQuery(query || null);
    setActiveDrawer('askCompany');
  };

  const openNotifications = () => {
    setActiveDrawer('notifications');
  };

  const openSearch = () => {
    setActiveDrawer('search');
  };

  const openSlaInvestigation = () => {
    setActiveDrawer('slaInvestigation');
  };

  const openWorkforceInvestigation = () => {
    setActiveDrawer('workforceInvestigation');
  };

  const openDecisionSupport = () => {
    setActiveDrawer('decisionSupport');
  };

  const openFinancialInvestigation = () => {
    setActiveDrawer('financialInvestigation');
  };

  const closeAll = () => {
    setActiveDrawer(null);
    setSelectedId(null);
  };

  return (
    <ModalDrawerContext.Provider
      value={{
        activeDrawer,
        selectedId,
        prefilledRequisition,
        askCompanyInitialQuery,
        openEmployee,
        openCustomer,
        openContract,
        openWorkOrder,
        openHiringModal,
        openAskCompany,
        openNotifications,
        openSearch,
        openSlaInvestigation,
        openWorkforceInvestigation,
        openDecisionSupport,
        openFinancialInvestigation,
        closeAll,
      }}
    >
      {children}
    </ModalDrawerContext.Provider>
  );
};

export const useModalDrawer = () => {
  const context = useContext(ModalDrawerContext);
  if (!context) {
    throw new Error('useModalDrawer must be used within a ModalDrawerProvider');
  }
  return context;
};
