'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { Trash2, Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react'
import { toast } from 'sonner'

const ExpenseList = ({ refreshTrigger }) => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const { user } = useAuth()

  const fetchExpenses = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const data = await api.getExpenses(user.user_id, currentMonth, currentYear)
      setExpenses(data)
    } catch (err) {
      console.error('Failed to fetch expenses:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [user, currentMonth, currentYear, refreshTrigger])

  const handleDelete = async (expenseId) => {
    try {
      await api.deleteExpense(expenseId)
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId))
      toast.success('Expense deleted successfully')
    } catch (err) {
      toast.error('Failed to delete expense')
    }
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const fixedExpenses = expenses.filter(exp => exp.is_fixed).reduce((sum, exp) => sum + exp.amount, 0)
  const variableExpenses = totalAmount - fixedExpenses

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Housing': 'bg-green-100 text-green-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Shopping': 'bg-pink-100 text-pink-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Insurance': 'bg-gray-100 text-gray-800',
      'Other': 'bg-slate-100 text-slate-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-gray-600">Loading expenses...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span>Expenses</span>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
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
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-primary text-primary-foreground rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <div className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</div>
            </div>
            
            <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Fixed</span>
              </div>
              <div className="text-2xl font-bold">₹{fixedExpenses.toFixed(2)}</div>
            </div>
            
            <div className="bg-accent text-accent-foreground rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Variable</span>
              </div>
              <div className="text-2xl font-bold">₹{variableExpenses.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
            <p className="text-gray-500">No expenses for {months[currentMonth - 1]} {currentYear}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-card rounded-lg border hover:shadow-md transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold dark:text-zinc-100 text-gray-900">
                        ₹{expense.amount.toFixed(2)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ₹{getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                      {expense.is_fixed && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          Fixed
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {expense.description && (
                    <p className="text-sm text-gray-600 mb-2 truncate">{expense.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(expense.expense_date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 ml-4 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ExpenseList }