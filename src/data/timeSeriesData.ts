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
  'Engineering',
  'Customer Support',
  'Sales',
  'HR',
  'Procurement',
  'Administration',
] as const;

// Base distribution weights across locations (Total Staff = 428)
// Mumbai: 172 (40.2%), Pune: 94 (22.0%), Bengaluru: 86 (20.1%), Hyderabad: 48 (11.2%), Delhi NCR: 28 (6.5%)
const LOCATION_CONFIG: Record<string, { revShare: number; totalStaff: number; reqStaff: number }> = {
  Mumbai: { revShare: 0.42, totalStaff: 172, reqStaff: 172 },
  Pune: { revShare: 0.21, totalStaff: 94, reqStaff: 94 },
  Bengaluru: { revShare: 0.19, totalStaff: 86, reqStaff: 86 },
  Hyderabad: { revShare: 0.11, totalStaff: 48, reqStaff: 48 },
  'Delhi NCR': { revShare: 0.07, totalStaff: 28, reqStaff: 28 },
};

// Department weights (Field Operations represents the majority of frontline staff)
const DEPT_CONFIG: Record<string, { revWeight: number; staffRatio: number }> = {
  'Field Operations': { revWeight: 0.55, staffRatio: 0.48 }, // 205 staff
  Engineering: { revWeight: 0.20, staffRatio: 0.20 },        // 85 staff
  'Customer Support': { revWeight: 0.08, staffRatio: 0.12 }, // 51 staff
  Sales: { revWeight: 0.12, staffRatio: 0.08 },              // 34 staff
  HR: { revWeight: 0.01, staffRatio: 0.04 },                 // 17 staff
  Procurement: { revWeight: 0.02, staffRatio: 0.04 },        // 18 staff
  Administration: { revWeight: 0.02, staffRatio: 0.04 },     // 18 staff
};

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
    const totalDailyBaseRevenue = 1.62 * growthFactor * weekdayMultiplier;

    LOCATIONS.forEach((loc) => {
      const locCfg = LOCATION_CONFIG[loc];

      DEPARTMENTS.forEach((dept) => {
        const deptCfg = DEPT_CONFIG[dept];
        const rev = Math.round(totalDailyBaseRevenue * locCfg.revShare * deptCfg.revWeight * 1000) / 1000;
        const cost = Math.round(rev * (dept === 'Field Operations' ? 0.75 : 0.70) * 1000) / 1000;

        const baseTotalStaff = Math.max(1, Math.round(locCfg.totalStaff * deptCfg.staffRatio));
        let totalStaff = baseTotalStaff;
        let reqStaff = baseTotalStaff;
        let availStaff = baseTotalStaff;
        let leaveStaff = Math.max(0, Math.round(baseTotalStaff * 0.05));
        let absentStaff = Math.max(0, Math.round(baseTotalStaff * 0.02));
        let certUnavail = Math.round(baseTotalStaff * 0.03);
        let overloaded = Math.round(baseTotalStaff * 0.04);
        let overtimeHrs = isWeekend ? 2 : 6;
        let joiners = d % 14 === 0 && loc === 'Mumbai' ? 1 : 0;
        let attrition = d % 30 === 0 && loc === 'Pune' ? 1 : 0;
        let openPos = loc === 'Mumbai' && dept === 'Field Operations' ? 5 : 1;

        // Specific canonical ground truth on 2026-09-22 (Today)
        if (dateStr === '2026-09-22') {
          if (loc === 'Mumbai' && dept === 'Field Operations') {
            totalStaff = 84;
            reqStaff = 84;
            availStaff = 71;
            leaveStaff = 10;
            absentStaff = 3;
            certUnavail = 6;
            overloaded = 4;
            overtimeHrs = 28;
            openPos = 5;
          } else if (loc === 'Pune' && dept === 'Field Operations') {
            totalStaff = 52;
            reqStaff = 52;
            availStaff = 49;
            leaveStaff = 2;
            absentStaff = 1;
            overtimeHrs = 8;
            openPos = 2;
          } else if (loc === 'Bengaluru' && dept === 'Field Operations') {
            totalStaff = 61;
            reqStaff = 61;
            availStaff = 59;
            leaveStaff = 1;
            absentStaff = 1;
            overtimeHrs = 6;
            openPos = 2;
          } else if (loc === 'Hyderabad' && dept === 'Field Operations') {
            totalStaff = 47;
            reqStaff = 47;
            availStaff = 45;
            leaveStaff = 1;
            absentStaff = 1;
            overtimeHrs = 4;
            openPos = 1;
          } else if (loc === 'Delhi NCR' && dept === 'Field Operations') {
            totalStaff = 38;
            reqStaff = 38;
            availStaff = 37;
            leaveStaff = 1;
            absentStaff = 0;
            overtimeHrs = 2;
            openPos = 1;
          } else {
            // Other departments
            leaveStaff = Math.max(0, Math.round(baseTotalStaff * 0.04));
            absentStaff = Math.max(0, Math.round(baseTotalStaff * 0.01));
            availStaff = Math.max(1, totalStaff - leaveStaff - absentStaff);
          }
        } else {
          // Historical records
          if (loc === 'Mumbai' && dept === 'Field Operations') {
            totalStaff = 84;
            reqStaff = 84;
            const gap = Math.round(Math.sin(d * 0.25) * 3) - 12; // deficit of ~9 to 14 techs
            availStaff = Math.max(68, Math.min(84, 84 + gap));
            leaveStaff = Math.max(2, Math.round((84 - availStaff) * 0.7));
            absentStaff = Math.max(1, 84 - availStaff - leaveStaff);
            overtimeHrs = 24 + (d % 8);
          } else {
            leaveStaff = Math.max(0, Math.round(baseTotalStaff * 0.05));
            absentStaff = Math.max(0, Math.round(baseTotalStaff * 0.02));
            availStaff = Math.max(1, totalStaff - leaveStaff - absentStaff);
          }
        }

        // Work orders
        const isField = dept === 'Field Operations';
        const baseCreated = isField
          ? Math.max(1, Math.round(locCfg.revShare * 60 * (isWeekend ? 0.4 : 1.0)))
          : Math.max(0, Math.round(locCfg.revShare * 14));
        const completed = isField ? Math.round(baseCreated * (loc === 'Mumbai' ? 0.88 : 0.95)) : baseCreated;
        const overdue = isField ? Math.max(0, baseCreated - completed + (loc === 'Mumbai' ? 2 : 0)) : 0;
        const withinSla = Math.round(completed * (loc === 'Mumbai' ? 0.91 : 0.97));
        const overtimeCost = Math.round((overtimeHrs * 460) / 100000 * 1000) / 1000;

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
          employeesCertUnavailable: certUnavail,
          employeesOverloaded: overloaded,
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
