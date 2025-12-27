'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-context'
import { TrendingUp, Shield, Smartphone, BarChart3, PieChart, Wallet, Moon, Sun } from 'lucide-react'

const LandingPage = ({ onGetStarted }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              FinanceTracker
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              Take Control of Your
              <span className="block text-primary mt-2">
                Financial Future
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Track expenses, analyze spending patterns, and make smarter financial decisions with our elegant expense tracking platform.
            </p>
            
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Get Started Free
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Mobile First</h3>
              <p className="text-muted-foreground">Optimized for mobile use. Track expenses on the go with our responsive design.</p>
            </div>
            
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Smart Analytics</h3>
              <p className="text-muted-foreground">Get insights into your spending habits with detailed analytics and reports.</p>
            </div>
            
            <div className="text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">Your financial data is encrypted and secure. We prioritize your privacy.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export { LandingPage }