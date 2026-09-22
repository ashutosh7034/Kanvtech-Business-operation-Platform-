import {
  MOCK_EMPLOYEES,
  MOCK_CUSTOMERS,
  MOCK_CONTRACTS,
  MOCK_WORK_ORDERS,
  MOCK_DEPARTMENT_CAPACITY,
  MOCK_RECRUITMENT_JOBS,
  MOCK_CERTIFICATIONS,
  MOCK_ATTENTION_ITEMS,
  MOCK_ACTIVITY_FEED,
  MOCK_NOTIFICATIONS,
} from './mockData';
import { TIME_SERIES_DATA, DailyRecord } from './timeSeriesData';
import { RecruitmentJob } from '../types';
import { TimePeriod } from '../context/FilterContext';

export interface FilterState {
  period: TimePeriod;
  location: string;
  department: string;
}

export interface SimulationResult {
  additionalTechnicians: number;
  capacityGainPct: number;
  estimatedMonthlyHiringCost: string;
  slaImprovementPct: number;
  workOrdersStabilized: number;
  contractRiskMitigated: string;
  projectedMumbaiCapacity: {
    required: number;
    currentAvailable: number;
    projectedAvailable: number;
    projectedGap: number;
  };
}

export interface CeoMetricsViewModel {
  rev: {
    current: number;
    target: number;
    variance: number;
    growth: number;
    previousPeriod: number;
    label: string;
    dateRange: string;
  };
  fin: {
    marginPct: number;
    targetMarginPct: number;
    variancePp: number;
    revenue: number;
    operatingCost: number;
    overtimeCost: number;
    overtimeHours: number;
    receivables: number;
    dsoDays: number;
  };
  sla: {
    compliance: number;
    target: number;
    variancePp: number;
    atRiskCount: number;
    criticalCount: number;
    primaryDriver: string;
    affectedRegion: string;
    affectedCustomers: string[];
    affectedOrdersCount: number;
  };
  workforce: {
    isHistorical: boolean;
    availableLabel: string;
    available: number;
    required: number;
    totalHeadcount: number;
    gap: number;
    percentage: number;
    largestGapRegion: string;
    contextNote: string;
    causes: { absent: number; certConstraints: number; overloaded: number };
    loadedTechnicians: { id: string; name: string; location: string; activeJobs: number; priorityJobs: number; slaRiskCount: number }[];
  };
  ops: {
    openOrders: number;
    completed: number;
    inProgress: number;
    overdue: number;
    mttrHours: number;
    firstTimeFixRate: number;
  };
  cust: {
    totalAccounts: number;
    healthy: number;
    attention: number;
    critical: number;
    topExposure: {
      name: string;
      sla: number;
      contractValue: string;
      slaRisksCount: number;
      openOrdersCount: number;
    };
  };
  contracts: {
    activeCount: number;
    totalAcv: string;
    totalAcvNum: number;
    expiring30d: number;
    atRiskCount: number;
  };
  signal: {
    title: string;
    badge: 'Critical Issue' | 'Attention Required' | 'Stable Growth';
    location: string;
    department: string;
    required?: number;
    available?: number;
    gap?: number;
    affectedOrders?: number;
    criticalSlaRisks?: number;
    contractExposure?: string;
    primaryDriver: string;
    summaryText: string;
  };
  priorities: {
    id: string;
    title: string;
    impactLevel: 'High impact' | 'Medium impact' | 'Normal';
    actionType: 'sla' | 'workforce' | 'contract' | 'operations' | 'finance';
  }[];
  deptSignals: {
    name: string;
    status: 'healthy' | 'warning' | 'attention';
    label: string;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export interface HrMetricsViewModel {
  pulse: {
    isHistorical: boolean;
    totalEmployees: number;
    joinersCount: number;
    presentOnDuty: number;
    attendanceRate: number;
    approvedLeave: number;
    unplannedAbsent: number;
    openPositions: number;
    attritionRate: number;
    activeFilterNote: string;
  };
  whatMatters: {
    title: string;
    location: string;
    gapText: string;
    required: number;
    available: number;
    ordersAffected: number;
    overtimeHours: number;
  };
  secondary: {
    overtimeHours: number;
    overtimeCost: number;
    certificationsExpiring: number;
    trainingCompletionPct: number;
    openPositions: number;
    candidatesCount: number;
  };
  regionalCapacity: {
    region: string;
    required: number;
    available: number;
    gap: number;
    status: 'Deficit' | 'Balanced' | 'Healthy';
  }[];
  attendanceTrend: {
    labels: string[];
    present: number[];
    leave: number[];
    absent: number[];
  };
  recruitmentPipeline: {
    openPositions: number;
    applied: number;
    screening: number;
    technical: number;
    interview: number;
    offer: number;
    joined: number;
  };
  peopleRisks: {
    certExpiring: number;
    highAbsence: number;
    overtimeHours: number;
    criticalHires: number;
    attritionPct: number;
  };
  payroll: {
    monthlyPayrollMasked: string;
    overtimeCostLakhs: number;
    complianceStatus: string;
  };
}

export class DataService {
  private static employees = [...MOCK_EMPLOYEES];
  private static workOrders = [...MOCK_WORK_ORDERS];
  private static recruitmentJobs = [...MOCK_RECRUITMENT_JOBS];
  private static notifications = [...MOCK_NOTIFICATIONS];

  // Filter raw time series records
  private static filterRecords(records: DailyRecord[], location?: string, department?: string): DailyRecord[] {
    return records.filter((r) => {
      const matchLoc = !location || location === 'All Locations' || r.location === location;
      const matchDept = !department || department === 'All Departments' || r.department === department;
      return matchLoc && matchDept;
    });
  }

  // Get period records with accurate historical comparisons
  private static getPeriodRecords(period: TimePeriod, location?: string, department?: string) {
    const all = this.filterRecords(TIME_SERIES_DATA, location, department);

    let currentRecords: DailyRecord[] = [];
    let previousRecords: DailyRecord[] = [];
    let dateRange = '';

    if (period === 'Today') {
      currentRecords = all.filter((r) => r.date === '2026-09-22');
      previousRecords = all.filter((r) => r.date === '2026-09-21');
      dateRange = '22 Sep 2026';
    } else if (period === '7 Days') {
      currentRecords = all.filter((r) => r.date >= '2026-09-16' && r.date <= '2026-09-22');
      previousRecords = all.filter((r) => r.date >= '2026-09-09' && r.date <= '2026-09-15');
      dateRange = '16–22 Sep 2026';
    } else if (period === '30 Days') {
      currentRecords = all.filter((r) => r.date >= '2026-08-24' && r.date <= '2026-09-22');
      previousRecords = all.filter((r) => r.date >= '2026-07-25' && r.date <= '2026-08-23');
      dateRange = '24 Aug – 22 Sep 2026';
    } else {
      // Quarter: Q2 FY26 (1 Jul to 22 Sep) vs comparable previous quarter window
      currentRecords = all.filter((r) => r.date >= '2026-07-01' && r.date <= '2026-09-22');
      previousRecords = all.filter((r) => r.date >= '2026-06-24' && r.date < '2026-07-01');
      dateRange = '1 Jul – 22 Sep 2026 (Q2)';
    }

    return { currentRecords, previousRecords, dateRange };
  }

  // =========================================================================
  // CANONICAL CEO VIEW MODEL GENERATOR
  // =========================================================================
  static getCeoMetrics(filters: FilterState): CeoMetricsViewModel {
    const { period, location, department } = filters;
    const { currentRecords, previousRecords, dateRange } = this.getPeriodRecords(period, location, department);

    // 1. Financials
    const currentRevSum = currentRecords.reduce((sum, r) => sum + r.revenue, 0);
    const prevRevSum = previousRecords.reduce((sum, r) => sum + r.revenue, 0) || currentRevSum * 0.92;
    const revCurrent = Math.round(currentRevSum * 10) / 10;
    const revPrev = Math.round(prevRevSum * 10) / 10;

    // Realistic target benchmark
    let revTarget = Math.round(revCurrent * 1.07 * 10) / 10;
    if (period === 'Today' && location === 'All Locations' && department === 'All Departments') revTarget = 1.85;
    else if (period === '7 Days' && location === 'All Locations' && department === 'All Departments') revTarget = 12.5;
    else if (period === '30 Days' && location === 'All Locations' && department === 'All Departments') revTarget = 52.0;
    else if (period === 'Quarter' && location === 'All Locations' && department === 'All Departments') revTarget = 150.0;

    const revVariance = Math.round((revCurrent - revTarget) * 10) / 10;
    
    // Growth calculation (bounded realistic baseline)
    let growth = 8.4;
    if (period === 'Today') growth = 6.2;
    else if (period === '7 Days') growth = 7.3;
    else if (period === '30 Days') growth = 8.4;
    else if (period === 'Quarter') growth = 9.2; // Believable Q2 vs Q1 growth!

    const revLabels: Record<TimePeriod, string> = {
      Today: 'Revenue Today',
      '7 Days': 'Revenue — Last 7 Days',
      '30 Days': 'Revenue — Last 30 Days',
      Quarter: 'Revenue — Current Quarter',
    };

    // Operating cost and margin
    const totalCostSum = currentRecords.reduce((sum, r) => sum + r.operatingCost, 0);
    const opCost = Math.round(totalCostSum * 10) / 10;
    const opProfit = Math.round((revCurrent - opCost) * 10) / 10;
    const marginPct = revCurrent > 0 ? Math.round((opProfit / revCurrent) * 100 * 10) / 10 : 24.8;
    const targetMarginPct = 26.0;
    const variancePp = Math.round((marginPct - targetMarginPct) * 10) / 10;

    const overtimeHours = currentRecords.reduce((sum, r) => sum + r.overtimeHours, 0) || 312;
    const overtimeCost = Math.round((currentRecords.reduce((sum, r) => sum + r.overtimeCost, 0) || 14.6) * 10) / 10;
    const receivables = Math.round(revCurrent * 1.28 * 10) / 10 || 62.4;

    // 2. SLA
    const completedOrders = currentRecords.reduce((sum, r) => sum + r.workOrdersCompleted, 0);
    const withinSlaOrders = currentRecords.reduce((sum, r) => sum + r.workOrdersWithinSla, 0);
    let slaCompliance = completedOrders > 0 ? Math.round((withinSlaOrders / completedOrders) * 100 * 10) / 10 : 94.2;
    if (period === 'Today' && location === 'All Locations') slaCompliance = 94.2;
    const slaTarget = 96.0;
    const slaVariance = Math.round((slaCompliance - slaTarget) * 10) / 10;

    // 3. Workforce (Differentiate snapshot vs average)
    const isHistorical = period !== 'Today';
    let availableStaff = 397;
    let requiredStaff = 410;
    let totalHeadcount = 428;
    let contextNote = '397 on duty • 21 leave • 10 absent (Total: 428)';
    let availableLabel = 'Current On-Duty';

    if (location === 'Mumbai') {
      totalHeadcount = 172;
      requiredStaff = 172;
      availableStaff = 156;
      contextNote = 'Field Ops: 71 available vs 84 required (-13 gap)';
    } else if (location === 'Pune') {
      totalHeadcount = 94;
      requiredStaff = 94;
      availableStaff = 89;
      contextNote = 'Field Ops: 49 available vs 52 required (-3 gap)';
    } else if (location === 'Bengaluru') {
      totalHeadcount = 86;
      requiredStaff = 86;
      availableStaff = 82;
      contextNote = 'Field Ops: 59 available vs 61 required (-2 gap)';
    }

    if (isHistorical) {
      availableLabel = 'Average On-Duty';
      if (period === '7 Days') {
        availableStaff = Math.round(availableStaff * 0.99);
        contextNote = `7-Day Average On-Duty: ${availableStaff} / ${totalHeadcount} staff`;
      } else if (period === '30 Days') {
        availableStaff = Math.round(availableStaff * 0.98);
        contextNote = `30-Day Average On-Duty: ${availableStaff} / ${totalHeadcount} staff`;
      } else {
        availableStaff = Math.round(availableStaff * 0.97);
        contextNote = `Quarter Average On-Duty: ${availableStaff} / ${totalHeadcount} staff`;
      }
    }

    const workforceGap = availableStaff - requiredStaff;
    const workforcePct = Math.round((availableStaff / requiredStaff) * 100);

    // 4. Operations
    let openOrders = 186;
    if (location === 'Mumbai') openOrders = 88;
    else if (location === 'Pune') openOrders = 42;
    else if (location === 'Bengaluru') openOrders = 34;
    else if (location === 'Hyderabad') openOrders = 14;
    else if (location === 'Delhi NCR') openOrders = 8;

    const overdueOrders = currentRecords.reduce((sum, r) => sum + r.workOrdersOverdue, 0) || 46;

    // 5. Customers
    const custSummary = this.calculateCustomerSummary(location);

    // 6. Contracts
    const contractsSummary = this.calculateContractsSummary();

    // 7. Dynamic Business Signal
    const signal = this.calculateBusinessSignal(period, location, department);

    // 8. Top Priorities
    const priorities = this.calculateTopPriorities(period, location);

    // 9. Department Signals
    const deptSignals = this.calculateDepartmentSignals(location);

    return {
      rev: {
        current: revCurrent,
        target: revTarget,
        variance: revVariance,
        growth,
        previousPeriod: revPrev,
        label: revLabels[period],
        dateRange,
      },
      fin: {
        marginPct,
        targetMarginPct,
        variancePp,
        revenue: revCurrent,
        operatingCost: opCost,
        overtimeCost,
        overtimeHours,
        receivables,
        dsoDays: 38,
      },
      sla: {
        compliance: slaCompliance,
        target: slaTarget,
        variancePp: slaVariance,
        atRiskCount: location === 'Pune' ? 2 : location === 'Bengaluru' ? 1 : period === 'Today' ? 12 : period === '7 Days' ? 18 : 24,
        criticalCount: location === 'Pune' || location === 'Bengaluru' ? 0 : 4,
        primaryDriver: 'Mumbai capacity pressure',
        affectedRegion: location === 'All Locations' ? 'Mumbai' : location,
        affectedCustomers: ['Acme Industries', 'Meridian Healthcare'],
        affectedOrdersCount: period === 'Today' ? 12 : period === '7 Days' ? 18 : 24,
      },
      workforce: {
        isHistorical,
        availableLabel,
        available: availableStaff,
        required: requiredStaff,
        totalHeadcount,
        gap: workforceGap,
        percentage: workforcePct,
        largestGapRegion: 'Mumbai',
        contextNote,
        causes: { absent: 3, certConstraints: 6, overloaded: 4 },
        loadedTechnicians: [
          { id: 'emp-10482', name: 'Amit Sharma', location: 'Mumbai', activeJobs: 7, priorityJobs: 3, slaRiskCount: 1 },
          { id: 'emp-10512', name: 'Rajesh Kumar', location: 'Mumbai', activeJobs: 6, priorityJobs: 2, slaRiskCount: 1 },
          { id: 'emp-10644', name: 'Suresh Patil', location: 'Pune', activeJobs: 5, priorityJobs: 1, slaRiskCount: 0 },
        ],
      },
      ops: {
        openOrders,
        completed: completedOrders || 48,
        inProgress: Math.max(10, openOrders - overdueOrders),
        overdue: overdueOrders,
        mttrHours: 2.8,
        firstTimeFixRate: 88.4,
      },
      cust: custSummary,
      contracts: contractsSummary,
      signal,
      priorities,
      deptSignals,
    };
  }

  // =========================================================================
  // CANONICAL HR VIEW MODEL GENERATOR
  // =========================================================================
  static getHrMetrics(filters: FilterState): HrMetricsViewModel {
    const { period, location, department } = filters;
    const { currentRecords, dateRange } = this.getPeriodRecords(period, location, department);

    // Filtered canonical workforce calculation
    let totalEmployees = 428;
    let presentOnDuty = 397;
    let approvedLeave = 21;
    let unplannedAbsent = 10;
    let openPositions = 14;
    let attritionRate = 1.8;
    let overtimeHours = 312;
    let overtimeCost = 14.6;

    if (location === 'Mumbai') {
      totalEmployees = 172;
      presentOnDuty = 156;
      approvedLeave = 11;
      unplannedAbsent = 5;
      openPositions = 7;
      overtimeHours = 196;
      overtimeCost = 9.2;
    } else if (location === 'Pune') {
      totalEmployees = 94;
      presentOnDuty = 89;
      approvedLeave = 4;
      unplannedAbsent = 1;
      openPositions = 3;
      overtimeHours = 48;
      overtimeCost = 2.2;
    } else if (location === 'Bengaluru') {
      totalEmployees = 86;
      presentOnDuty = 82;
      approvedLeave = 3;
      unplannedAbsent = 1;
      openPositions = 2;
      overtimeHours = 38;
      overtimeCost = 1.8;
    } else if (location === 'Hyderabad') {
      totalEmployees = 48;
      presentOnDuty = 45;
      approvedLeave = 2;
      unplannedAbsent = 1;
      openPositions = 1;
      overtimeHours = 18;
      overtimeCost = 0.8;
    } else if (location === 'Delhi NCR') {
      totalEmployees = 28;
      presentOnDuty = 25;
      approvedLeave = 1;
      unplannedAbsent = 2;
      openPositions = 1;
      overtimeHours = 12;
      overtimeCost = 0.6;
    }

    if (department === 'Field Operations') {
      totalEmployees = Math.round(totalEmployees * 0.48);
      presentOnDuty = Math.round(presentOnDuty * 0.47);
      approvedLeave = Math.round(approvedLeave * 0.50);
      unplannedAbsent = Math.round(unplannedAbsent * 0.60);
      openPositions = Math.max(4, Math.round(openPositions * 0.60));
      overtimeHours = Math.round(overtimeHours * 0.85);
    } else if (department === 'Engineering') {
      totalEmployees = Math.round(totalEmployees * 0.20);
      presentOnDuty = Math.round(presentOnDuty * 0.20);
      approvedLeave = Math.round(approvedLeave * 0.20);
      unplannedAbsent = Math.max(0, Math.round(unplannedAbsent * 0.10));
      openPositions = 2;
      overtimeHours = Math.round(overtimeHours * 0.10);
    }

    const isHistorical = period !== 'Today';
    if (isHistorical) {
      if (period === '7 Days') {
        presentOnDuty = Math.round(presentOnDuty * 0.99);
        overtimeHours = Math.round(overtimeHours * 5.8);
        overtimeCost = Math.round(overtimeCost * 5.8 * 10) / 10;
      } else if (period === '30 Days') {
        presentOnDuty = Math.round(presentOnDuty * 0.98);
        overtimeHours = Math.round(overtimeHours * 24.2);
        overtimeCost = Math.round(overtimeCost * 24.2 * 10) / 10;
      } else {
        presentOnDuty = Math.round(presentOnDuty * 0.97);
        overtimeHours = Math.round(overtimeHours * 68.5);
        overtimeCost = Math.round(overtimeCost * 68.5 * 10) / 10;
      }
    }

    const attendanceRate = totalEmployees > 0 ? Math.round((presentOnDuty / totalEmployees) * 100 * 10) / 10 : 92.8;

    const regionalCapacity = [
      { region: 'Mumbai', required: 84, available: 71, gap: -13, status: 'Deficit' as const },
      { region: 'Pune', required: 52, available: 49, gap: -3, status: 'Balanced' as const },
      { region: 'Bengaluru', required: 61, available: 59, gap: -2, status: 'Healthy' as const },
      { region: 'Hyderabad', required: 47, available: 45, gap: -2, status: 'Healthy' as const },
      { region: 'Delhi NCR', required: 38, available: 37, gap: -1, status: 'Healthy' as const },
    ].filter((r) => !location || location === 'All Locations' || r.region === location);

    const attendanceTrend = {
      labels: ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'],
      present: [392, 395, 396, 394, 398, 385, 397],
      leave: [24, 22, 21, 23, 20, 28, 21],
      absent: [12, 11, 11, 11, 10, 15, 10],
    };

    const recruitmentPipeline = {
      openPositions,
      applied: 182,
      screening: 64,
      technical: 36,
      interview: 18,
      offer: 9,
      joined: 7,
    };

    const peopleRisks = {
      certExpiring: 9,
      highAbsence: unplannedAbsent,
      overtimeHours,
      criticalHires: 4,
      attritionPct: attritionRate,
    };

    const payroll = {
      monthlyPayrollMasked: '₹1.82 Cr / mo',
      overtimeCostLakhs: overtimeCost,
      complianceStatus: '100% PF / ESI / Statutory Compliant',
    };

    const whatMatters = {
      title: 'CRITICAL WORKFORCE CAPACITY GAP — Mumbai Field Operations Hub',
      location: 'Mumbai Field Operations',
      gapText: '13 technicians below required capacity',
      required: 84,
      available: 71,
      ordersAffected: 18,
      overtimeHours,
    };

    return {
      pulse: {
        isHistorical,
        totalEmployees,
        joinersCount: 7,
        presentOnDuty,
        attendanceRate,
        approvedLeave,
        unplannedAbsent,
        openPositions,
        attritionRate,
        activeFilterNote: `${period} (${dateRange}) • ${location} • ${department}`,
      },
      whatMatters,
      secondary: {
        overtimeHours,
        overtimeCost,
        certificationsExpiring: 9,
        trainingCompletionPct: 86,
        openPositions,
        candidatesCount: 182,
      },
      regionalCapacity,
      attendanceTrend,
      recruitmentPipeline,
      peopleRisks,
      payroll,
    };
  }

  // =========================================================================
  // SUPPORTING CALCULATIONS & STATIC HELPERS
  // =========================================================================
  static calculateCustomerSummary(location?: string) {
    const customers = MOCK_CUSTOMERS.filter(
      (c) => !location || location === 'All Locations' || c.location === location
    );
    const totalAccounts = customers.length;
    const healthy = customers.filter((c) => c.health === 'healthy').length;
    const attention = customers.filter((c) => c.health === 'attention').length;
    const critical = customers.filter((c) => c.health === 'critical').length;

    const top = customers.find((c) => c.name === 'Acme Industries') || customers[0] || {
      name: 'Acme Industries',
      slaCompliance: 91,
      contractValue: '₹12.4L',
      openWorkOrders: 18,
    };

    return {
      totalAccounts,
      healthy,
      attention,
      critical,
      topExposure: {
        name: top.name,
        sla: top.slaCompliance,
        contractValue: top.contractValue,
        slaRisksCount: 3,
        openOrdersCount: top.openWorkOrders,
      },
    };
  }

  static calculateContractsSummary() {
    return {
      activeCount: 112,
      totalAcv: '₹18.7 Cr',
      totalAcvNum: 18.7,
      expiring30d: 7,
      atRiskCount: 8,
    };
  }

  static calculateBusinessSignal(period: TimePeriod, location?: string, department?: string) {
    if (location === 'Pune') {
      return {
        title: 'PLANNED PREVENTIVE MAINTENANCE SURGE',
        badge: 'Attention Required' as const,
        location: 'Pune Tech Zone',
        department: 'Field Operations',
        required: 52,
        available: 49,
        gap: -3,
        affectedOrders: 6,
        criticalSlaRisks: 0,
        contractExposure: '₹3.8L',
        primaryDriver: 'Scheduled HVAC overhauls for Vertex Properties',
        summaryText: 'PMM operations in Pune operate at 95.8% SLA with minor certification backlog for 3 technicians.',
      };
    }

    if (location === 'Bengaluru') {
      return {
        title: 'DATA CENTER COOLING EXPANSION',
        badge: 'Stable Growth' as const,
        location: 'Bengaluru Hub',
        department: 'Engineering',
        required: 61,
        available: 59,
        gap: -2,
        affectedOrders: 3,
        criticalSlaRisks: 0,
        contractExposure: '₹2.1L',
        primaryDriver: 'Sensor calibrations on Meridian Cloud Cluster',
        summaryText: 'Bengaluru operations maintain healthy SLA at 96.4% with optimal technician load distribution.',
      };
    }

    if (period === '7 Days') {
      return {
        title: 'EMERGENCY WORK ORDER SURGE',
        badge: 'Critical Issue' as const,
        location: 'Mumbai & Western Hubs',
        department: 'Field Operations',
        required: 84,
        available: 71,
        gap: -13,
        affectedOrders: 38,
        criticalSlaRisks: 6,
        contractExposure: '₹16.8L',
        primaryDriver: 'Monsoon-related chiller compressor trips',
        summaryText: '7-day emergency surge has consumed 312 hours of overtime, creating staffing strain in Mumbai.',
      };
    }

    if (period === '30 Days') {
      return {
        title: 'SLA MARGINAL COMPLIANCE DRAG',
        badge: 'Critical Issue' as const,
        location: 'Mumbai Field Operations',
        department: 'Field Operations',
        required: 410,
        available: 397,
        gap: -13,
        affectedOrders: 46,
        criticalSlaRisks: 8,
        contractExposure: '₹22.4L',
        primaryDriver: 'Technician certification bottlenecks & capacity deficit',
        summaryText: 'Over 30 days, SLA has averaged 94.2% (-1.8pp below target) driven by Mumbai capacity gap.',
      };
    }

    if (period === 'Quarter') {
      return {
        title: 'OVERTIME LABOR DRAGGING OPERATING MARGINS',
        badge: 'Attention Required' as const,
        location: 'All Operating Hubs',
        department: 'Field Operations',
        required: 410,
        available: 392,
        gap: -18,
        affectedOrders: 92,
        criticalSlaRisks: 12,
        contractExposure: '₹41.2L',
        primaryDriver: 'Reliance on emergency overtime instead of full-time hiring',
        summaryText: 'Cumulative overtime expenditure has compressed quarterly gross margins by 1.2pp.',
      };
    }

    // Default: Today
    return {
      title: 'OPERATING CAPACITY PRESSURE',
      badge: 'Critical Issue' as const,
      location: 'Mumbai Field Operations',
      department: 'Field Operations',
      required: 84,
      available: 71,
      gap: -13,
      affectedOrders: 18,
      criticalSlaRisks: 4,
      contractExposure: '₹12.4L',
      primaryDriver: 'Technician availability',
      summaryText: '84 required vs 71 available (-13 gap). 18 affected work orders, 4 critical SLA risks.',
    };
  }

  static calculateTopPriorities(period: TimePeriod, location?: string) {
    if (location === 'Pune') {
      return [
        { id: '01', title: 'Pune HVAC certification renewals (3 techs)', impactLevel: 'Medium impact' as const, actionType: 'workforce' as const },
        { id: '02', title: 'Vertex Properties chiller inspection milestone', impactLevel: 'Medium impact' as const, actionType: 'operations' as const },
        { id: '03', title: 'Pune hub quarterly spares replenishment', impactLevel: 'Normal' as const, actionType: 'operations' as const },
      ];
    }

    if (period === '7 Days') {
      return [
        { id: '01', title: 'Overtime cost containment in West Hub', impactLevel: 'High impact' as const, actionType: 'finance' as const },
        { id: '02', title: 'Emergency surge staffing in Mumbai', impactLevel: 'High impact' as const, actionType: 'workforce' as const },
        { id: '03', title: 'SLA recovery for Acme Industries Chiller Unit 2', impactLevel: 'High impact' as const, actionType: 'sla' as const },
      ];
    }

    if (period === '30 Days') {
      return [
        { id: '01', title: 'Authorize 5 Field Tech hires for Mumbai hub', impactLevel: 'High impact' as const, actionType: 'workforce' as const },
        { id: '02', title: 'Acme Industries SLA renegotiation & renewal', impactLevel: 'High impact' as const, actionType: 'contract' as const },
        { id: '03', title: 'Preventive maintenance backlog reduction', impactLevel: 'Medium impact' as const, actionType: 'operations' as const },
      ];
    }

    if (period === 'Quarter') {
      return [
        { id: '01', title: 'Workforce capacity expansion across tier-1 hubs', impactLevel: 'High impact' as const, actionType: 'workforce' as const },
        { id: '02', title: 'Enterprise contract renewal portfolio (₹2.3 Cr ACV)', impactLevel: 'High impact' as const, actionType: 'contract' as const },
        { id: '03', title: 'Automation & IoT sensor deployment for predictive maintenance', impactLevel: 'Medium impact' as const, actionType: 'operations' as const },
      ];
    }

    // Default: Today
    return [
      { id: '01', title: 'Mumbai capacity shortage (-13 techs)', impactLevel: 'High impact' as const, actionType: 'workforce' as const },
      { id: '02', title: 'Acme SLA exposure (WO-8921 risk)', impactLevel: 'High impact' as const, actionType: 'sla' as const },
      { id: '03', title: 'Contract renewals (7 expiring <30d)', impactLevel: 'Medium impact' as const, actionType: 'contract' as const },
    ];
  }

  static calculateDepartmentSignals(location?: string) {
    return [
      { name: 'Field Operations', status: 'warning' as const, label: 'Capacity pressure (-13 gap in Mumbai)', trend: 'down' as const },
      { name: 'Engineering', status: 'healthy' as const, label: 'Healthy (96% SLA on automation)', trend: 'up' as const },
      { name: 'Customer Support', status: 'healthy' as const, label: 'Stable (MTTR 2.8 hrs)', trend: 'stable' as const },
      { name: 'Sales', status: 'healthy' as const, label: 'Strong (+8.4% pipeline growth)', trend: 'up' as const },
      { name: 'HR & Admin', status: 'attention' as const, label: 'Staffing escalation active', trend: 'stable' as const },
    ];
  }

  static getPerformanceChartData(period: TimePeriod, location?: string, department?: string) {
    const { currentRecords } = this.getPeriodRecords(period, location, department);

    if (period === 'Today') {
      const labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
      const totalRev = currentRecords.reduce((sum, r) => sum + r.revenue, 0) || 1.72;
      const actual = [
        Math.round(totalRev * 0.15 * 100) / 100,
        Math.round(totalRev * 0.35 * 100) / 100,
        Math.round(totalRev * 0.55 * 100) / 100,
        Math.round(totalRev * 0.75 * 100) / 100,
        Math.round(totalRev * 0.90 * 100) / 100,
        Math.round(totalRev * 100) / 100,
      ];
      const target = [0.30, 0.62, 0.95, 1.25, 1.55, 1.85];
      const previous = [0.25, 0.52, 0.85, 1.15, 1.42, 1.62];
      return { labels, actual, target, previous, xTitle: 'Time of Day (Today: 22 Sep 2026)', unit: '₹ Lakhs' };
    }

    if (period === '7 Days') {
      const labels = ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'];
      const dailyMap: Record<string, number> = {};
      currentRecords.forEach((r) => {
        dailyMap[r.date] = (dailyMap[r.date] || 0) + r.revenue;
      });
      const dates = ['2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19', '2026-09-20', '2026-09-21', '2026-09-22'];
      const actual = dates.map((d) => Math.round((dailyMap[d] || 1.68) * 10) / 10);
      const target = [1.75, 1.75, 1.80, 1.80, 1.80, 0.90, 0.90];
      const previous = [1.55, 1.58, 1.60, 1.62, 1.60, 0.82, 0.84];
      return { labels, actual, target, previous, xTitle: 'Daily Revenue (Last 7 Days)', unit: '₹ Lakhs' };
    }

    if (period === '30 Days') {
      const labels = ['24-30 Aug', '31 Aug - 6 Sep', '7-13 Sep', '14-20 Sep', '21-22 Sep'];
      const totalRev = currentRecords.reduce((sum, r) => sum + r.revenue, 0) || 48.6;
      const actual = [
        Math.round(totalRev * 0.21 * 10) / 10,
        Math.round(totalRev * 0.23 * 10) / 10,
        Math.round(totalRev * 0.24 * 10) / 10,
        Math.round(totalRev * 0.25 * 10) / 10,
        Math.round(totalRev * 0.07 * 10) / 10,
      ];
      const target = [10.5, 11.0, 11.5, 12.0, 7.0];
      const previous = [9.2, 9.8, 10.1, 10.6, 5.1];
      return { labels, actual, target, previous, xTitle: 'Weekly Revenue Trajectory (Last 30 Days)', unit: '₹ Lakhs' };
    }

    // Quarter: Monthly 3 points (Jul, Aug, Sep)
    const labels = ['Jul 2026', 'Aug 2026', 'Sep 2026 (MTD)'];
    const actual = [45.9, 47.1, 48.6];
    const target = [48.0, 50.0, 52.0];
    const previous = [41.6, 43.2, 44.8];
    return { labels, actual, target, previous, xTitle: 'Monthly Run-Rate (Q2 FY26)', unit: '₹ Lakhs' };
  }

  // PRESERVED ACCESS METHODS
  static getEmployees(location?: string, department?: string) {
    return this.employees.filter((emp) => {
      const matchLoc = !location || location === 'All Locations' || emp.location === location;
      const matchDept = !department || department === 'All Departments' || emp.department === department;
      return matchLoc && matchDept;
    });
  }

  static getEmployeeById(id: string) {
    return this.employees.find((emp) => emp.id === id || emp.code === id);
  }

  static getCustomers(location?: string) {
    return MOCK_CUSTOMERS.filter((cust) => {
      return !location || location === 'All Locations' || cust.location === location;
    });
  }

  static getCustomerById(id: string) {
    return MOCK_CUSTOMERS.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
  }

  static getContracts() {
    return MOCK_CONTRACTS;
  }

  static getContractById(id: string) {
    return MOCK_CONTRACTS.find((cntr) => cntr.id === id || cntr.customerId === id);
  }

  static getWorkOrders(location?: string) {
    return this.workOrders.filter((wo) => {
      return !location || location === 'All Locations' || wo.location === location;
    });
  }

  static getWorkOrderById(id: string) {
    return this.workOrders.find((wo) => wo.id === id || wo.code === id);
  }

  static getWorkOrdersByCustomer(customerId: string) {
    return this.workOrders.filter((wo) => wo.customerId === customerId);
  }

  static getWorkOrdersByEmployee(employeeId: string) {
    return this.workOrders.filter((wo) => wo.assignedToId === employeeId);
  }

  static getDepartmentCapacity(location?: string) {
    return MOCK_DEPARTMENT_CAPACITY.filter((dept) => {
      return !location || location === 'All Locations' || dept.location === location;
    });
  }

  static getRecruitmentJobs() {
    return this.recruitmentJobs;
  }

  static createRecruitmentJob(job: Omit<RecruitmentJob, 'id' | 'postedDate' | 'currentApplicants' | 'interviews' | 'offers'>): RecruitmentJob {
    const newJob: RecruitmentJob = {
      ...job,
      id: `job-${Date.now()}`,
      postedDate: 'Today (Auto-Generated)',
      currentApplicants: 0,
      interviews: 0,
      offers: 0,
    };
    this.recruitmentJobs.unshift(newJob);
    return newJob;
  }

  static runSimulation(techniciansToAdd: number = 5): SimulationResult {
    const required = 84;
    const current = 71;
    const projectedAvailable = Math.min(required, current + techniciansToAdd);
    const projectedGap = projectedAvailable - required;
    const capacityGainPct = Math.round((techniciansToAdd / required) * 100 * 10) / 10;
    const slaImprovementPct = Math.round(Math.min(98.5 - 94.2, capacityGainPct * 0.45) * 10) / 10;

    return {
      additionalTechnicians: techniciansToAdd,
      capacityGainPct,
      estimatedMonthlyHiringCost: `₹${(techniciansToAdd * 65000).toLocaleString('en-IN')}`,
      slaImprovementPct,
      workOrdersStabilized: Math.min(18, Math.round(techniciansToAdd * 2.8)),
      contractRiskMitigated: '₹12.4L (Acme Industries & Meridian Protection)',
      projectedMumbaiCapacity: {
        required,
        currentAvailable: current,
        projectedAvailable,
        projectedGap,
      },
    };
  }

  static markNotificationRead(id: string) {
    const item = this.notifications.find((n) => n.id === id);
    if (item) item.unread = false;
  }

  static getNotifications() {
    return this.notifications;
  }
}
