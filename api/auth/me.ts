import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSession } from "../../server/auth";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  return res.status(200).json({ email: session.email });
}
