import { CONTACT } from "@/data/site";

export type Lead = {
  name: string;
  email: string;
  message: string;
  business?: string;
  link?: string;
  /** Any extra fields to include in the email (label -> value). */
  extra?: Record<string, string>;
};

export function leadSummary(lead: Lead) {
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Business: ${lead.business || "-"}`,
    `Website / Google Business Profile: ${lead.link || "-"}`,
  ];
  Object.entries(lead.extra ?? {}).forEach(([k, v]) => lines.push(`${k}: ${v}`));
  lines.push("", lead.message);
  return lines.join("\n");
}

/**
 * Sends a lead to CONTACT.email. Uses Web3Forms when a key is set, otherwise
 * FormSubmit. Throws on failure so the caller can show a fallback.
 */
export async function deliverLead(lead: Lead, subject: string) {
  const fields = {
    name: lead.name,
    email: lead.email,
    business: lead.business || "-",
    website_or_gbp_link: lead.link || "-",
    ...(lead.extra ?? {}),
    message: lead.message,
  };

  if (CONTACT.web3formsKey) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: CONTACT.web3formsKey,
        subject,
        from_name: lead.name,
        ...fields,
      }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) throw new Error("web3forms failed");
    return;
  }

  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _replyto: lead.email,
      _template: "table",
      _captcha: "false",
    }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result.success === "false" || result.success === false) {
    throw new Error("formsubmit failed");
  }
}
