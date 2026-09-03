import { LeadPayload } from "./types";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const row = (label: string, value?: string) =>
  value
    ? `<tr><td style="padding:4px 16px 4px 0;color:#6b6b76;font:13px system-ui">${label}</td><td style="padding:4px 0;color:#171717;font:14px system-ui">${esc(
        value
      )}</td></tr>`
    : "";

/** Posted into the Sales Dpt channel via its email address. */
export function teamNotification(lead: LeadPayload) {
  const where =
    lead.locationType === "KENYA"
      ? lead.county || "Kenya"
      : lead.country || "Outside Kenya";

  return {
    subject: `New lead · ${lead.productOffering} · ${lead.firstName} ${lead.secondName}`,
    html: `
      <div style="font:14px system-ui;color:#171717">
        <p style="margin:0 0 4px;font:600 12px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#991212">New website lead</p>
        <h2 style="margin:0 0 16px;font:400 22px Georgia,serif;color:#212466">${esc(
          lead.firstName
        )} ${esc(lead.secondName)}</h2>
        <table style="border-collapse:collapse">
          ${row("Product", lead.productOffering)}
          ${row("Email", lead.email)}
          ${row("Phone", lead.phoneNumber)}
          ${row("Prefers", lead.preferredContact)}
          ${row("Location", where)}
          ${row("Notes", lead.notes)}
          ${row("Page", lead.pageUrl)}
          ${row("Campaign", [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / "))}
        </table>
        <p style="margin:18px 0 0;color:#6b6b76;font:13px system-ui">
          Reply to this message to reach them directly.
        </p>
      </div>`,
  };
}

/** Sent to the enquirer so they know a person has it. */
export function acknowledgement(lead: LeadPayload) {
  return {
    subject: "We have your enquiry — Benchmark Building Solutions",
    html: `
      <div style="font:15px/1.6 system-ui;color:#171717;max-width:520px">
        <p style="margin:0 0 16px">Hi ${esc(lead.firstName)},</p>
        <p style="margin:0 0 16px">
          Thank you for getting in touch about
          <strong>${esc(lead.productOffering)}</strong>. Your enquiry has
          reached our team and someone will contact you
          ${lead.preferredContact ? `by ${esc(lead.preferredContact.toLowerCase())}` : "shortly"}.
        </p>
        <p style="margin:0 0 16px">
          If anything is urgent in the meantime, you can reach us on
          +254 722 333 324.
        </p>
        <p style="margin:0 0 4px">Benchmark Building Solutions Ltd</p>
        <p style="margin:0;color:#6b6b76;font-size:13px">
          Room F10, K-Unity Building, Kiambu Town
        </p>
      </div>`,
  };
}
