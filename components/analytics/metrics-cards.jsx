import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, TrendingDown, TrendingUp, Target } from 'lucide-react'

const MetricsCards = ({ intelligence }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-xl font-bold">₹{intelligence.income.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="text-xl font-bold">₹{intelligence.total_expenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-5 h-5 ${intelligence.net_balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            <div>
              <p className="text-sm text-muted-foreground">Net Balance</p>
              <p className={`text-xl font-bold ${intelligence.net_balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{intelligence.net_balance.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Savings Rate</p>
              <p className="text-xl font-bold">{intelligence.savings_rate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { MetricsCards }