"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, FileText, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface MedicalReport {
  id: string
  report_type: string
  report_date: string
  file_name: string | null
  findings: string[] | null
  risk_factors: string[] | null
  recommendations: string[] | null
}

interface ReportsListProps {
  reports: MedicalReport[]
}

function ReportCard({ report }: { report: MedicalReport }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{report.report_type}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(report.report_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {report.file_name && <p className="text-xs text-muted-foreground">{report.file_name}</p>}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            {report.findings && report.findings.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  Key Findings
                </h4>
                <ul className="space-y-1">
                  {report.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.risk_factors && report.risk_factors.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Risk Factors
                </h4>
                <div className="space-y-2">
                  {report.risk_factors.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {report.recommendations && report.recommendations.length > 0 && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ReportsList({ reports }: ReportsListProps) {
  if (reports.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Your Reports</CardTitle>
          <CardDescription>Medical documents and AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No reports yet</p>
            <p className="text-sm text-muted-foreground">Upload your first medical report to get AI-powered insights</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Your Reports</CardTitle>
            <CardDescription>Medical documents and AI analysis</CardDescription>
          </div>
          <Badge variant="secondary">{reports.length} Reports</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
