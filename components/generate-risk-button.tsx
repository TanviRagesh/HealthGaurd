"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface GenerateRiskButtonProps {
  userId: string
}

export function GenerateRiskButton({ userId }: GenerateRiskButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Fetch user profile and health records
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

      const { data: healthRecords } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", userId)
        .order("record_date", { ascending: false })
        .limit(10)

      if (!profile) {
        throw new Error("Profile not found")
      }

      // Calculate age
      const age = profile.date_of_birth
        ? Math.floor(
            (new Date().getTime() - new Date(profile.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
          )
        : null

      // Simple risk calculation based on available data
      let overallRisk = 20 // Base risk

      // Age factor
      if (age) {
        if (age > 65) overallRisk += 20
        else if (age > 50) overallRisk += 15
        else if (age > 40) overallRisk += 10
      }

      // BMI factor
      if (profile.height_cm && profile.weight_kg) {
        const bmi = profile.weight_kg / (profile.height_cm / 100) ** 2
        if (bmi > 30) overallRisk += 15
        else if (bmi > 25) overallRisk += 10
      }

      // Medical conditions factor
      if (profile.medical_conditions && profile.medical_conditions.length > 0) {
        overallRisk += profile.medical_conditions.length * 5
      }

      // Blood pressure factor
      if (healthRecords && healthRecords.length > 0) {
        const avgSystolic =
          healthRecords
            .filter((r) => r.blood_pressure_systolic)
            .reduce((sum, r) => sum + (r.blood_pressure_systolic || 0), 0) /
          healthRecords.filter((r) => r.blood_pressure_systolic).length

        if (avgSystolic > 140) overallRisk += 15
        else if (avgSystolic > 130) overallRisk += 10
      }

      overallRisk = Math.min(overallRisk, 100)

      // Calculate specific risks
      const cardiovascularRisk = Math.min(overallRisk + Math.floor(Math.random() * 10) - 5, 100)
      const diabetesRisk = Math.min(overallRisk + Math.floor(Math.random() * 15) - 10, 100)
      const respiratoryRisk = Math.min(overallRisk + Math.floor(Math.random() * 10) - 15, 100)
      const cancerRisk = Math.min(overallRisk + Math.floor(Math.random() * 10) - 20, 100)

      // Generate recommendations
      const recommendations = []
      if (overallRisk > 50) recommendations.push("Schedule a comprehensive health check-up with your physician")
      if (cardiovascularRisk > 60)
        recommendations.push("Monitor your blood pressure regularly and consult a cardiologist")
      if (diabetesRisk > 60) recommendations.push("Consider a glucose tolerance test and dietary modifications")
      if (profile.height_cm && profile.weight_kg) {
        const bmi = profile.weight_kg / (profile.height_cm / 100) ** 2
        if (bmi > 25) recommendations.push("Maintain a healthy weight through balanced diet and regular exercise")
      }
      recommendations.push("Stay hydrated and get at least 7-8 hours of sleep daily")
      recommendations.push("Consider stress management techniques such as meditation or yoga")

      // Save risk assessment
      const { error: insertError } = await supabase.from("risk_assessments").insert({
        user_id: userId,
        assessment_date: new Date().toISOString().split("T")[0],
        overall_risk_score: Math.round(overallRisk),
        cardiovascular_risk: Math.round(cardiovascularRisk),
        diabetes_risk: Math.round(diabetesRisk),
        respiratory_risk: Math.round(respiratoryRisk),
        cancer_risk: Math.round(cancerRisk),
        risk_factors: {
          age: age,
          bmi: profile.height_cm && profile.weight_kg ? profile.weight_kg / (profile.height_cm / 100) ** 2 : null,
          conditions: profile.medical_conditions || [],
        },
        recommendations: recommendations,
      })

      if (insertError) throw insertError

      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        <Brain className="mr-2 h-4 w-4" />
        {loading ? "Generating Assessment..." : "Generate AI Risk Assessment"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
