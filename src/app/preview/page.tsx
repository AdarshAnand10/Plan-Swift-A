'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PreviewPage() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email || null;
      setUser(email);
      setLoading(false);

      if (email) {
        // Optionally fetch user-specific plan from Supabase if needed
        const { data } = await supabase
          .from('plans')
          .select('*')
          .eq('user_email', email)
          .single();
        setPlan(data);
      }
    }
    loadSession();
  }, []);

  if (loading) return <div>Loading you in…</div>;
  if (!user) return <div>Please sign in to view your preview.</div>;

  return (
    <div>
      <h1>Your Plan Preview</h1>
      {plan ? (
        <pre>{JSON.stringify(plan, null, 2)}</pre>
      ) : (
        <p>No plan available yet. Generate one first!</p>
      )}
    </div>
  );
}
