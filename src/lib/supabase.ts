import { createClient } from '@supabase/supabase-js';

const defaultSupabaseUrl = 'https://jredfufqrbasziqwhvxg.supabase.co';
const defaultSupabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZWRmdWZxcmJhc3ppcXdodjBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzM5MDB9.9J5Lwlz3VJ8bRq2b3JcG9u8R3vH6i2Y9K1N5t7k8XQc';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const envLooksLikeSecretKey = Boolean(envSupabaseAnonKey?.startsWith('sb_secret_'));

const useEnvConfig = Boolean(envSupabaseUrl && envSupabaseAnonKey) && !envLooksLikeSecretKey;

if (envLooksLikeSecretKey) {
  console.error(
    'Unsafe Supabase key detected: VITE_SUPABASE_ANON_KEY must be the public anon key, not an sb_secret_* key. Falling back to safe default key.',
  );
}

const supabaseUrl = useEnvConfig ? envSupabaseUrl! : defaultSupabaseUrl;
const supabaseAnonKey = useEnvConfig ? envSupabaseAnonKey! : defaultSupabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
