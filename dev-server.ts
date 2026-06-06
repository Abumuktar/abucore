// Local-only API server. Runs the same /api serverless handlers behind Express
// so the whole app works on localhost without the Vercel CLI.
// Started by `npm run dev:server` (and together with Vite via `npm run dev:local`).
import "dotenv/config";
import express from "express";

import track from "./api/track";
import contact from "./api/contact";
import publicSettings from "./api/settings";
import auth from "./api/auth/[action]";
import submissionsList from "./api/admin/submissions/index";
import submissionById from "./api/admin/submissions/[id]";
import projectsList from "./api/admin/projects/index";
import projectById from "./api/admin/projects/[id]";
import projectMilestones from "./api/admin/projects/[id]/milestones";
import overview from "./api/admin/overview";
import adminSettings from "./api/admin/settings";

const app = express();
app.use(express.json());

// Adapt a Vercel-style handler to Express: merge route params into req.query
// (so `[id]` handlers that read req.query.id keep working) and catch errors.
const wrap =
  (handler: (req: any, res: any) => unknown) =>
  async (req: express.Request, res: express.Response) => {
    try {
      const merged = { ...(req.query || {}), ...(req.params || {}) };
      Object.defineProperty(req, "query", {
        value: merged,
        writable: true,
        configurable: true,
        enumerable: true,
      });
      await handler(req, res);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) res.status(500).json({ error: "Server error" });
    }
  };

app.get("/api/track", wrap(track));
app.post("/api/contact", wrap(contact));
app.get("/api/settings", wrap(publicSettings));

app.all("/api/auth/:action", wrap(auth));

app.get("/api/admin/submissions", wrap(submissionsList));
app.all("/api/admin/submissions/:id", wrap(submissionById));

app.all("/api/admin/projects", wrap(projectsList));
app.patch("/api/admin/projects/:id/milestones", wrap(projectMilestones));
app.all("/api/admin/projects/:id", wrap(projectById));

app.get("/api/admin/overview", wrap(overview));
app.all("/api/admin/settings", wrap(adminSettings));

const PORT = Number(process.env.API_PORT) || 3001;
app.listen(PORT, () => {
  console.log(`✓ API ready on http://localhost:${PORT}`);
  if (!process.env.MONGODB_URI) console.warn("! MONGODB_URI not set — check your .env");
});
