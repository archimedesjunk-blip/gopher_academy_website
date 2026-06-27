import { NextResponse } from "next/server";
import { validateConsult } from "@/lib/validateConsult";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) ?? {};
  const { ok, errors } = validateConsult(body);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 400 });
  // TODO: wire to real email/CRM (Resend, Formspree, or SMTP). For now, log server-side.
  console.log("consult request", body);
  return NextResponse.json({ ok: true });
}
