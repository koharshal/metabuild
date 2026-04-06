import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jredfufqrbasziqwhvxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZWRmdWZxcmJhc3ppcXdodjBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzM5MDB9.9J5Lwlz3VJ8bRq2b3JcG9u8R3vH6i2Y9K1N5t7k8XQc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
