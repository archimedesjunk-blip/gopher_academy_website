// Only the fields the validator checks. Other form fields (phone, location,
// message) are posted and logged server-side but need no validation.
export type ConsultInput = {
  name: string;
  email: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateConsult(input: Partial<ConsultInput>): {
  ok: boolean;
  errors: Partial<Record<keyof ConsultInput, string>>;
} {
  const errors: Partial<Record<keyof ConsultInput, string>> = {};
  if (!input.name?.trim()) errors.name = "Please enter your name.";
  if (!input.email?.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL.test(input.email)) errors.email = "Please enter a valid email.";
  return { ok: Object.keys(errors).length === 0, errors };
}
