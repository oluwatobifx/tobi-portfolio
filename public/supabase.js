// ================= Supabase connection =================
// The publishable (anon) key is safe to ship in a public website.
// Row Level Security on the table (see supabase/schema.sql) only lets
// visitors ADD a message; nobody can read messages without logging in
// to your Supabase dashboard.
export const SUPABASE_URL = 'https://vjupthrbcymkygrrfmpo.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_tL3cN5Laq12qEw3GdweKZA_Jm2lkoV5';

export async function saveMessage(msg) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(msg),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}
