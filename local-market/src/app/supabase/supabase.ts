import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wokzrkrfihbnqqdyewrf.supabase.co';

const supabaseKey = 'sb_publishable_A5E22X6hv4_2zH-VeL4LNQ_5Qf3tzAI';

export const supabase = createClient(supabaseUrl, supabaseKey);