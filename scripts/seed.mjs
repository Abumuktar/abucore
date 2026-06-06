// One-time database setup: indexes, MD admin login, default settings, and a
// sample project so the tracker works immediately.
// Run with:  npm run seed   (requires Node 20.6+ for --env-file)
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "abucore";
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!uri) {
  console.error("✗ MONGODB_URI is not set. Did you create .env?");
  process.exit(1);
}

const MILESTONE_DEFS = [
  { key: "contract_signed", name: "Contract Signed" },
  { key: "mobilization", name: "Mobilization" },
  { key: "execution", name: "Execution In Progress" },
  { key: "quality_check", name: "Quality Check" },
  { key: "delivery", name: "Delivery & Handover" },
];
const freshMilestones = () =>
  MILESTONE_DEFS.map((m) => ({ ...m, completed: false, completedAt: null }));

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);

// Indexes
await db.collection("projects").createIndex({ projectId: 1 }, { unique: true });
await db.collection("admins").createIndex({ email: 1 }, { unique: true });
await db.collection("contactSubmissions").createIndex({ createdAt: -1 });
console.log("✓ indexes ready");

// MD admin login
if (adminEmail && adminPassword) {
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await db.collection("admins").updateOne(
    { email: adminEmail.toLowerCase() },
    {
      // Update the password on every run so credential changes take effect.
      $set: { email: adminEmail.toLowerCase(), passwordHash },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
  console.log("✓ admin ready:", adminEmail.toLowerCase());
} else {
  console.warn("! ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped admin seed");
}

// Default site settings
await db.collection("settings").updateOne(
  { _id: "site" },
  {
    $setOnInsert: {
      _id: "site",
      companyPhone: "09138266715",
      companyEmail: "abucoreenterprises@gmail.com",
      activeServices: [
        "Office Equipment & Stationery",
        "Furniture Supply",
        "Medical Consumables & Equipment",
        "Agricultural Inputs",
        "Uniforms & Textiles",
        "Building Construction",
        "Renovation & Maintenance",
        "Diesel & Fuel Supply",
        "Printing & Branding",
        "ICT Solutions & Software Development",
        "Contract Execution & Delivery",
        "Other",
      ].map((label, i) => ({ key: `svc-${i + 1}`, label, active: true })),
    },
  },
  { upsert: true },
);
console.log("✓ settings ready");

// Sample project (only if the collection is empty)
const count = await db.collection("projects").countDocuments();
if (count === 0) {
  const year = 2026;
  await db
    .collection("counters")
    .updateOne({ _id: `projectId-${year}` }, { $set: { seq: 1 } }, { upsert: true });

  const milestones = freshMilestones();
  milestones[0].completed = true;
  milestones[0].completedAt = new Date("2026-03-10");
  milestones[1].completed = true;
  milestones[1].completedAt = new Date("2026-03-15");
  milestones[2].completed = true;
  milestones[2].completedAt = new Date("2026-03-20");

  await db.collection("projects").insertOne({
    projectId: `ABU-${year}-001`,
    clientName: "Katsina State Ministry of Education",
    clientPhone: "08000000000",
    clientEmail: "",
    serviceType: "Office Equipment & Stationery",
    description: "Supply of office furniture and stationery across 12 LGAs.",
    contractValue: 4500000,
    startDate: new Date("2026-03-10"),
    expectedEndDate: new Date("2026-04-10"),
    internalNotes: "Sample seeded project — safe to delete.",
    manualStatus: null,
    milestones,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("✓ sample project: ABU-2026-001");
} else {
  console.log(`• ${count} project(s) already exist — skipped sample`);
}

await client.close();
console.log("Done.");
