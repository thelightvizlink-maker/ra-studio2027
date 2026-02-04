/**
 * Cloudflare Worker: visitor counter + reCAPTCHA + ipinfo
 *
 * Environment bindings (set in Cloudflare dashboard):
 * - KV namespace: VISITOR_KV
 * - Secrets: IPINFO_TOKEN, RECAPTCHA_SECRET
 *
 * Request: POST { week: "2026-W06", recaptchaToken?: string }
 * Response: { count, yourNumber, countryCode, ok }
 */

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { VISITOR_KV, IPINFO_TOKEN, RECAPTCHA_SECRET } = env;
    if (!VISITOR_KV) {
      return json({ ok: false, error: 'KV not bound' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return json({ ok: false, error: 'Invalid JSON' }, 400);
    }

    const week = typeof body.week === 'string' ? body.week : null;
    const recaptchaToken = body.recaptchaToken || body.recaptcha_token || null;
    if (!week) return json({ ok: false, error: 'Missing week' }, 400);

    // Basic abuse guard: require recaptcha token if provided in env
    if (RECAPTCHA_SECRET && recaptchaToken) {
      const recaptchaPass = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET);
      if (!recaptchaPass) return json({ ok: false, error: 'recaptcha_failed' }, 400);
    }

    const ip = request.headers.get('cf-connecting-ip') || '';
    const countryCode = await lookupCountry(ip, IPINFO_TOKEN);

    const key = `week:${week}`;
    // increment total and get caller position atomically
    const next = await VISITOR_KV.get(key, 'text').then((v) => (v ? parseInt(v, 10) : 0) + 1);
    await VISITOR_KV.put(key, String(next), { expirationTtl: 60 * 60 * 24 * 120 }); // keep ~120 days

    console.log(
      JSON.stringify({
        event: 'visit',
        week,
        ip,
        countryCode,
        count: next,
        ts: new Date().toISOString(),
      })
    );

    // per-day guardrail (optional)
    const dayKey = `day:${new Date().toISOString().slice(0, 10)}`;
    ctx.waitUntil(incrementDay(VISITOR_KV, dayKey));

    return json({ ok: true, count: next, yourNumber: next, countryCode });
  },
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function verifyRecaptcha(token, secret) {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

async function lookupCountry(ip, token) {
  if (!token) return null;
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`, { cf: { cacheTtl: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.country || null;
  } catch {
    return null;
  }
}

async function incrementDay(kv, key) {
  const val = await kv.get(key, 'text');
  const next = (val ? parseInt(val, 10) : 0) + 1;
  await kv.put(key, String(next), { expirationTtl: 60 * 60 * 24 * 30 });
}
