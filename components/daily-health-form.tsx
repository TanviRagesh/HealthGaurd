"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Save } from "lucide-react"

interface DailyHealthFormProps {
  userId: string
}

export function DailyHealthForm({ userId }: DailyHealthFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    log_date: new Date().toISOString().split("T")[0],
    sleep_hours: "",
    exercise_minutes: "",
    stress_level: "",
    calories_intake: "",
    water_intake_ml: "",
    mood_level: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    const dataToSubmit = {
      user_id: userId,
      log_date: formData.log_date,
      sleep_hours: formData.sleep_hours ? Number.parseFloat(formData.sleep_hours) : null,
      exercise_minutes: formData.exercise_minutes ? Number.parseInt(formData.exercise_minutes) : null,
      stress_level: formData.stress_level ? Number.parseInt(formData.stress_level) : null,
      calories_intake: formData.calories_intake ? Number.parseInt(formData.calories_intake) : null,
      water_intake_ml: formData.water_intake_ml ? Number.parseInt(formData.water_intake_ml) : null,
      mood_level: formData.mood_level ? Number.parseInt(formData.mood_level) : null,
      notes: formData.notes || null,
    }

    const { error } = await supabase.from("daily_health_logs").upsert(dataToSubmit, {
      onConflict: "user_id,log_date",
    })

    if (!error) {
      router.refresh()
      // Reset form to today's date
      setFormData({
        log_date: new Date().toISOString().split("T")[0],
        sleep_hours: "",
        exercise_minutes: "",
        stress_level: "",
        calories_intake: "",
        water_intake_ml: "",
        mood_level: "",
        notes: "",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Log Daily Health Data</CardTitle>
        <CardDescription>Record your daily habits to track health trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="log_date" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Date
              </Label>
              <Input
                id="log_date"
                type="date"
                value={formData.log_date}
                onChange={(e) => setFormData({ ...formData, log_date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep_hours">Sleep Hours</Label>
              <Input
                id="sleep_hours"
                type="number"
                step="0.5"
                min="0"
                max="24"
                placeholder="e.g., 7.5"
                value={formData.sleep_hours}
                onChange={(e) => setFormData({ ...formData, sleep_hours: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exercise_minutes">Exercise (minutes)</Label>
              <Input
                id="exercise_minutes"
                type="number"
                min="0"
                placeholder="e.g., 30"
                value={formData.exercise_minutes}
                onChange={(e) => setFormData({ ...formData, exercise_minutes: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stress_level">Stress Level (1-10)</Label>
              <Input
                id="stress_level"
                type="number"
                min="1"
                max="10"
                placeholder="1 = Low, 10 = High"
                value={formData.stress_level}
                onChange={(e) => setFormData({ ...formData, stress_level: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories_intake">Calorie Intake</Label>
              <Input
                id="calories_intake"
                type="number"
                min="0"
                placeholder="e.g., 2000"
                value={formData.calories_intake}
                onChange={(e) => setFormData({ ...formData, calories_intake: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="water_intake_ml">Water Intake (ml)</Label>
              <Input
                id="water_intake_ml"
                type="number"
                min="0"
                placeholder="e.g., 2000"
                value={formData.water_intake_ml}
                onChange={(e) => setFormData({ ...formData, water_intake_ml: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mood_level">Mood Level (1-10)</Label>
              <Input
                id="mood_level"
                type="number"
                min="1"
                max="10"
                placeholder="1 = Poor, 10 = Excellent"
                value={formData.mood_level}
                onChange={(e) => setFormData({ ...formData, mood_level: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional observations about your day..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Daily Log"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
