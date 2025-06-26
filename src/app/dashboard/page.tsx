'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user?.email || null);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading your data...</div>;

  if (!user) {
    return <div>Please sign in to access your dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome back, {user}</h1>
      {/* Render your actual dashboard content here */}
    </div>
  );
}
