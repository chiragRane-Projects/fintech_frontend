'use client'

import { useAuth } from '@/lib/auth-context'
import { Dashboard } from '@/components/dashboard'
import { LandingPage } from '@/components/landing-page'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg font-medium text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return <LandingPage />
}
