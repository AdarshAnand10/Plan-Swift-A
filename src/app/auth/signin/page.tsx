'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SignInWithParams from './SignInWithParams';

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInWithParams />
    </Suspense>
  );
}
