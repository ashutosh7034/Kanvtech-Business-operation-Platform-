import React, { createContext, useContext, useState } from 'react';

export type TimePeriod = 'Today' | '7 Days' | '30 Days' | 'Quarter';

interface FilterContextType {
  period: TimePeriod;
  setPeriod: (period: TimePeriod) => void;
  location: string;
  setLocation: (loc: string) => void;
  department: string;
  setDepartment: (dept: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [period, setPeriod] = useState<TimePeriod>('Today');
  const [location, setLocation] = useState<string>('All Locations');
  const [department, setDepartment] = useState<string>('All Departments');

  const resetFilters = () => {
    setPeriod('Today');
    setLocation('All Locations');
    setDepartment('All Departments');
  };

  return (
    <FilterContext.Provider
      value={{
        period,
        setPeriod,
        location,
        setLocation,
        department,
        setDepartment,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
