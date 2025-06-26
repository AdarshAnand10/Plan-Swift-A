'use client';

import { useSearchParams } from 'next/navigation';
import SignInForm from '@/components/SignInForm';

export default function SignInWithParams() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md">
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}
      <SignInForm />
    </div>
  );
}
