import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, Brain, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { RiskScoreCard } from "@/components/risk-score-card"
import { GenerateRiskButton } from "@/components/generate-risk-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { count: recordsCount } = await supabase
    .from("health_records")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: reportsCount } = await supabase
    .from("medical_reports")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { data: recentRecords } = await supabase
    .from("health_records")
    .select("*")
    .eq("user_id", user.id)
    .order("record_date", { ascending: false })
    .limit(1)

  const { data: latestRiskData } = await supabase
    .from("risk_assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("assessment_date", { ascending: false })
    .limit(1)

  const latestRisk = latestRiskData && latestRiskData.length > 0 ? latestRiskData[0] : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {profile?.full_name || "User"}
        </h1>
        <p className="text-muted-foreground">Here's an overview of your health journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Health Records</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{recordsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total entries logged</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Medical Reports</CardTitle>
            <FileText className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{reportsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Reports analyzed</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Risk Score</CardTitle>
            <Brain className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {latestRisk ? (
              <>
                <div className="text-2xl font-bold text-foreground">{latestRisk.overall_risk_score}/100</div>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(latestRisk.assessment_date).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">--</div>
                <p className="text-xs text-muted-foreground">No assessment yet</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {latestRisk ? (
        <RiskScoreCard risk={latestRisk} />
      ) : (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">AI Risk Assessment</CardTitle>
            <CardDescription>Get personalized health risk predictions powered by AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">No risk assessment available</p>
                <p className="text-sm text-muted-foreground">
                  Generate your first AI-powered health risk assessment based on your profile and health records.
                </p>
              </div>
            </div>
            <GenerateRiskButton userId={user.id} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/health-records">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Log Health Data
              </Button>
            </Link>
            <Link href="/dashboard/reports">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                Upload Medical Report
              </Button>
            </Link>
            <Link href="/dashboard/chatbot">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Brain className="mr-2 h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Latest Reading</CardTitle>
            <CardDescription>Your most recent health measurement</CardDescription>
          </CardHeader>
          <CardContent>
            {recentRecords && recentRecords.length > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(recentRecords[0].record_date).toLocaleDateString()}
                  </span>
                </div>
                {recentRecords[0].heart_rate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Heart Rate</span>
                    <span className="font-medium text-foreground">{recentRecords[0].heart_rate} bpm</span>
                  </div>
                )}
                {recentRecords[0].blood_pressure_systolic && recentRecords[0].blood_pressure_diastolic && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Blood Pressure</span>
                    <span className="font-medium text-foreground">
                      {recentRecords[0].blood_pressure_systolic}/{recentRecords[0].blood_pressure_diastolic} mmHg
                    </span>
                  </div>
                )}
                <Link href="/dashboard/health-records">
                  <Button variant="link" className="h-auto p-0 text-primary">
                    View all records →
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-muted-foreground">No health records yet</p>
                <Link href="/dashboard/health-records">
                  <Button variant="link" className="text-primary">
                    Add your first record
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
