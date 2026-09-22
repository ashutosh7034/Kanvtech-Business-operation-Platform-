export type UserRole = 'ceo' | 'hr';

export type StatusHealth = 'healthy' | 'attention' | 'critical';
export type WorkOrderStatus = 'completed' | 'in_progress' | 'pending' | 'overdue';
export type WorkOrderPriority = 'critical' | 'high' | 'medium' | 'low';
export type AttendanceStatus = 'present' | 'on_leave' | 'absent' | 'late';
export type ContractStatus = 'active' | 'expiring_30' | 'expiring_90' | 'at_risk';

export interface Employee {
  id: string;
  code: string; // e.g. EMP-10482
  name: string;
  role: string;
  department: string;
  location: string;
  manager: string;
  email: string;
  phone: string;
  status: AttendanceStatus;
  joinedDate: string;
  workloadTasks: number;
  slaRiskCount: number;
  performanceScore: number; // e.g. 87%
  certifications: string[];
  certExpiryDays?: number;
  skills: string[];
  monthlyPayrollMasked: string;
  hourlyRate: number;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  industry: string;
  contractValue: string; // e.g. ₹12.4L / ₹1.4 Cr
  contractValueNum: number;
  openWorkOrders: number;
  slaCompliance: number; // e.g. 91%
  health: StatusHealth;
  accountOwner: string;
  location: string;
  activeContractsCount: number;
  riskReasons?: string[];
}

export interface Contract {
  id: string;
  contractNumber: string;
  customerId: string;
  customerName: string;
  valueAnnual: string;
  valueNum: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  slaTarget: number; // e.g. 96%
  status: ContractStatus;
  scopeOfWork: string;
  penaltyClause: string;
  assignedServiceLead: string;
}

export interface WorkOrder {
  id: string;
  code: string; // e.g. WO-8921
  customerId: string;
  customerName: string;
  title: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assignedToId?: string;
  assignedToName: string;
  location: string;
  createdDate: string;
  dueDate: string;
  slaDeadline: string;
  slaRemainingHours: number;
  slaRisk: boolean;
  category: string;
  description: string;
  resolutionTimeHours?: number;
}

export interface DepartmentCapacity {
  department: string;
  location: string;
  requiredStaff: number;
  availableStaff: number;
  gap: number; // e.g. -13
  utilization: number; // e.g. 87%
  criticalRolesNeeded: string[];
}

export interface RecruitmentJob {
  id: string;
  title: string;
  department: string;
  location: string;
  requiredCount: number;
  currentApplicants: number;
  interviews: number;
  offers: number;
  priority: 'critical' | 'high' | 'medium';
  status: 'open' | 'interviewing' | 'offer' | 'filled';
  reason: string;
  skillsRequired: string[];
  postedDate: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  stage: 'applied' | 'screening' | 'interview' | 'technical' | 'hr' | 'offer' | 'joined';
  rating: number; // out of 5
  experienceYears: number;
  email: string;
  phone: string;
  currentCompany: string;
}

export interface CertificationItem {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  certificationName: string;
  authority: string;
  issueDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'active' | 'expiring' | 'expired';
}

export interface TrainingProgram {
  id: string;
  title: string;
  department: string;
  enrolledCount: number;
  completedCount: number;
  completionRate: number;
  trainer: string;
  dueDate: string;
}

export interface AssetItem {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  status: 'operational' | 'maintenance_due' | 'critical';
  lastServiced: string;
  nextServiceDue: string;
  customerSite: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockLevel: number;
  minThreshold: number;
  unitValue: number;
  totalValue: number;
  status: 'adequate' | 'low' | 'critical';
}

export interface AttentionItem {
  id: string;
  level: 'critical' | 'attention' | 'info';
  title: string;
  impactText: string;
  impactValue: string;
  actionText: string;
  actionType: 'open_work_orders' | 'open_workforce' | 'open_contracts' | 'open_recruitment';
  targetLocation?: string;
  entityId?: string;
}

export interface ActivityFeedItem {
  id: string;
  time: string;
  text: string;
  severity: 'urgent' | 'warning' | 'info' | 'normal';
  tag: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'sla' | 'workforce' | 'contract' | 'finance' | 'system';
  linkTarget?: string;
}
