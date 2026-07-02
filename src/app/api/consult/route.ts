import { NextResponse } from "next/server";
import { validateConsult } from "@/lib/validateConsult";

// Submission shape: { name, email, phone, location, message }, all strings.
// Only name + email are validated (see validateConsult.ts); phone, location, and
// message are free text passed through as-is. This structured shape is intended
// to later feed a scheduling system (dropping assessments onto a field calendar),
// so keep the field names stable even before that integration exists.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) ?? {};
  const { ok, errors } = validateConsult(body);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 400 });
  // TODO: wire to a real inbox (Resend/Formspree/SMTP) before launch - currently
  // submissions only reach the server console.
  console.log("consult request", body);
  return NextResponse.json({ ok: true });
}
