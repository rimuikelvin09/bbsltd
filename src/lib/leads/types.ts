/**
 * The lead record, as it leaves the browser and as it is stored.
 *
 * Keep this in step with the SharePoint list columns in graph.ts. It is the
 * contract between the form, the API route and every destination — adding a
 * CRM later means adding a destination, not changing this shape.
 */
export interface LeadPayload {
  /**
   * One name field, not three. The old form made first and second name
   * separately mandatory, which is friction for nothing - nobody searches a
   * lead list by surname before they have even spoken to the person.
   */
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredContact?: string;
  locationType?: string;
  county?: string;
  country?: string;
  notes?: string;
  consent: boolean;

  /** Which product page the form was opened from. */
  productOffering: string;

  /** Attribution, captured silently. Worth nothing today, everything later. */
  pageUrl?: string;
  /** Where they were before they arrived. Answers "is SEO working". */
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  /** Anti-spam. Never rendered to a human; a filled honeypot means a bot. */
  website?: string;
  /** Milliseconds the form was open before submitting. */
  elapsedMs?: number;
}

export interface LeadResult {
  ok: boolean;
  /** Per-destination outcome, so a failed notification never loses the lead. */
  stored: boolean;
  notified: boolean;
  acknowledged: boolean;
  errors: string[];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Kenyan and international forms, loosely: 9-15 digits with optional +. */
const PHONE = /^\+?[\d\s()-]{9,20}$/;

export function validateLead(input: unknown): {
  data?: LeadPayload;
  errors: string[];
} {
  const errors: string[] = [];
  if (typeof input !== "object" || input === null) {
    return { errors: ["Malformed request body."] };
  }
  const b = input as Record<string, unknown>;
  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");

  const fullName = str("fullName");
  const email = str("email");
  const phoneNumber = str("phoneNumber");

  if (!fullName) errors.push("Your name is required.");
  if (!EMAIL.test(email)) errors.push("A valid email address is required.");
  if (!PHONE.test(phoneNumber)) errors.push("A valid phone number is required.");
  if (b.consent !== true) errors.push("Consent is required.");

  // Cheap sanity caps so a bot cannot post a novel into the list.
  if (fullName.length > 120) errors.push("Name too long.");
  if (str("notes").length > 2000) errors.push("Notes too long.");

  if (errors.length) return { errors };

  return {
    errors: [],
    data: {
      fullName,
      email,
      phoneNumber,
      preferredContact: str("preferredContact"),
      locationType: str("locationType"),
      county: str("county"),
      country: str("country"),
      notes: str("notes"),
      consent: true,
      productOffering: str("productOffering") || "UNSPECIFIED",
      pageUrl: str("pageUrl"),
      referrer: str("referrer"),
      utmSource: str("utmSource"),
      utmMedium: str("utmMedium"),
      utmCampaign: str("utmCampaign"),
      website: str("website"),
      elapsedMs: typeof b.elapsedMs === "number" ? b.elapsedMs : undefined,
    },
  };
}
