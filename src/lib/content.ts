// This is the one file a non-expert edits: contact info and feature flags.
// - `phone`, `email`, and `serviceArea` are the public contact details.
// - `flags` turns whole pieces of copy on and off. Flip a flag to `true` only
//   once the underlying claim is actually true.
// - `testimonials` must contain only real quotes from the post-service survey.
//   Never invent one.

export type Testimonial = { quote: string; name: string; town: string };

export const content = {
  nav: [
    { label: "Poison-free", href: "#promise" },
    { label: "How it works", href: "#methods" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Request a free quote", href: "#consult" },
  serviceArea: "Serving Sonoma County, California",
  email: "hello@gopheracademy.biz", // TODO: confirm the real inbox with Archie before launch
  phone: "(707) 555-0123", // TODO: PLACEHOLDER. Swap for the real number before launch. Use the 10-digit US number only, no leading 1 or +1 (the tel: link below adds it).
  insuredLine: "Insured", // rendered only when flags.showInsuredLine is true
  testimonials: [] as Testimonial[], // real quotes from the post-service survey only. NEVER invent one.
  flags: {
    showPhone: true, // placeholder number is intentionally visible pre-launch
    showTestimonials: false, // flip once real survey quotes are added to `testimonials`
    showBeforeAfter: false, // flip once real photos exist in public/photos/
    showInsuredLine: false, // flip ONLY once liability insurance is actually in force
  },
};

// Click-to-call href derived from the display number; owners edit `phone` only.
export const phoneHref = "tel:+1" + content.phone.replace(/\D/g, "");
