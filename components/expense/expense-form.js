'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { DollarSign, Tag, FileText, Calendar, Plus } from 'lucide-react'
import { toast } from 'sonner'

const ExpenseForm = ({ onExpenseAdded }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_fixed: false,
    expense_date: new Date().toISOString().split('T')[0]
  })

  const categories = [
    'Food', 'Transportation', 'Housing', 'Utilities', 'Healthcare',
    'Entertainment', 'Shopping', 'Education', 'Insurance', 'Other'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.addExpense({
        user_id: user.user_id,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        is_fixed: formData.is_fixed,
        expense_date: formData.expense_date
      })
      
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_fixed: false,
        expense_date: new Date().toISOString().split('T')[0]
      })
      
      if (onExpenseAdded) onExpenseAdded()
      toast.success('Expense added successfully')
    } catch (err) {
      setError(err.message)
      toast.error('Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
          <span>Add Expense</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              placeholder="Optional description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  name="expense_date"
                  type="date"
                  value={formData.expense_date}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Fixed Expense</label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={formData.is_fixed}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_fixed: checked }))}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.is_fixed ? 'Fixed' : 'Variable'}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export { ExpenseForm }