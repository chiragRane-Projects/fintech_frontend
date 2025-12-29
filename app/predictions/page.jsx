"use client"

import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import PredictionAnalytics from '@/components/predcitions/PredictionAnalysis'
import { useAuth } from '@/lib/auth-context'

// UI Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LockKeyhole, Sparkles, TrendingUp } from 'lucide-react'

export default function PredictionsPage() {
  const { user, loading } = useAuth() 

  // 1. Loading State: Full screen centered with subtle animation
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/80" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Syncing financial data...
        </p>
      </div>
    )
  }

  // 2. Unauthenticated State: Clean, centered "403" style card
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-dashed shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <LockKeyhole className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">Access Restricted</CardTitle>
              <CardDescription>
                You must be signed in to view your AI financial forecasts.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/auth">Sign In to Continue</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // 3. Main Dashboard: Authenticated
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10">
      
      {/* Decorative Background: Dot pattern + Radial fade */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl space-y-8">
        
        {/* Page Title Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between animate-in slide-in-from-bottom-4 duration-700 fade-in">
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit px-3 py-1 border-primary/20 bg-primary/5 text-primary mb-2">
              <Sparkles className="w-3 h-3 mr-2" /> 
              Beta Intelligence
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Future Insights
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              AI-driven forecasting based on your recent spending habits.
            </p>
          </div>
          
          {/* Contextual Info (Optional) */}
          <div className="hidden md:flex flex-col items-end text-sm text-muted-foreground">
             <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Model Confidence: High</span>
             </div>
             <p>Updated: Just now</p>
          </div>
        </div>

        {/* Analytics Component Wrapper */}
        <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-100 fade-in fill-mode-backwards">
          {/* Ensure userId is passed correctly. Using optional chaining just in case. */}
          <PredictionAnalytics userId={user?.user_id || user?._id || user?.id} />
        </section>

      </main>
    </div>
  )
}