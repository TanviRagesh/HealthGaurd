"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Droplet, Heart, Scale, Thermometer, Wind } from "lucide-react"

interface HealthRecord {
  id: string
  record_date: string
  blood_pressure_systolic: number | null
  blood_pressure_diastolic: number | null
  heart_rate: number | null
  blood_sugar: number | null
  temperature: number | null
  weight_kg: number | null
  oxygen_saturation: number | null
  notes: string | null
}

interface HealthRecordsListProps {
  records: HealthRecord[]
}

export function HealthRecordsList({ records }: HealthRecordsListProps) {
  if (records.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Records</CardTitle>
          <CardDescription>Your health measurement history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No records yet</p>
            <p className="text-sm text-muted-foreground">
              Start tracking your health by adding your first record above
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Records</CardTitle>
        <CardDescription>Your last 30 health measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  {new Date(record.record_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {record.heart_rate && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Heart Rate</p>
                      <p className="font-semibold text-foreground">{record.heart_rate} bpm</p>
                    </div>
                  </div>
                )}

                {record.blood_pressure_systolic && record.blood_pressure_diastolic && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Activity className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Pressure</p>
                      <p className="font-semibold text-foreground">
                        {record.blood_pressure_systolic}/{record.blood_pressure_diastolic} mmHg
                      </p>
                    </div>
                  </div>
                )}

                {record.blood_sugar && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Droplet className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Sugar</p>
                      <p className="font-semibold text-foreground">{record.blood_sugar} mg/dL</p>
                    </div>
                  </div>
                )}

                {record.temperature && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="font-semibold text-foreground">{record.temperature}°C</p>
                    </div>
                  </div>
                )}

                {record.weight_kg && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Scale className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-semibold text-foreground">{record.weight_kg} kg</p>
                    </div>
                  </div>
                )}

                {record.oxygen_saturation && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Wind className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Oxygen Sat</p>
                      <p className="font-semibold text-foreground">{record.oxygen_saturation}%</p>
                    </div>
                  </div>
                )}
              </div>

              {record.notes && (
                <div className="mt-3 rounded-md bg-background/50 p-3">
                  <p className="text-sm text-muted-foreground">{record.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
