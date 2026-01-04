"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ExternalLink, Info, MapPin } from "lucide-react"
import { getHealthAlertsByState, getIndianStates, type HealthAlert } from "@/lib/constants/health-alerts"

export function HealthAlertsComponent() {
  const [selectedState, setSelectedState] = useState<string>("")
  const [alerts, setAlerts] = useState<HealthAlert[]>([])
  const [states] = useState<string[]>(getIndianStates())

  useEffect(() => {
    if (selectedState) {
      setAlerts(getHealthAlertsByState(selectedState))
    } else {
      setAlerts([])
    }
  }, [selectedState])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "low":
        return <Info className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Select Your State</CardTitle>
          <CardDescription>Choose a state to view current health alerts and disease outbreaks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a state..." />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedState && alerts.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Info className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-foreground">No Active Alerts</h3>
              <p className="text-sm text-muted-foreground">There are currently no health alerts for {selectedState}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-card-foreground">{alert.title}</CardTitle>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(alert.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{alert.description}</p>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Source: {alert.source}</span>
                </div>
                <a
                  href={alert.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedState && alerts.length > 0 && (
        <Card className="border-border bg-card bg-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Important Note</p>
                <p className="text-sm text-muted-foreground">
                  This information is for awareness purposes only. For medical advice or concerns, please consult with
                  healthcare professionals or visit government health portals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
