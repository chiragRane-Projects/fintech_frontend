'use client'

import { useAuth } from '@/lib/auth-context'
import { AuthForm } from '@/components/auth/auth-form'
import { Dashboard } from '@/components/dashboard'
import { LandingPage } from '@/components/landing-page'
import { useState } from 'react'

export default function Home() {
  const { user, loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    )
  }

  if (user) return <Dashboard />
  if (showAuth) return <AuthForm onBack={() => setShowAuth(false)} />
  return <LandingPage onGetStarted={() => setShowAuth(true)} />
}
