import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DailyHealthForm } from "@/components/daily-health-form"
import { HealthProgressCharts } from "@/components/health-progress-charts"
import { DiseaseImpactInsights } from "@/components/disease-impact-insights"

export default async function HealthProgressPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: dailyLogs } = await supabase
    .from("daily_health_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("log_date", { ascending: true })
    .limit(30)

  const { data: riskAssessments } = await supabase
    .from("risk_assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("assessment_date", { ascending: false })
    .limit(1)

  const { data: impactAnalyses } = await supabase
    .from("disease_impact_analysis")
    .select("*")
    .eq("user_id", user.id)
    .order("analysis_date", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Progress & Disease Impact</h1>
        <p className="text-muted-foreground">Track your daily habits and see how they affect your health risks</p>
      </div>

      <DailyHealthForm userId={user.id} />

      {dailyLogs && dailyLogs.length > 0 && (
        <HealthProgressCharts dailyLogs={dailyLogs} riskAssessments={riskAssessments || []} />
      )}

      <DiseaseImpactInsights
        userId={user.id}
        profile={profile}
        dailyLogs={dailyLogs || []}
        impactAnalyses={impactAnalyses || []}
      />
    </div>
  )
}
