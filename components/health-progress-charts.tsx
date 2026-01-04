"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface DailyLog {
  log_date: string
  sleep_hours: number | null
  exercise_minutes: number | null
  stress_level: number | null
  calories_intake: number | null
  water_intake_ml: number | null
  mood_level: number | null
}

interface RiskAssessment {
  assessment_date: string
  overall_risk_score: number
  cardiovascular_risk: number
  diabetes_risk: number
}

interface HealthProgressChartsProps {
  dailyLogs: DailyLog[]
  riskAssessments: RiskAssessment[]
}

export function HealthProgressCharts({ dailyLogs, riskAssessments }: HealthProgressChartsProps) {
  const chartData = dailyLogs.map((log) => ({
    date: new Date(log.log_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sleep: log.sleep_hours,
    exercise: log.exercise_minutes,
    stress: log.stress_level,
    mood: log.mood_level,
  }))

  return (
    <div className="grid gap-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Daily Habits Trend</CardTitle>
          <CardDescription>Track your sleep, exercise, stress, and mood over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sleep" stroke="#3b82f6" name="Sleep (hours)" strokeWidth={2} />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress (1-10)" strokeWidth={2} />
              <Line type="monotone" dataKey="mood" stroke="#10b981" name="Mood (1-10)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Weekly Exercise Minutes</CardTitle>
          <CardDescription>Your physical activity levels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Bar dataKey="exercise" fill="#8b5cf6" name="Exercise (minutes)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
