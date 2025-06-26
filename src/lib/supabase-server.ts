import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

export const supabaseServer = () =>
  createServerComponentClient({
    headers,
    cookies,
  });
