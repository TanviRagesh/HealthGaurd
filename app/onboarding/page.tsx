"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  // Step 1: Basic Info
  const [fullName, setFullName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")

  // Step 2: Physical Info
  const [heightCm, setHeightCm] = useState("")
  const [weightKg, setWeightKg] = useState("")

  // Step 3: Emergency Contact
  const [emergencyName, setEmergencyName] = useState("")
  const [emergencyPhone, setEmergencyPhone] = useState("")

  // Step 4: Medical History
  const [conditions, setConditions] = useState("")
  const [allergies, setAllergies] = useState("")
  const [medications, setMedications] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setUserId(user.id)
        setFullName(user.user_metadata?.full_name || "")
      }
    }
    checkAuth()
  }, [router])

  const handleNext = () => {
    if (step === 1 && (!fullName || !dateOfBirth || !gender)) {
      setError("Please fill in all required fields")
      return
    }
    if (step === 2 && (!heightCm || !weightKg)) {
      setError("Please fill in all required fields")
      return
    }
    setError(null)
    setStep(step + 1)
  }

  const handleBack = () => {
    setError(null)
    setStep(step - 1)
  }

  const handleComplete = async () => {
    if (!userId) return

    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: fullName,
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        height_cm: heightCm ? Number.parseFloat(heightCm) : null,
        weight_kg: weightKg ? Number.parseFloat(weightKg) : null,
        phone: phone || null,
        emergency_contact_name: emergencyName || null,
        emergency_contact_phone: emergencyPhone || null,
        medical_conditions: conditions ? conditions.split(",").map((c) => c.trim()) : [],
        allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
        medications: medications ? medications.split(",").map((m) => m.trim()) : [],
      })

      if (profileError) throw profileError

      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/30 p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">HealthGuard</span>
          </Link>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="mb-4 flex justify-between">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-1 items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 4 && <div className={`mx-2 h-1 flex-1 rounded ${i < step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <CardTitle className="text-2xl text-card-foreground">
              {step === 1 && "Basic Information"}
              {step === 2 && "Physical Measurements"}
              {step === 3 && "Emergency Contact"}
              {step === 4 && "Medical History"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Let's start with your basic details"}
              {step === 2 && "Tell us about your physical measurements"}
              {step === 3 && "Who should we contact in case of emergency?"}
              {step === 4 && "Share your medical background (optional)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gender">
                      Gender <span className="text-destructive">*</span>
                    </Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="height">
                      Height (cm) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="170"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight">
                      Weight (kg) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="70"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Textarea
                      id="conditions"
                      value={conditions}
                      onChange={(e) => setConditions(e.target.value)}
                      placeholder="Comma-separated list (e.g., Hypertension, Diabetes)"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="Comma-separated list (e.g., Penicillin, Peanuts)"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      placeholder="Comma-separated list (e.g., Aspirin 100mg daily)"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={handleNext} className="flex-1">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleComplete} disabled={loading} className="flex-1">
                    {loading ? "Completing..." : "Complete Setup"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
