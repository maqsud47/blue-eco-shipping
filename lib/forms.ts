/**
 * POST a form payload to Web3Forms.
 * The access key is read at runtime from NEXT_PUBLIC_WEB3FORMS_KEY.
 */

export type Web3FormsPayload = Record<string, string | undefined> & {
  subject: string;
  from_name: string;
  // Honeypot: real users leave this empty.
  botcheck?: string;
};

export async function submitToWeb3Forms(
  payload: Web3FormsPayload
): Promise<{ ok: true } | { ok: false; error: "config" | "network" }> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) return { ok: false, error: "config" };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, ...payload }),
    });
    const data = (await res.json()) as { success?: boolean };
    if (!res.ok || !data.success) return { ok: false, error: "network" };
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}
