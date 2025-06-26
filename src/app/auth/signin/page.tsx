'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {/* Inputs for email/password and sign-in button */}
    </div>
  );
}
