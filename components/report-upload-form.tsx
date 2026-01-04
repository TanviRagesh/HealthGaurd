"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ReportUploadFormProps {
  userId: string
}

export function ReportUploadForm({ userId }: ReportUploadFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [reportType, setReportType] = useState("")
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0])
  const [file, setFile] = useState<File | null>(null)

  const reportTypes = [
    "Blood Test",
    "X-Ray",
    "MRI Scan",
    "CT Scan",
    "Ultrasound",
    "ECG",
    "Pathology Report",
    "Prescription",
    "Other",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const analyzeReport = async (reportType: string, fileName: string) => {
    // Simulate AI analysis based on report type
    const analysis: {
      findings: string[]
      risk_factors: string[]
      recommendations: string[]
    } = {
      findings: [],
      risk_factors: [],
      recommendations: [],
    }

    switch (reportType) {
      case "Blood Test":
        analysis.findings = [
          "Hemoglobin levels within normal range",
          "Glucose levels slightly elevated",
          "Cholesterol levels borderline high",
        ]
        analysis.risk_factors = [
          "Elevated glucose may indicate prediabetes",
          "High cholesterol increases cardiovascular risk",
        ]
        analysis.recommendations = [
          "Consult with your doctor about glucose management",
          "Consider dietary modifications to reduce cholesterol",
          "Increase physical activity to 150 minutes per week",
        ]
        break
      case "X-Ray":
        analysis.findings = ["Clear lung fields", "No evidence of fractures", "Normal cardiac silhouette"]
        analysis.risk_factors = []
        analysis.recommendations = ["Continue regular health monitoring", "Maintain good respiratory hygiene"]
        break
      case "ECG":
        analysis.findings = ["Normal sinus rhythm", "Heart rate: 72 bpm", "No ST segment changes"]
        analysis.risk_factors = []
        analysis.recommendations = [
          "Heart function appears normal",
          "Continue healthy lifestyle habits",
          "Monitor blood pressure regularly",
        ]
        break
      default:
        analysis.findings = ["Report uploaded successfully", "Manual review recommended"]
        analysis.risk_factors = ["Consult with healthcare provider for detailed interpretation"]
        analysis.recommendations = ["Discuss findings with your doctor", "Keep records organized for future reference"]
    }

    return analysis
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (!file || !reportType) {
      setError("Please select a report type and file")
      setLoading(false)
      return
    }

    const supabase = createClient()

    try {
      // In a real app, you would upload the file to storage
      // For now, we'll just store the metadata and simulate analysis
      const fileUrl = `placeholder-url/${file.name}`

      // Simulate AI analysis
      const analysis = await analyzeReport(reportType, file.name)

      const { error: insertError } = await supabase.from("medical_reports").insert({
        user_id: userId,
        report_type: reportType,
        report_date: reportDate,
        file_url: fileUrl,
        file_name: file.name,
        ai_analysis: analysis,
        findings: analysis.findings,
        risk_factors: analysis.risk_factors,
        recommendations: analysis.recommendations,
      })

      if (insertError) throw insertError

      // Reset form
      setReportType("")
      setReportDate(new Date().toISOString().split("T")[0])
      setFile(null)
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        router.refresh()
      }, 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Upload Medical Report</CardTitle>
        <CardDescription>Add a new medical document for AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reportDate">Report Date</Label>
              <Input id="reportDate" type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file-upload">Upload File</Label>
            <div className="flex items-center gap-3">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {file && (
                <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm text-foreground">
                  <Upload className="h-4 w-4" />
                  {file.name}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
          </div>

          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          {success && (
            <div className="rounded-md bg-secondary/20 p-3 text-sm text-secondary-foreground">
              Report uploaded and analyzed successfully!
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading & Analyzing..." : "Upload & Analyze"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
