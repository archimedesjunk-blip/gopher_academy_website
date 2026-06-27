import { NextResponse } from "next/server";
import { validateConsult } from "@/lib/validateConsult";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) ?? {};
  const safe = typeof body === "object" && body !== null ? body : {};
  const { ok, errors } = validateConsult(safe);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 400 });
  // TODO: wire to real email/CRM (Resend, Formspree, or SMTP). For now, log server-side.
  console.log("consult request", body);
  return NextResponse.json({ ok: true });
}
