"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Sparkles, Heart, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Profile {
  medical_conditions: string[]
}

interface DailyLog {
  sleep_hours: number | null
  exercise_minutes: number | null
  stress_level: number | null
}

interface ImpactAnalysis {
  id: string
  disease_name: string
  current_risk_level: number
  risk_trend: string
  contributing_factors: any
  preventive_actions: string[]
  precautions: string[]
  lifestyle_remedies: string[]
  analysis_date: string
}

interface DiseaseImpactInsightsProps {
  userId: string
  profile: Profile | null
  dailyLogs: DailyLog[]
  impactAnalyses: ImpactAnalysis[]
}

export function DiseaseImpactInsights({ userId, profile, dailyLogs, impactAnalyses }: DiseaseImpactInsightsProps) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  const generateInsights = async () => {
    setIsGenerating(true)
    const supabase = createClient()

    // Calculate averages from recent logs
    const recentLogs = dailyLogs.slice(-7)
    const avgSleep = recentLogs.reduce((sum, log) => sum + (log.sleep_hours || 0), 0) / recentLogs.length
    const avgExercise = recentLogs.reduce((sum, log) => sum + (log.exercise_minutes || 0), 0) / recentLogs.length
    const avgStress = recentLogs.reduce((sum, log) => sum + (log.stress_level || 0), 0) / recentLogs.length

    // Define disease-specific insights based on conditions
    const diseases = ["Cardiovascular Disease", "Type 2 Diabetes", "Hypertension"]

    for (const disease of diseases) {
      let riskLevel = 30
      let riskTrend = "stable"
      let contributingFactors: any = {}
      let preventiveActions: string[] = []
      let precautions: string[] = []
      let lifestyleRemedies: string[] = []

      // Disease-specific logic
      if (disease === "Cardiovascular Disease") {
        // Calculate risk based on habits
        if (avgExercise < 30) riskLevel += 15
        if (avgStress > 6) riskLevel += 10
        if (avgSleep < 7) riskLevel += 10

        contributingFactors = {
          exercise: avgExercise < 30 ? "Low physical activity increases heart disease risk" : "Good activity level",
          stress: avgStress > 6 ? "High stress levels are damaging your cardiovascular health" : "Stress managed well",
          sleep: avgSleep < 7 ? "Insufficient sleep increases inflammation and heart strain" : "Healthy sleep duration",
        }

        preventiveActions = [
          "Aim for 150 minutes of moderate aerobic activity per week",
          "Reduce sodium intake to below 2,300mg per day",
          "Monitor blood pressure regularly",
          "Include omega-3 rich foods in your diet",
        ]

        precautions = [
          "Avoid smoking and limit alcohol consumption",
          "Manage cholesterol levels through diet",
          "Watch for warning signs: chest pain, shortness of breath",
          "Stay up to date with cardiac screenings if family history exists",
        ]

        lifestyleRemedies = [
          "Practice deep breathing exercises for 10 minutes daily to reduce stress",
          "Walk briskly for 30 minutes, 5 days per week",
          "Eat a Mediterranean-style diet rich in vegetables, fruits, whole grains, and olive oil",
          "Maintain a healthy weight (BMI between 18.5-24.9)",
        ]

        riskTrend = avgExercise > 30 && avgStress < 7 ? "improving" : avgExercise < 20 ? "worsening" : "stable"
      } else if (disease === "Type 2 Diabetes") {
        if (avgExercise < 20) riskLevel += 20
        if (avgSleep < 6) riskLevel += 15

        contributingFactors = {
          exercise:
            avgExercise < 20
              ? "Sedentary lifestyle increases insulin resistance"
              : "Physical activity helps regulate blood sugar",
          sleep:
            avgSleep < 6
              ? "Poor sleep disrupts glucose metabolism and increases diabetes risk"
              : "Adequate sleep supports metabolic health",
          familyHistory: profile?.medical_conditions?.includes("Diabetes")
            ? "Family history significantly increases your risk"
            : "No known family history",
        }

        preventiveActions = [
          "Maintain blood sugar levels within target range (fasting: 80-130 mg/dL)",
          "Get HbA1c tested every 3-6 months",
          "Limit refined carbohydrates and sugary drinks",
          "Maintain healthy body weight",
        ]

        precautions = [
          "Monitor for symptoms: increased thirst, frequent urination, fatigue",
          "Check feet daily for cuts or infections",
          "Avoid prolonged sitting - move every 30 minutes",
          "Be cautious with high glycemic index foods",
        ]

        lifestyleRemedies = [
          "Follow a low-glycemic diet with complex carbohydrates, lean proteins, and fiber",
          "Exercise at least 150 minutes per week to improve insulin sensitivity",
          "Stay hydrated with 8-10 glasses of water daily",
          "Manage portion sizes and eat regular meals to stabilize blood sugar",
        ]

        riskTrend = avgExercise > 30 && avgSleep > 7 ? "improving" : "stable"
      } else if (disease === "Hypertension") {
        if (avgStress > 7) riskLevel += 20
        if (avgExercise < 25) riskLevel += 15

        contributingFactors = {
          stress:
            avgStress > 7
              ? "Your stress levels are significantly increasing your blood pressure and hypertension risk"
              : "Stress levels are manageable",
          exercise:
            avgExercise < 25 ? "Lack of regular activity contributes to high blood pressure" : "Good activity level",
          lifestyle: "Daily habits play a crucial role in blood pressure management",
        }

        preventiveActions = [
          "Monitor blood pressure at home regularly (target: below 120/80 mmHg)",
          "Reduce sodium intake to 1,500mg or less per day",
          "Limit caffeine consumption",
          "Maintain healthy body weight",
        ]

        precautions = [
          "Avoid foods high in sodium: processed foods, canned soups, deli meats",
          "Limit alcohol to moderate levels",
          "Be aware of symptoms: severe headaches, vision problems, chest pain",
          "Don't skip medications if prescribed",
        ]

        lifestyleRemedies = [
          "Practice stress-reduction techniques: meditation, yoga, progressive muscle relaxation",
          "Follow the DASH diet emphasizing fruits, vegetables, whole grains, and low-fat dairy",
          "Get 7-9 hours of quality sleep each night",
          "Engage in regular aerobic exercise: brisk walking, cycling, swimming",
        ]

        riskTrend = avgStress > 8 ? "worsening" : avgStress < 5 && avgExercise > 30 ? "improving" : "stable"
      }

      // Insert the analysis
      await supabase.from("disease_impact_analysis").insert({
        user_id: userId,
        disease_name: disease,
        current_risk_level: Math.min(riskLevel, 100),
        risk_trend: riskTrend,
        contributing_factors: contributingFactors,
        preventive_actions: preventiveActions,
        precautions: precautions,
        lifestyle_remedies: lifestyleRemedies,
      })
    }

    setIsGenerating(false)
    router.refresh()
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingDown className="h-5 w-5 text-green-500" />
      case "worsening":
        return <TrendingUp className="h-5 w-5 text-red-500" />
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 dark:text-green-400"
      case "worsening":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-yellow-600 dark:text-yellow-400"
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500"
    if (risk < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Disease Impact Analysis</CardTitle>
          <CardDescription>
            See how your daily habits influence specific disease risks based on your profile and family history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {impactAnalyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Activity className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-foreground">No impact analysis yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Generate personalized disease impact insights based on your daily health logs
              </p>
              <Button onClick={generateInsights} disabled={isGenerating || dailyLogs.length < 3}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Insights"}
              </Button>
              {dailyLogs.length < 3 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Log at least 3 days of health data to generate insights
                </p>
              )}
            </div>
          ) : (
            <>
              <Button onClick={generateInsights} disabled={isGenerating} className="mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? "Regenerating..." : "Regenerate Insights"}
              </Button>

              <div className="space-y-6">
                {impactAnalyses.map((analysis) => (
                  <Card key={analysis.id} className="border-border bg-muted/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center text-lg text-card-foreground">
                            <Heart className="mr-2 h-5 w-5 text-primary" />
                            {analysis.disease_name}
                          </CardTitle>
                          <div className="mt-2 flex items-center gap-2">
                            {getTrendIcon(analysis.risk_trend)}
                            <span className={`text-sm font-medium ${getTrendColor(analysis.risk_trend)}`}>
                              {analysis.risk_trend === "improving"
                                ? "Risk Decreasing"
                                : analysis.risk_trend === "worsening"
                                  ? "Risk Increasing"
                                  : "Risk Stable"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{analysis.current_risk_level}%</div>
                          <div className="text-xs text-muted-foreground">Current Risk</div>
                        </div>
                      </div>
                      <Progress value={analysis.current_risk_level} className="mt-4">
                        <div className={`h-full ${getRiskColor(analysis.current_risk_level)}`} />
                      </Progress>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2 flex items-center font-semibold text-foreground">
                          <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                          Contributing Factors
                        </h4>
                        <div className="space-y-2 rounded-lg bg-card p-3">
                          {Object.entries(analysis.contributing_factors).map(([key, value]) => (
                            <p key={key} className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{key}:</span> {value as string}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold text-foreground">Preventive Actions</h4>
                        <ul className="space-y-1">
                          {analysis.preventive_actions.map((action, idx) => (
                            <li key={idx} className="flex items-start text-sm text-muted-foreground">
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold text-foreground">Precautions</h4>
                        <ul className="space-y-1">
                          {analysis.precautions.map((precaution, idx) => (
                            <li key={idx} className="flex items-start text-sm text-muted-foreground">
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
                              {precaution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold text-foreground">Lifestyle Remedies (Non-Medicinal)</h4>
                        <ul className="space-y-1">
                          {analysis.lifestyle_remedies.map((remedy, idx) => (
                            <li key={idx} className="flex items-start text-sm text-muted-foreground">
                              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                              {remedy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
