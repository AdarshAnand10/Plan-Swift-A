'use client';

import { useSearchParams } from 'next/navigation';
import SignInForm from '@/components/SignInForm'; // adjust path to your actual SignIn form component

export default function SignInWithParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div>
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}
      <SignInForm />
    </div>
  );
}
