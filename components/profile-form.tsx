"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Profile {
  id: string
  full_name: string
  date_of_birth: string | null
  gender: string | null
  height_cm: number | null
  weight_kg: number | null
  phone: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  medical_conditions: string[] | null
  allergies: string[] | null
  medications: string[] | null
}

interface ProfileFormProps {
  profile: Profile
  userId: string
}

export function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [fullName, setFullName] = useState(profile.full_name || "")
  const [dateOfBirth, setDateOfBirth] = useState(profile.date_of_birth || "")
  const [gender, setGender] = useState(profile.gender || "")
  const [heightCm, setHeightCm] = useState(profile.height_cm?.toString() || "")
  const [weightKg, setWeightKg] = useState(profile.weight_kg?.toString() || "")
  const [phone, setPhone] = useState(profile.phone || "")
  const [emergencyName, setEmergencyName] = useState(profile.emergency_contact_name || "")
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergency_contact_phone || "")
  const [conditions, setConditions] = useState(profile.medical_conditions?.join(", ") || "")
  const [allergies, setAllergies] = useState(profile.allergies?.join(", ") || "")
  const [medications, setMedications] = useState(profile.medications?.join(", ") || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
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
        .eq("id", userId)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => router.refresh(), 1000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Personal Information</CardTitle>
          <CardDescription>Your basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
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
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Physical Measurements</CardTitle>
          <CardDescription>Your current height and weight</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Emergency Contact</CardTitle>
          <CardDescription>Who should we contact in case of emergency?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="emergencyName">Contact Name</Label>
              <Input id="emergencyName" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyPhone">Contact Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Medical History</CardTitle>
          <CardDescription>Your medical background information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="conditions">Medical Conditions</Label>
            <Textarea
              id="conditions"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              placeholder="Comma-separated list"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Comma-separated list"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              placeholder="Comma-separated list"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      {success && (
        <div className="rounded-md bg-secondary/20 p-3 text-sm text-secondary-foreground">
          Profile updated successfully!
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
