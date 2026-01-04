import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Brain, FileText, MessageSquare, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">HealthGuard</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Brain className="h-4 w-4" />
            AI-Powered Health Intelligence
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Early Detection, Better Prevention
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            HealthGuard uses advanced AI to analyze your health data and medical reports, predicting potential risks
            before they become serious. Take control of your health journey today.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Assessment
              </Button>
            </Link>
            <Link href="/auth/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Login
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Comprehensive Health Intelligence
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground md:text-lg">
              Everything you need to monitor, analyze, and improve your health in one intelligent platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Health Data Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor vital signs including blood pressure, heart rate, blood sugar, and more with easy-to-use
                  logging tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Brain className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">AI Risk Prediction</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms analyze your data to predict potential health risks for
                  cardiovascular, diabetes, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Report Analysis</h3>
                <p className="text-muted-foreground">
                  Upload medical reports and lab results for AI-powered analysis that extracts key findings and risk
                  factors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Health Trends</h3>
                <p className="text-muted-foreground">
                  Visualize your health metrics over time with intuitive charts and graphs to track your progress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">AI Medical Assistant</h3>
                <p className="text-muted-foreground">
                  Chat with our intelligent medical assistant for personalized health advice and answers to your
                  questions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Privacy & Security</h3>
                <p className="text-muted-foreground">
                  Your health data is encrypted and protected with enterprise-grade security. Your privacy is our
                  priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Join thousands of users who are proactively managing their health with AI-powered insights.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Create Your Free Account</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">HealthGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 HealthGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
