import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HealthAlertsComponent } from "@/components/health-alerts"

export default async function HealthAlertsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Alerts</h1>
        <p className="text-muted-foreground">Current health alerts and disease outbreaks across Indian states</p>
      </div>

      <HealthAlertsComponent />
    </div>
  )
}
