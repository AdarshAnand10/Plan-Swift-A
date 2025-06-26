// src/app/auth/signin/page.tsx
'use client'

import { supabase } from '@/lib/supabase/browser'

import SignInForm from '@/components/SignInForm'

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md">
      <SignInForm />
    </div>
  )
}
