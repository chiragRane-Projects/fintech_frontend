import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

const FixedExpenseRatio = ({ ratio }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Fixed Expense Ratio</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{ratio}%</div>
        <p className="text-muted-foreground">
          {ratio > 50 
            ? "High fixed expenses may limit flexibility" 
            : "Good balance of fixed and variable expenses"}
        </p>
        <div className="mt-4 w-full bg-secondary rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${ratio > 50 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(ratio, 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}

export { FixedExpenseRatio }