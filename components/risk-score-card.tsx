import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertCircle, Heart, Blinds as Lungs, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RiskAssessment {
  overall_risk_score: number
  cardiovascular_risk: number | null
  diabetes_risk: number | null
  respiratory_risk: number | null
  cancer_risk: number | null
  risk_factors: Record<string, unknown> | null
  recommendations: string[] | null
  assessment_date: string
}

interface RiskScoreCardProps {
  risk: RiskAssessment
}

function getRiskLevel(score: number): { label: string; color: string } {
  if (score < 30) return { label: "Low Risk", color: "bg-secondary text-secondary-foreground" }
  if (score < 60) return { label: "Moderate Risk", color: "bg-primary text-primary-foreground" }
  return { label: "High Risk", color: "bg-destructive text-destructive-foreground" }
}

function getRiskColor(score: number): string {
  if (score < 30) return "text-secondary"
  if (score < 60) return "text-primary"
  return "text-destructive"
}

export function RiskScoreCard({ risk }: RiskScoreCardProps) {
  const overallRisk = getRiskLevel(risk.overall_risk_score)

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-card-foreground">AI Risk Assessment</CardTitle>
              <CardDescription>Last updated: {new Date(risk.assessment_date).toLocaleDateString()}</CardDescription>
            </div>
            <Badge className={overallRisk.color}>{overallRisk.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-end justify-between">
              <span className="text-sm font-medium text-foreground">Overall Health Risk Score</span>
              <span className={`text-3xl font-bold ${getRiskColor(risk.overall_risk_score)}`}>
                {risk.overall_risk_score}
              </span>
            </div>
            <Progress value={risk.overall_risk_score} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {risk.cardiovascular_risk !== null && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Cardiovascular</span>
                </div>
                <div className="flex items-end justify-between">
                  <Progress value={risk.cardiovascular_risk} className="h-2 flex-1" />
                  <span className={`ml-3 text-xl font-bold ${getRiskColor(risk.cardiovascular_risk)}`}>
                    {risk.cardiovascular_risk}
                  </span>
                </div>
              </div>
            )}

            {risk.diabetes_risk !== null && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-secondary" />
                  <span className="font-medium text-foreground">Diabetes</span>
                </div>
                <div className="flex items-end justify-between">
                  <Progress value={risk.diabetes_risk} className="h-2 flex-1" />
                  <span className={`ml-3 text-xl font-bold ${getRiskColor(risk.diabetes_risk)}`}>
                    {risk.diabetes_risk}
                  </span>
                </div>
              </div>
            )}

            {risk.respiratory_risk !== null && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Lungs className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">Respiratory</span>
                </div>
                <div className="flex items-end justify-between">
                  <Progress value={risk.respiratory_risk} className="h-2 flex-1" />
                  <span className={`ml-3 text-xl font-bold ${getRiskColor(risk.respiratory_risk)}`}>
                    {risk.respiratory_risk}
                  </span>
                </div>
              </div>
            )}

            {risk.cancer_risk !== null && (
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-foreground">Cancer</span>
                </div>
                <div className="flex items-end justify-between">
                  <Progress value={risk.cancer_risk} className="h-2 flex-1" />
                  <span className={`ml-3 text-xl font-bold ${getRiskColor(risk.cancer_risk)}`}>{risk.cancer_risk}</span>
                </div>
              </div>
            )}
          </div>

          {risk.recommendations && risk.recommendations.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {risk.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
