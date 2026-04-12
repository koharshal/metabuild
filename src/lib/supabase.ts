import { createClient } from '@supabase/supabase-js';

// Primary config: env vars (set in Vercel dashboard or .env.local)
// Fallback: hardcoded project credentials for development without .env
const FALLBACK_URL = 'https://jredfufqrbasziqwhvxg.supabase.co';
const FALLBACK_ANON_KEY = 'sb_publishable_dcYwx0g3A2-XnZ6...';
// ⚠️ ACTION REQUIRED: Paste the full anon key from your Supabase dashboard
// (Project Settings → API → anon public key) into VITE_SUPABASE_ANON_KEY
// in your Vercel project environment variables.

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Guard against accidentally using a secret key
if (envKey?.startsWith('sb_secret_')) {
  console.error(
    '[Supabase] VITE_SUPABASE_ANON_KEY is a secret key — use the public anon key instead.',
  );
}

const supabaseUrl = (envUrl?.trim() || FALLBACK_URL);
const supabaseAnonKey = (envKey?.trim() && !envKey.startsWith('sb_secret_'))
  ? envKey.trim()
  : FALLBACK_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // Fail fast — don't let slow/broken connections block the UI for minutes
    fetch: (url, options) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 8000); // 8s timeout
      return fetch(url, { ...options, signal: controller.signal }).finally(() =>
        clearTimeout(id),
      );
    },
  },
});
