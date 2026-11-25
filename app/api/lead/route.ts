import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const CRM_ENDPOINT = 'https://crm.mediagarh.com/CRM/api/leads/create';
const CRM_API_KEY = 'b62d20f5cd5e82d3ee1cfe7fc85cccbbe43db37e36830923557c912602afe023';
const CRM_FORM_ID = 96;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const rawName = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '')
    .trim()
    .replace(/\D/g, '');
  const role = String(body.role ?? '');
  const source = String(body.source ?? '');

  if (rawName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 10) {
    return NextResponse.json({ ok: false, error: 'Invalid details' }, { status: 422 });
  }

  const [firstName, ...rest] = rawName.split(' ');
  const lastName = rest.length ? rest.join(' ') : rawName;

  const lead = { name: rawName, email, phone, role, source, createdAt: new Date().toISOString() };

  // 1) Mediagarh CRM
  try {
    const crmPayload = {
      form_id: CRM_FORM_ID,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      utm_source: String(body.utm_source ?? ''),
      utm_medium: String(body.utm_medium ?? ''),
      utm_campaign: String(body.utm_campaign ?? ''),
      landing_url: String(body.landing_url ?? ''),
      referrer_url: String(body.referrer_url ?? ''),
      custom_fields: {
        field_field_1795592786034_j5q92: {
          label: 'Name',
          type: 'text',
          value: rawName,
          map_to: 'first_name',
        },
        field_field_1795592787719_1t9ek: {
          label: 'Email Address',
          type: 'email',
          value: email,
          map_to: 'email',
        },
        field_field_1795592789402_yv8mv: {
          label: 'Phone Number',
          type: 'phone',
          value: phone,
          map_to: 'phone_number',
        },
      },
    };

    const crmRes = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': CRM_API_KEY,
      },
      body: JSON.stringify(crmPayload),
    });

    if (!crmRes.ok) {
      const text = await crmRes.text().catch(() => '');
      console.error('CRM lead failed', crmRes.status, text);
    } else {
      console.log('CRM lead created for', email);
    }
  } catch (err) {
    console.error('CRM request threw', err);
  }

  // 2) Optional generic webhook (Zapier / Make / Google Sheets)
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error('Lead webhook failed', err);
    }
  }

  // 3) Local file for development (data/leads.jsonl, git-ignored)
  try {
    const dir = path.join(process.cwd(), 'data');
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(lead) + '\n');
  } catch (err) {
    console.error('Could not write lead file', err);
  }

  console.log('New lead:', lead);
  return NextResponse.json({ ok: true });
}
