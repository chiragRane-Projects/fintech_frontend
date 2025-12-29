import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

const RiskAlerts = ({ riskFlags }) => {
  if (!riskFlags.overspending && !riskFlags.low_savings) {
    return null
  }

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          <span>Risk Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {riskFlags.overspending && (
            <div className="flex items-center space-x-2 text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <span>You're overspending this month</span>
            </div>
          )}
          {riskFlags.low_savings && (
            <div className="flex items-center space-x-2 text-destructive">
              <div className="w-2 h-2 bg-destructive rounded-full"></div>
              <span>Your savings rate is below 20%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { RiskAlerts }