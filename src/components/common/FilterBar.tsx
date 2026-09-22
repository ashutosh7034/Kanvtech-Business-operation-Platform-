import React from 'react';
import { useFilters, TimePeriod } from '../../context/FilterContext';
import { COMPANY_INFO } from '../../data/mockData';
import { RotateCcw } from 'lucide-react';

interface FilterBarProps {
  showDepartment?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ showDepartment = true }) => {
  const { period, setPeriod, location, setLocation, department, setDepartment, resetFilters } = useFilters();
  const periods: TimePeriod[] = ['Today', '7 Days', '30 Days', 'Quarter'];

  return (
    <div className="filter-bar-container">
      <div className="filter-period-group">
        {periods.map((p) => (
          <button
            key={p}
            className={`filter-period-btn ${period === p ? 'active' : ''}`}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <select
        className="filter-select"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="All Locations">All Locations</option>
        {COMPANY_INFO.locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {showDepartment && (
        <select
          className="filter-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All Departments">All Departments</option>
          {COMPANY_INFO.departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      )}

      {(location !== 'All Locations' || department !== 'All Departments' || period !== 'Today') && (
        <button
          onClick={resetFilters}
          style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            padding: '4px 6px',
          }}
          title="Reset to default filters"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
};
