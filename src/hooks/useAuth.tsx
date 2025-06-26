// src/hooks/useAuth.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/browser';


export default function useAuth() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { subscription } = supabase.auth.onAuthStateChange((_event, sess) => {
      setUser(sess?.user ?? null)
      if (!sess) router.push('/auth/signin')
    })

    return () => subscription.unsubscribe()
  }, [router])

  return user
}
