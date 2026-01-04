import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HealthRecordForm } from "@/components/health-record-form"
import { HealthRecordsList } from "@/components/health-records-list"

export default async function HealthRecordsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: records } = await supabase
    .from("health_records")
    .select("*")
    .eq("user_id", user.id)
    .order("record_date", { ascending: false })
    .limit(30)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Records</h1>
        <p className="text-muted-foreground">Track your daily vitals and health measurements</p>
      </div>

      <HealthRecordForm userId={user.id} />

      <HealthRecordsList records={records || []} />
    </div>
  )
}
