import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getDb } from "../server/mongodb";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Please fill in the required fields correctly." });
  }

  const { name, email, phone, service, message } = parsed.data;
  try {
    const db = await getDb();
    await db.collection("contactSubmissions").insertOne({
      name,
      email,
      phone: phone || "",
      serviceNeeded: service || "",
      message,
      status: "New",
      createdAt: new Date(),
    });

    // Best-effort email alert to the MD via Gmail SMTP — never fails the request.
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_PASS;
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });
        await transporter.sendMail({
          from: `"Abucore Website" <${gmailUser}>`,
          to: process.env.NOTIFY_EMAIL || gmailUser,
          replyTo: email,
          subject: `New quote request from ${name}`,
          text:
            `New quote request via abucore.vercel.app\n\n` +
            `Name:    ${name}\n` +
            `Email:   ${email}\n` +
            `Phone:   ${phone || "—"}\n` +
            `Service: ${service || "—"}\n\n` +
            `Message:\n${message}\n`,
        });
      } catch (mailErr) {
        console.error("gmail send error", mailErr);
      }
    }

    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return res.status(500).json({ error: "Could not submit. Please try again." });
  }
}
