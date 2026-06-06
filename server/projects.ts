import type { Db } from "mongodb";

export type MilestoneKey =
  | "contract_signed"
  | "mobilization"
  | "execution"
  | "quality_check"
  | "delivery";

export interface Milestone {
  key: MilestoneKey;
  name: string;
  completed: boolean;
  completedAt: Date | string | null;
}

export type ProjectStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Cancelled";

/** The five fixed milestones every project moves through, in order. */
export const MILESTONE_DEFS: { key: MilestoneKey; name: string }[] = [
  { key: "contract_signed", name: "Contract Signed" },
  { key: "mobilization", name: "Mobilization" },
  { key: "execution", name: "Execution In Progress" },
  { key: "quality_check", name: "Quality Check" },
  { key: "delivery", name: "Delivery & Handover" },
];

export function freshMilestones(): Milestone[] {
  return MILESTONE_DEFS.map((m) => ({ ...m, completed: false, completedAt: null }));
}

/** Status is derived from milestones; a manual On Hold / Cancelled overrides it. */
export function deriveStatus(
  milestones: Milestone[],
  manualStatus?: ProjectStatus | null,
): ProjectStatus {
  if (manualStatus === "On Hold" || manualStatus === "Cancelled") return manualStatus;
  const done = milestones.filter((m) => m.completed).length;
  if (done === 0) return "Pending";
  if (done >= milestones.length) return "Completed";
  return "In Progress";
}

/** Whitelisted projection returned to the public tracker — never leaks
 *  internalNotes, contractValue, or client phone/email. */
export function toPublicProject(p: any) {
  const milestones: Milestone[] = (p.milestones || []).map((m: Milestone) => ({
    key: m.key,
    name: m.name,
    completed: m.completed,
    completedAt: m.completedAt ?? null,
  }));
  return {
    projectId: p.projectId,
    description: p.description,
    clientName: p.clientName,
    serviceType: p.serviceType,
    startDate: p.startDate,
    expectedEndDate: p.expectedEndDate,
    milestones,
    status: deriveStatus(milestones, p.manualStatus),
  };
}

/** Atomically allocate the next sequential Project ID for a given year:
 *  ABU-YYYY-001, ABU-YYYY-002, ... */
export async function generateProjectId(db: Db, year: number): Promise<string> {
  const counters = db.collection<{ _id: string; seq: number }>("counters");
  const doc = await counters.findOneAndUpdate(
    { _id: `projectId-${year}` },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  const seq = doc?.seq ?? 1;
  return `ABU-${year}-${String(seq).padStart(3, "0")}`;
}

/** Full project shape returned to the authenticated MD dashboard (includes
 *  the private fields the public tracker never sees). */
export function toAdminProject(p: any) {
  const milestones: Milestone[] = (p.milestones || []).map((m: Milestone) => ({
    key: m.key,
    name: m.name,
    completed: !!m.completed,
    completedAt: m.completedAt ?? null,
  }));
  const done = milestones.filter((m) => m.completed).length;
  return {
    projectId: p.projectId,
    clientName: p.clientName,
    clientPhone: p.clientPhone || "",
    clientEmail: p.clientEmail || "",
    serviceType: p.serviceType,
    description: p.description,
    contractValue: p.contractValue ?? 0,
    startDate: p.startDate ?? null,
    expectedEndDate: p.expectedEndDate ?? null,
    internalNotes: p.internalNotes || "",
    manualStatus: p.manualStatus ?? null,
    milestones,
    status: deriveStatus(milestones, p.manualStatus),
    progress: milestones.length ? Math.round((done / milestones.length) * 100) : 0,
    createdAt: p.createdAt ?? null,
    updatedAt: p.updatedAt ?? null,
  };
}

/** Append an entry to the activity feed shown on the dashboard Overview. */
export async function logActivity(db: Db, projectId: string, message: string) {
  try {
    await db.collection("activity").insertOne({ projectId, message, createdAt: new Date() });
  } catch {
    /* activity logging is best-effort */
  }
}
