const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const to = process.env.CONTACT_TO || "umar24nov@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  const html = `
    <div style="font-family: 'JetBrains Mono', monospace; background: #0a0a0f; color: #e6e6f0; padding: 24px; border-radius: 8px;">
      <div style="font-size: 12px; letter-spacing: 3px; color: #00ff88; margin-bottom: 16px;">NEW PORTFOLIO CONTACT</div>
      <p style="margin: 4px 0;"><strong style="color: #ff6b35;">NAME:</strong> ${esc(name)}</p>
      <p style="margin: 4px 0;"><strong style="color: #ff6b35;">EMAIL:</strong> ${esc(email)}</p>
      <p style="margin: 4px 0;"><strong style="color: #ff6b35;">SUBJECT:</strong> ${esc(subject || "(none)")}</p>
      <div style="margin-top: 16px; border-top: 1px solid #33334d; padding-top: 16px;">${esc(message)}</div>
    </div>
  `;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: `Mohd Umar <${from}>`,
        to,
        reply_to: to,
        subject: `New contact from ${esc(name)}${subject ? ` — ${esc(subject)}` : ""}`,
        html,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("Resend error:", r.status, errText);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
