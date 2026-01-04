import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HealthArticlesSearch } from "@/components/health-articles-search"

export default async function HealthArticlesPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Articles</h1>
        <p className="text-muted-foreground">Search for information about diseases, symptoms, and health topics</p>
      </div>

      <Suspense fallback={null}>
        <HealthArticlesSearch />
      </Suspense>
    </div>
  )
}
