import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 🛡️ The Alpha-7 SQL Database Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
