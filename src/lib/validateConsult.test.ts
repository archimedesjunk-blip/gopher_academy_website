import { describe, it, expect } from "vitest";
import { validateConsult } from "./validateConsult";

describe("validateConsult", () => {
  it("requires name and email", () => {
    const r = validateConsult({});
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeTruthy();
    expect(r.errors.email).toBeTruthy();
  });

  it("rejects a malformed email", () => {
    const r = validateConsult({ name: "Marisol Vega", email: "not-an-email" });
    expect(r.ok).toBe(false);
    expect(r.errors.email).toBeTruthy();
  });

  it("accepts a valid minimal submission", () => {
    const r = validateConsult({ name: "Marisol Vega", email: "m@tierraalta.com" });
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual({});
  });
});
