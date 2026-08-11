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

  const { type, name, email, message } = req.body || {};
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const to = process.env.CONTACT_TO || "umar24nov@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  const html = `
    <div style="font-family: 'JetBrains Mono', monospace; background: #0a0a0f; color: #e6e6f0; padding: 24px; border-radius: 8px;">
      <div style="font-size: 12px; letter-spacing: 3px; color: #d63384; margin-bottom: 16px;">PORTFOLIO FEEDBACK</div>
      <p style="margin: 4px 0;"><strong style="color: #d63384;">TYPE:</strong> ${esc(type || "Bug Report")}</p>
      <p style="margin: 4px 0;"><strong style="color: #d63384;">NAME:</strong> ${esc(name || "Anonymous")}</p>
      <p style="margin: 4px 0;"><strong style="color: #d63384;">EMAIL:</strong> ${esc(email || "(none)")}</p>
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
        subject: `Feedback [${esc(type || "Bug Report")}] from ${esc(name || "Anonymous")}`,
        html,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("Resend error:", r.status, errText);
      return res.status(502).json({ error: "Failed to send feedback" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Feedback error:", err);
    return res.status(500).json({ error: "Failed to send feedback" });
  }
}
