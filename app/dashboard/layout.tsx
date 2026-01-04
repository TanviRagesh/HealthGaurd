import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { LanguageProvider } from "@/lib/contexts/language-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/onboarding")
  }

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardNav user={user} profile={profile} />
        <main className="flex-1">
          <div className="container py-6 md:py-10">{children}</div>
        </main>
      </div>
    </LanguageProvider>
  )
}
