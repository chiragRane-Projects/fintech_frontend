"use client"

import React, { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Wallet,
  BrainCircuit,
  Calendar,
  ShieldCheck
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

import { api } from "@/lib/api"

export default function PredictionAnalytics({ userId }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Next month default
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 1)
    return { month: d.getMonth() + 1, year: d.getFullYear() }
  })

  // 🔥 SINGLE EFFECT — NO DUPLICATES
  useEffect(() => {
    if (!userId) return

    const fetchPrediction = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("📡 Fetching prediction for:", userId, targetDate)

        const res = await api.getPrediction(
          userId,
          targetDate.month,
          targetDate.year
        )

        setData(res)
      } catch (err) {
        console.error(err)
        setError("Unable to generate forecast")
      } finally {
        setLoading(false)
      }
    }

    fetchPrediction()
  }, [userId, targetDate.month, targetDate.year])

  const handleNextMonth = () => {
    setTargetDate(prev => ({
      month: prev.month === 12 ? 1 : prev.month + 1,
      year: prev.month === 12 ? prev.year + 1 : prev.year
    }))
  }

  const handlePrevMonth = () => {
    setTargetDate(prev => ({
      month: prev.month === 1 ? 12 : prev.month - 1,
      year: prev.month === 1 ? prev.year - 1 : prev.year
    }))
  }

  const formatCurrency = amt =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amt || 0)

  const monthName = new Date(
    targetDate.year,
    targetDate.month - 1
  ).toLocaleString("default", { month: "long", year: "numeric" })

  if (!userId) return <LoadingSkeleton />

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading || !data) return <LoadingSkeleton />

  const {
    predicted_expense,
    predicted_net_balance,
    confidence,
    risk_projection
  } = data

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          AI Financial Forecast
        </h2>

        <div className="flex items-center gap-2 border rounded-lg px-2">
          <Button size="icon" variant="ghost" onClick={handlePrevMonth}>
            <TrendingDown className="rotate-90 h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{monthName}</span>
          <Button size="icon" variant="ghost" onClick={handleNextMonth}>
            <TrendingUp className="rotate-90 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Prediction */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardDescription>Projected Expense</CardDescription>
            <CardTitle className="text-5xl text-primary">
              {formatCurrency(predicted_expense)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span>Confidence</span>
              <span>{(confidence * 100).toFixed(0)}%</span>
            </div>
            <Progress value={confidence * 100} />
          </CardContent>
        </Card>

        {/* Balance */}
        <Card>
          <CardHeader>
            <CardDescription>Projected Balance</CardDescription>
            <CardTitle
              className={
                predicted_net_balance < 0
                  ? "text-red-500"
                  : "text-emerald-600"
              }
            >
              {formatCurrency(predicted_net_balance)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {predicted_net_balance < 0 ? (
              <Badge variant="destructive">Deficit</Badge>
            ) : (
              <Badge className="bg-emerald-200 text-emerald-800">
                Surplus
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Risk */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <RiskBox
              active={risk_projection.overspending_likely}
              title="Overspending Risk"
              positive="Within income limits"
              negative="Expenses exceed income"
            />
            <RiskBox
              active={risk_projection.savings_decline_likely}
              title="Savings Health"
              positive="Healthy savings buffer"
              negative="Savings below 20%"
            />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

function RiskBox({ title, active, positive, negative }) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        active ? "bg-red-500/10 border-red-300" : "bg-secondary/40"
      }`}
    >
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">
        {active ? negative : positive}
      </p>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-[200px] md:col-span-2" />
      <Skeleton className="h-[200px]" />
      <Skeleton className="h-[150px] md:col-span-3" />
    </div>
  )
}
