import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  emptyMessage?: string;
  title?: string;
  headerActions?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = 'Filter records...',
  searchFields,
  emptyMessage = 'No matching records found.',
  title,
  headerActions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (searchFields && searchFields.length > 0) {
        return searchFields.some((field) => {
          const val = item[field];
          return val !== undefined && String(val).toLowerCase().includes(term);
        });
      }
      // Default: check all string/number fields
      return Object.values(item).some((val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val).toLowerCase().includes(term);
        }
        return false;
      });
    });
  }, [data, searchTerm, searchFields]);

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="data-table-container">
      {(title || searchable || headerActions) && (
        <div className="data-table-toolbar">
          {title && <span className="data-table-title">{title}</span>}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {searchable && (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search
                  size={13}
                  style={{
                    position: 'absolute',
                    left: 8,
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="text"
                  className="data-table-search"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ paddingLeft: 26 }}
                />
              </div>
            )}
            {headerActions}
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="enterprise-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? 'sortable' : ''}
                  style={{
                    width: col.width,
                    textAlign: col.align || 'left',
                  }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span>{col.header}</span>
                    {col.sortable && sortKey === col.key && (
                      <span>
                        {sortDirection === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className={onRowClick ? 'clickable' : ''}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        textAlign: col.align || 'left',
                      }}
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: 'center',
                    padding: '32px 16px',
                    color: 'var(--text-muted)',
                    fontSize: 13,
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedData.length > pageSize && (
        <div className="data-table-pagination">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length} records
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={13} style={{ verticalAlign: 'middle' }} /> Prev
            </button>
            <span style={{ fontSize: 11, padding: '0 4px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={13} style={{ verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
