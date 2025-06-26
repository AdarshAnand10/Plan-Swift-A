// src/app/layout.tsx
import './globals.css'
import { supabase } from '@/lib/supabase/browser'
import { SessionContextProvider } from '@supabase/ssr/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  )
}
