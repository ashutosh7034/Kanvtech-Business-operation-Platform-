import React from 'react';
import { MOCK_ASSETS, MOCK_INVENTORY } from '../../data/mockData';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AssetItem, InventoryItem } from '../../types';

export const AssetsInventoryPage: React.FC = () => {
  const assetColumns: Column<AssetItem>[] = [
    {
      key: 'name',
      header: 'Equipment Name & ID',
      sortable: true,
      render: (a) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.code}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>· {a.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Site: {a.customerSite} · {a.location}</div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Condition',
      sortable: true,
      render: (a) => <StatusBadge status={a.status} />,
    },
    {
      key: 'lastServiced',
      header: 'Last Service',
      sortable: true,
      render: (a) => <span style={{ color: 'var(--text-secondary)' }}>{a.lastServiced}</span>,
    },
    {
      key: 'nextServiceDue',
      header: 'Next Service Due',
      sortable: true,
      render: (a) => (
        <span style={{ color: a.status === 'critical' ? 'var(--status-critical-dot)' : 'var(--text-primary)', fontWeight: a.status === 'critical' ? 600 : 400 }}>
          {a.nextServiceDue}
        </span>
      ),
    },
  ];

  const inventoryColumns: Column<InventoryItem>[] = [
    {
      key: 'name',
      header: 'Part Item & SKU',
      sortable: true,
      render: (i) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{i.sku}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>· {i.name}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Category: {i.category}</div>
        </div>
      ),
    },
    {
      key: 'stockLevel',
      header: 'Stock Level',
      sortable: true,
      render: (i) => (
        <span style={{ fontWeight: 600, color: i.status === 'critical' ? 'var(--status-critical-dot)' : 'var(--text-primary)' }}>
          {i.stockLevel} units (Min: {i.minThreshold})
        </span>
      ),
    },
    {
      key: 'totalValue',
      header: 'Total Value',
      sortable: true,
      render: (i) => <span>₹{(i.totalValue).toLocaleString('en-IN')}</span>,
    },
    {
      key: 'status',
      header: 'Stock Status',
      sortable: true,
      render: (i) => <StatusBadge status={i.status} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div className="section-header-wrap">
        <div>
          <h1 className="greeting-title">Asset Management</h1>
          <p className="greeting-subtitle">
            1,284 tracked assets · 91.6% operational health across 5 regional plant hubs
          </p>
        </div>
      </div>

      {/* Asset Health Summary */}
      <div className="ops-summary-strip">
        <div className="ops-summary-block">
          <span className="ops-summary-label">Total Assets</span>
          <span className="ops-summary-val">1,284</span>
          <span className="ops-summary-sub">Tracked equipment</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Operational</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-healthy-dot)' }}>1,176</span>
          <span className="ops-summary-sub">91.6% active</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label">Maintenance Due</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-attention-dot)' }}>64</span>
          <span className="ops-summary-sub">Next 7 days</span>
        </div>
        <div className="ops-summary-block">
          <span className="ops-summary-label" style={{ color: 'var(--status-critical-dot)' }}>Critical Condition</span>
          <span className="ops-summary-val" style={{ color: 'var(--status-critical-dot)' }}>12</span>
          <span className="ops-summary-sub" style={{ color: 'var(--status-critical-dot)' }}>Requires parts</span>
        </div>
      </div>

      {/* Asset Register Table */}
      <DataTable
        title="Asset Register"
        data={MOCK_ASSETS}
        columns={assetColumns}
        keyExtractor={(a) => a.id}
        searchPlaceholder="Filter assets by name, code, site..."
        pageSize={6}
      />

      {/* Spares Inventory Table */}
      <DataTable
        title="Critical Spares Inventory"
        data={MOCK_INVENTORY}
        columns={inventoryColumns}
        keyExtractor={(i) => i.id}
        searchPlaceholder="Filter spares by SKU, part name, category..."
        pageSize={5}
      />
    </div>
  );
};
