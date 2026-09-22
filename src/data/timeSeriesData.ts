// Deterministic 90-Day Time-Series Data Engine for KANVTECH Business Operations
// Spans 2026-06-24 to 2026-09-22 (Current Date: 22 Sep 2026)

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Mon, Tue, etc.
  location: string;
  department: string;
  revenue: number; // in Lakhs (INR)
  operatingCost: number; // in Lakhs (INR)
  workOrdersCreated: number;
  workOrdersCompleted: number;
  workOrdersOverdue: number;
  workOrdersWithinSla: number;
  employeesTotal: number;
  employeesRequired: number;
  employeesAvailable: number; // present on-duty
  employeesLeave: number;
  employeesAbsent: number;
  employeesCertUnavailable: number;
  employeesOverloaded: number;
  overtimeHours: number;
  overtimeCost: number; // in Lakhs
  attritionCount: number;
  joinersCount: number;
  openPositions: number;
}

const LOCATIONS = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi NCR'] as const;
const DEPARTMENTS = [
  'Field Operations',
  'Engineering & Automation',
  'Customer Support',
  'Sales & Enterprise Accounts',
  'Administration & HR',
] as const;

// Base distribution weights across locations (Total Staff = 428)
// Mumbai: 172 (40.2%), Pune: 94 (22.0%), Bengaluru: 86 (20.1%), Hyderabad: 48 (11.2%), Delhi NCR: 28 (6.5%)
const LOCATION_CONFIG: Record<string, { revShare: number; totalStaff: number; reqStaff: number }> = {
  Mumbai: { revShare: 0.42, totalStaff: 172, reqStaff: 172 },
  Pune: { revShare: 0.22, totalStaff: 94, reqStaff: 94 },
  Bengaluru: { revShare: 0.20, totalStaff: 86, reqStaff: 86 },
  Hyderabad: { revShare: 0.10, totalStaff: 48, reqStaff: 48 },
  'Delhi NCR': { revShare: 0.06, totalStaff: 28, reqStaff: 28 },
};

// Department weights (Field Operations represents the majority of frontline staff: 248 of 428)
const DEPT_CONFIG: Record<string, { revWeight: number; staffRatio: number }> = {
  'Field Operations': { revWeight: 0.58, staffRatio: 0.58 }, // 248 staff
  'Engineering & Automation': { revWeight: 0.22, staffRatio: 0.18 }, // 78 staff
  'Customer Support': { revWeight: 0.08, staffRatio: 0.10 }, // 42 staff
  'Sales & Enterprise Accounts': { revWeight: 0.09, staffRatio: 0.08 }, // 34 staff
  'Administration & HR': { revWeight: 0.03, staffRatio: 0.06 }, // 26 staff
};

// Precise ground truth staffing map for 2026-09-22 (Total 428 = 397 present, 21 leave, 10 absent)
const SNAPSHOT_STAFFING: Record<string, Record<string, { total: number; req: number; avail: number; leave: number; absent: number; ot: number; open: number }>> = {
  Mumbai: {
    'Field Operations': { total: 104, req: 104, avail: 91, leave: 9, absent: 4, ot: 28, open: 6 },
    'Engineering & Automation': { total: 32, req: 32, avail: 30, leave: 1, absent: 1, ot: 4, open: 2 },
    'Customer Support': { total: 16, req: 16, avail: 15, leave: 1, absent: 0, ot: 2, open: 1 },
    'Sales & Enterprise Accounts': { total: 12, req: 12, avail: 12, leave: 0, absent: 0, ot: 0, open: 0 },
    'Administration & HR': { total: 8, req: 8, avail: 8, leave: 0, absent: 0, ot: 0, open: 0 },
  }, // Mumbai sum: total 172, avail 156, leave 11, absent 5
  Pune: {
    'Field Operations': { total: 56, req: 56, avail: 53, leave: 2, absent: 1, ot: 8, open: 2 },
    'Engineering & Automation': { total: 18, req: 18, avail: 17, leave: 1, absent: 0, ot: 2, open: 1 },
    'Customer Support': { total: 10, req: 10, avail: 9, leave: 0, absent: 1, ot: 1, open: 0 },
    'Sales & Enterprise Accounts': { total: 6, req: 6, avail: 6, leave: 0, absent: 0, ot: 0, open: 0 },
    'Administration & HR': { total: 4, req: 4, avail: 4, leave: 0, absent: 0, ot: 0, open: 0 },
  }, // Pune sum: total 94, avail 89, leave 3, absent 2
  Bengaluru: {
    'Field Operations': { total: 50, req: 50, avail: 48, leave: 1, absent: 1, ot: 6, open: 2 },
    'Engineering & Automation': { total: 16, req: 16, avail: 15, leave: 1, absent: 0, ot: 2, open: 0 },
    'Customer Support': { total: 8, req: 8, avail: 8, leave: 0, absent: 0, ot: 1, open: 0 },
    'Sales & Enterprise Accounts': { total: 7, req: 7, avail: 6, leave: 1, absent: 0, ot: 0, open: 0 },
    'Administration & HR': { total: 5, req: 5, avail: 5, leave: 0, absent: 0, ot: 0, open: 0 },
  }, // Bengaluru sum: total 86, avail 82, leave 3, absent 1
  Hyderabad: {
    'Field Operations': { total: 24, req: 24, avail: 23, leave: 1, absent: 0, ot: 4, open: 1 },
    'Engineering & Automation': { total: 8, req: 8, avail: 7, leave: 0, absent: 1, ot: 1, open: 0 },
    'Customer Support': { total: 5, req: 5, avail: 4, leave: 1, absent: 0, ot: 1, open: 0 },
    'Sales & Enterprise Accounts': { total: 6, req: 6, avail: 5, leave: 1, absent: 0, ot: 0, open: 0 },
    'Administration & HR': { total: 5, req: 5, avail: 5, leave: 0, absent: 0, ot: 0, open: 0 },
  }, // Hyderabad sum: total 48, avail 44, leave 3, absent 1
  'Delhi NCR': {
    'Field Operations': { total: 14, req: 14, avail: 14, leave: 0, absent: 0, ot: 2, open: 0 },
    'Engineering & Automation': { total: 4, req: 4, avail: 4, leave: 0, absent: 0, ot: 0, open: 0 },
    'Customer Support': { total: 3, req: 3, avail: 3, leave: 0, absent: 0, ot: 0, open: 0 },
    'Sales & Enterprise Accounts': { total: 3, req: 3, avail: 3, leave: 0, absent: 0, ot: 0, open: 0 },
    'Administration & HR': { total: 4, req: 4, avail: 2, leave: 1, absent: 1, ot: 0, open: 0 },
  }, // Delhi NCR sum: total 28, avail 26, leave 1, absent 1
};
// Overall Ground Truth Verification:
// Total = 172 + 94 + 86 + 48 + 28 = 428
// Avail = 156 + 89 + 82 + 44 + 26 = 397
// Leave = 11 + 3 + 3 + 3 + 1 = 21
// Absent = 5 + 2 + 1 + 1 + 1 = 10
// 397 + 21 + 10 = 428 EXACT.

function generateDailyRecords(): DailyRecord[] {
  const records: DailyRecord[] = [];
  const startDate = new Date('2026-06-24T00:00:00Z');
  const endDate = new Date('2026-09-22T00:00:00Z');

  const daysDiff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let d = 0; d <= daysDiff; d++) {
    const curr = new Date(startDate.getTime() + d * 86400000);
    const dateStr = curr.toISOString().split('T')[0];
    const dow = daysOfWeek[curr.getUTCDay()];
    const isWeekend = dow === 'Sat' || dow === 'Sun';

    // Base daily revenue total across company ~₹1.62L - ₹1.82L on weekdays
    // Real growth factor: +8.4% YoY over 90 days
    const growthFactor = 1 + (d / daysDiff) * 0.084;
    const daySeed = (d * 17 + 31) % 100;
    const weekdayMultiplier = isWeekend ? 0.55 : 1.0 + (daySeed - 50) * 0.002;
    const totalDailyBaseRevenue = 1.72 * growthFactor * weekdayMultiplier;

    LOCATIONS.forEach((loc) => {
      const locCfg = LOCATION_CONFIG[loc];

      DEPARTMENTS.forEach((dept) => {
        const deptCfg = DEPT_CONFIG[dept];
        const rev = Math.round(totalDailyBaseRevenue * locCfg.revShare * deptCfg.revWeight * 1000) / 1000;
        const cost = Math.round(rev * (dept === 'Field Operations' ? 0.74 : 0.68) * 1000) / 1000;

        const snap = SNAPSHOT_STAFFING[loc]?.[dept] || {
          total: 10,
          req: 10,
          avail: 9,
          leave: 1,
          absent: 0,
          ot: 2,
          open: 0,
        };

        let totalStaff = snap.total;
        let reqStaff = snap.req;
        let availStaff = snap.avail;
        let leaveStaff = snap.leave;
        let absentStaff = snap.absent;
        let overtimeHrs = snap.ot;
        let openPos = snap.open;
        let joiners = d % 14 === 0 && loc === 'Mumbai' && dept === 'Field Operations' ? 1 : 0;
        let attrition = d % 30 === 0 && loc === 'Pune' && dept === 'Field Operations' ? 1 : 0;

        // Add subtle historical variability for previous days
        if (dateStr !== '2026-09-22') {
          const varSeed = ((d + loc.length + dept.length) * 13) % 7;
          if (dept === 'Field Operations') {
            const shift = varSeed > 4 ? 1 : varSeed < 2 ? -1 : 0;
            availStaff = Math.max(1, Math.min(totalStaff, availStaff + shift));
            leaveStaff = Math.max(0, Math.min(totalStaff - availStaff, leaveStaff - shift));
            absentStaff = Math.max(0, totalStaff - availStaff - leaveStaff);
            overtimeHrs = isWeekend ? 2 : Math.max(2, overtimeHrs + shift * 2);
          }
        }

        // Work orders
        const isField = dept === 'Field Operations';
        const baseCreated = isField
          ? Math.max(1, Math.round(locCfg.revShare * 54 * (isWeekend ? 0.35 : 1.0)))
          : Math.max(0, Math.round(locCfg.revShare * 8));
        const completed = isField ? Math.round(baseCreated * (loc === 'Mumbai' ? 0.88 : 0.96)) : baseCreated;
        const overdue = isField ? Math.max(0, baseCreated - completed + (loc === 'Mumbai' ? 2 : 0)) : 0;
        const withinSla = Math.round(completed * (loc === 'Mumbai' ? 0.91 : 0.97));
        const overtimeCost = Math.round((overtimeHrs * 480) / 100000 * 1000) / 1000;

        records.push({
          date: dateStr,
          dayOfWeek: dow,
          location: loc,
          department: dept,
          revenue: rev,
          operatingCost: cost,
          workOrdersCreated: baseCreated,
          workOrdersCompleted: completed,
          workOrdersOverdue: overdue,
          workOrdersWithinSla: withinSla,
          employeesTotal: totalStaff,
          employeesRequired: reqStaff,
          employeesAvailable: availStaff,
          employeesLeave: leaveStaff,
          employeesAbsent: absentStaff,
          employeesCertUnavailable: dept === 'Field Operations' && loc === 'Mumbai' ? 6 : 1,
          employeesOverloaded: dept === 'Field Operations' && loc === 'Mumbai' ? 4 : 0,
          overtimeHours: overtimeHrs,
          overtimeCost: overtimeCost,
          attritionCount: attrition,
          joinersCount: joiners,
          openPositions: openPos,
        });
      });
    });
  }

  return records;
}

export const TIME_SERIES_DATA: DailyRecord[] = generateDailyRecords();

