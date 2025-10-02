import { createClient } from '@supabase/supabase-js'
import type { Database } from '../Types/database.types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in env')
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
