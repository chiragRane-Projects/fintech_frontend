'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Header } from '@/components/layout/header'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MetricsCards } from '@/components/analytics/metrics-cards'
import { RiskAlerts } from '@/components/analytics/risk-alerts'
import { SpendingChart } from '@/components/analytics/spending-chart'
import { FixedExpenseRatio } from '@/components/analytics/fixed-expense-ratio'
import { api } from '@/lib/api'
import { Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AnalyticsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [intelligence, setIntelligence] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  const fetchIntelligence = async () => {
    if (!user) return
    
    try {
      setLoadingData(true)
      const data = await api.getIntelligenceSummary(user.user_id, currentMonth, currentYear)
      setIntelligence(data)
    } catch (err) {
      console.error('Failed to fetch intelligence:', err)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    fetchIntelligence()
  }, [user, currentMonth, currentYear])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg font-medium text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">Financial Intelligence</CardTitle>
                  <p className="text-muted-foreground">AI-powered insights for {months[currentMonth - 1]} {currentYear}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={currentMonth.toString()} onValueChange={(value) => setCurrentMonth(parseInt(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={month} value={(index + 1).toString()}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={currentYear.toString()} onValueChange={(value) => setCurrentYear(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025].map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {loadingData ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-muted-foreground">Analyzing your financial data...</div>
          </div>
        ) : intelligence ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <MetricsCards intelligence={intelligence} />

            {/* Risk Flags */}
            <RiskAlerts riskFlags={intelligence.risk_flags} />

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FixedExpenseRatio ratio={intelligence.fixed_expense_ratio} />
              <SpendingChart categories={intelligence.top_categories} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No data available</h3>
            <p className="text-muted-foreground">Add some expenses to see your financial intelligence</p>
          </div>
        )}
      </main>
    </div>
  )
}