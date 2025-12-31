"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"
import { cleanAIText } from "@/lib/text"

export default function AIExplanationCard({ explanation, loading, confidence }) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI Explanation
          </Badge>
        </div>

        <CardTitle className="text-lg font-semibold">
          What this means for you
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        {loading ? (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[75%]" />
          </>
        ) : (
          <>
            <p className="whitespace-pre-line">{cleanAIText(explanation)}</p>

            {confidence !== undefined && (
              <p className="pt-2 text-xs text-muted-foreground">
                Generated using recent spending patterns • Confidence:{" "}
                <span className="font-medium">
                  {Math.round(confidence * 100)}%
                </span>
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
