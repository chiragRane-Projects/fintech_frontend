'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { ExpenseForm } from '@/components/expense/expense-form'
import { ExpenseList } from '@/components/expense/expense-list'
import { Button } from '@/components/ui/button'
import { TrendingUp, Plus, X } from 'lucide-react'

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [showMobileForm, setShowMobileForm] = useState(false)

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1)
    setShowMobileForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-primary text-primary-foreground rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Dashboard</h2>
            </div>
            <p className="text-primary-foreground/80">Track your expenses and manage your finances</p>
          </div>
        </div>

        {/* Mobile Add Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowMobileForm(!showMobileForm)}
            className="w-full h-12 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Expense</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Desktop Form */}
            <div className="lg:col-span-1 hidden lg:block">
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </div>
            
            {/* Mobile Form Modal */}
            {showMobileForm && (
              <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end">
                <div className="bg-card rounded-t-lg w-full max-h-[90vh] overflow-y-auto border-t">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Add Expense</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                  </div>
                </div>
              </div>
            )}
            
            <div className="lg:col-span-2">
              <ExpenseList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export { Dashboard }