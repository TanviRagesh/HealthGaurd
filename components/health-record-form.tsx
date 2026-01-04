"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HealthRecordFormProps {
  userId: string
}

export function HealthRecordForm({ userId }: HealthRecordFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [recordDate, setRecordDate] = useState(new Date().toISOString().split("T")[0])
  const [systolic, setSystolic] = useState("")
  const [diastolic, setDiastolic] = useState("")
  const [heartRate, setHeartRate] = useState("")
  const [bloodSugar, setBloodSugar] = useState("")
  const [temperature, setTemperature] = useState("")
  const [weight, setWeight] = useState("")
  const [oxygenSat, setOxygenSat] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("health_records").insert({
        user_id: userId,
        record_date: recordDate,
        blood_pressure_systolic: systolic ? Number.parseInt(systolic) : null,
        blood_pressure_diastolic: diastolic ? Number.parseInt(diastolic) : null,
        heart_rate: heartRate ? Number.parseInt(heartRate) : null,
        blood_sugar: bloodSugar ? Number.parseFloat(bloodSugar) : null,
        temperature: temperature ? Number.parseFloat(temperature) : null,
        weight_kg: weight ? Number.parseFloat(weight) : null,
        oxygen_saturation: oxygenSat ? Number.parseInt(oxygenSat) : null,
        notes: notes || null,
      })

      if (insertError) throw insertError

      // Reset form
      setSystolic("")
      setDiastolic("")
      setHeartRate("")
      setBloodSugar("")
      setTemperature("")
      setWeight("")
      setOxygenSat("")
      setNotes("")
      setRecordDate(new Date().toISOString().split("T")[0])

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
        <CardTitle className="text-card-foreground">Record New Entry</CardTitle>
        <CardDescription>Log your health measurements for today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="systolic">Blood Pressure - Systolic (mmHg)</Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diastolic">Blood Pressure - Diastolic (mmHg)</Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="bloodSugar"
                type="number"
                step="0.1"
                placeholder="100"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="36.5"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="oxygenSat">Oxygen Saturation (%)</Label>
              <Input
                id="oxygenSat"
                type="number"
                placeholder="98"
                value={oxygenSat}
                onChange={(e) => setOxygenSat(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional observations or symptoms..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          {success && (
            <div className="rounded-md bg-secondary/20 p-3 text-sm text-secondary-foreground">
              Health record saved successfully!
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Record"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
