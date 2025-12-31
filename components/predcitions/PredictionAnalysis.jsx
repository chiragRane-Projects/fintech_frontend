"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import AIExplanationCard from "./AIExplanationCard"

export default function PredictionAnalytics({ userId }) {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(true)

  const [explanation, setExplanation] = useState("")
  const [explanationLoading, setExplanationLoading] = useState(false)

  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  // ---------------- Fetch Prediction ----------------
  useEffect(() => {
    if (!userId) return

    const fetchPrediction = async () => {
      try {
        const data = await api.getPrediction(userId, month, year)
        setPrediction(data)
      } catch (err) {
        console.error("Prediction error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrediction()
  }, [userId])

  // ---------------- Fetch AI Explanation ----------------
  useEffect(() => {
    if (!prediction) return

    const fetchExplanation = async () => {
      setExplanationLoading(true)

      try {
        const payload = {
          income: prediction.income,
          total_expense: prediction.total_expense,
          savings_rate: prediction.savings_rate,
          fixed_expense_ratio: prediction.fixed_expense_ratio,
          predicted_expense: prediction.predicted_expense,
          predicted_net_balance: prediction.predicted_net_balance,
          confidence: prediction.confidence,
          risk_flags: prediction.risk_projection,
        }

        const res = await api.aiExplainer(payload)
        setExplanation(res.explanation)
      } catch (err) {
        console.error("AI explanation error:", err)
        setExplanation(
          "We were unable to generate an AI explanation at this moment."
        )
      } finally {
        setExplanationLoading(false)
      }
    }

    fetchExplanation()
  }, [prediction])

  // ---------------- UI ----------------
  return (
    <div className="space-y-6">
      {/* Prediction Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Next Month Forecast</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Predicted Expense
                  </p>
                  <p className="text-2xl font-semibold">
                    ₹{prediction.predicted_expense}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Net Balance
                  </p>
                  <p className="text-2xl font-semibold">
                    ₹{prediction.predicted_net_balance}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge
                  variant={
                    prediction.risk_projection?.overspending_likely
                      ? "destructive"
                      : "secondary"
                  }
                >
                  Overspending:{" "}
                  {prediction.risk_projection?.overspending_likely
                    ? "Likely"
                    : "Unlikely"}
                </Badge>

                <Badge
                  variant={
                    prediction.risk_projection?.savings_decline_likely
                      ? "destructive"
                      : "secondary"
                  }
                >
                  Savings Decline:{" "}
                  {prediction.risk_projection?.savings_decline_likely
                    ? "Likely"
                    : "Unlikely"}
                </Badge>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* AI Explanation */}
      <AIExplanationCard
        explanation={explanation}
        loading={explanationLoading}
        confidence={prediction?.confidence}
      />
    </div>
  )
}
