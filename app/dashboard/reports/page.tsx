import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ReportUploadForm } from "@/components/report-upload-form"
import { ReportsList } from "@/components/reports-list"

export default async function ReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: reports } = await supabase
    .from("medical_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("report_date", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Medical Reports</h1>
        <p className="text-muted-foreground">Upload and analyze your medical documents with AI</p>
      </div>

      <ReportUploadForm userId={user.id} />

      <ReportsList reports={reports || []} />
    </div>
  )
}
