'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

const SpendingChart = ({ categories }) => {
  const { theme } = useTheme()
  
  const chartData = categories.map((category, index) => ({
    name: category.category,
    value: category.amount,
    color: COLORS[index % COLORS.length]
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-popover-foreground font-medium">{payload[0].name}</p>
          <p className="text-primary">₹{payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChartIcon className="w-5 h-5" />
          <span>Top Spending Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No spending data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { SpendingChart }