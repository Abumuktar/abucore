export type ProjectStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export interface PublicMilestone {
  key: string;
  name: string;
  completed: boolean;
  completedAt: string | null;
}

export interface PublicProject {
  projectId: string;
  description: string;
  clientName: string;
  serviceType: string;
  startDate: string;
  expectedEndDate: string;
  milestones: PublicMilestone[];
  status: ProjectStatus;
}

/** Tailwind classes for the status badge, keyed by status. */
export const STATUS_STYLES: Record<ProjectStatus, string> = {
  Pending: "bg-muted text-muted-foreground border-border",
  "In Progress": "bg-gold/15 text-gold border-gold/30",
  Completed: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  "On Hold": "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

/** Full project record shown in the MD dashboard (includes private fields). */
export interface AdminProject {
  projectId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: string;
  description: string;
  contractValue: number;
  startDate: string | null;
  expectedEndDate: string | null;
  internalNotes: string;
  manualStatus: "On Hold" | "Cancelled" | null;
  milestones: PublicMilestone[];
  status: ProjectStatus;
  progress: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ProjectSummary {
  projectId: string;
  clientName: string;
  serviceType: string;
  contractValue: number;
  status: ProjectStatus;
  progress: number;
  createdAt: string | null;
}

/** Service options for the new-project form (also the site's default list). */
export const SERVICE_OPTIONS = [
  "Office Equipment & Stationery",
  "Furniture Supply",
  "Medical Consumables & Equipment",
  "Agricultural Inputs",
  "Uniforms & Textiles",
  "Building Construction",
  "Renovation & Maintenance",
  "Facility Upgrades",
  "Diesel & Fuel Supply",
  "Printing & Branding",
  "ICT Solutions & Software Development",
  "Contract Execution & Delivery",
  "Other",
];

/** Format a number as Nigerian Naira, e.g. 4500000 → "₦4,500,000". */
export function formatNaira(value: number): string {
  return "₦" + (value || 0).toLocaleString("en-NG");
}

/** ISO/date string → "YYYY-MM-DD" for <input type="date"> values. */
export function dateInputValue(value?: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}
