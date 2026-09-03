import { LeadPayload } from "./types";

/**
 * Microsoft Graph, called directly with client credentials.
 *
 * Deliberately not Power Automate: its HTTP request trigger is a premium
 * connector, so the obvious "website -> flow -> list" route would cost about
 * $15/user/month. Talking to Graph ourselves costs nothing beyond the
 * Business Basic licence already in place.
 */

const TENANT = process.env.MS_TENANT_ID;
const CLIENT_ID = process.env.MS_CLIENT_ID;
const CLIENT_SECRET = process.env.MS_CLIENT_SECRET;
const SITE_ID = process.env.MS_SITE_ID;
const LIST_ID = process.env.MS_LIST_ID;
const SENDER = process.env.MS_SENDER_UPN;

export const graphConfigured = Boolean(
  TENANT && CLIENT_ID && CLIENT_SECRET && SITE_ID && LIST_ID
);
export const mailConfigured = Boolean(TENANT && CLIENT_ID && CLIENT_SECRET && SENDER);

/** Tokens last an hour; cache so a burst of submissions reuses one. */
let cached: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID as string,
        client_secret: CLIENT_SECRET as string,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Token request failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = {
    token: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return cached.token;
}

/**
 * Column names must match the internal names of the SharePoint list. If a
 * column is renamed in the UI its internal name does NOT change, so read the
 * internal name from the list settings rather than guessing from the label.
 */
export async function createLeadItem(lead: LeadPayload): Promise<void> {
  const token = await getToken();
  const fields = {
    Title: `${lead.firstName} ${lead.secondName}`.trim(),
    Email: lead.email,
    Phone: lead.phoneNumber,
    Product: lead.productOffering,
    PreferredContact: lead.preferredContact || "",
    LocationType: lead.locationType || "",
    County: lead.county || "",
    Country: lead.country || "",
    Notes: lead.notes || "",
    PageUrl: lead.pageUrl || "",
    UtmSource: lead.utmSource || "",
    UtmMedium: lead.utmMedium || "",
    UtmCampaign: lead.utmCampaign || "",
    Status: "New",
  };

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`List insert failed (${res.status}): ${await res.text()}`);
  }
}

export async function sendMail(options: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const token = await getToken();
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      SENDER as string
    )}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: options.subject,
          body: { contentType: "HTML", content: options.html },
          toRecipients: options.to.map((address) => ({
            emailAddress: { address },
          })),
          ...(options.replyTo
            ? { replyTo: [{ emailAddress: { address: options.replyTo } }] }
            : {}),
        },
        saveToSentItems: true,
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`sendMail failed (${res.status}): ${await res.text()}`);
  }
}
