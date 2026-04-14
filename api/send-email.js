import { Resend } from "resend";

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function normalizeStr(v) {
  return String(v ?? "").trim();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json(res, 500, { ok: false, error: "Missing RESEND_API_KEY" });

    const raw = await readBody(req);
    let body;
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      return json(res, 400, { ok: false, error: "Invalid JSON" });
    }

    const formType = normalizeStr(body.formType) || "unknown";
    const subject = normalizeStr(body.subject) || `Website form: ${formType}`;
    const replyTo = normalizeStr(body.replyTo);

    const payload = body.payload && typeof body.payload === "object" ? body.payload : {};
    const lines = Object.entries(payload)
      .map(([k, v]) => `${k}: ${normalizeStr(v)}`)
      .filter((x) => !x.endsWith(":"))
      .join("\n");

    const resend = new Resend(apiKey);
    const to = "worldcottradingcorpn@gmail.com";

    const text = `${lines}\n\n—\nSent from worldcot website`;

    const email = await resend.emails.send({
      from: "Worldcot Website <onboarding@resend.dev>",
      to,
      subject,
      text,
      ...(replyTo ? { replyTo } : {})
    });

    return json(res, 200, { ok: true, id: email?.data?.id ?? null });
  } catch (e) {
    return json(res, 500, { ok: false, error: "Server error" });
  }
}

