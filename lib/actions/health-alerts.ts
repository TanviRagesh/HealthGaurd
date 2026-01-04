"use server"

import { stateHealthAlerts, type HealthAlert } from "@/lib/constants/health-alerts"

export async function getHealthAlertsByStateAsync(state: string): Promise<HealthAlert[]> {
  return stateHealthAlerts[state] || []
}

export function getIndianStates(): string[] {
  return Object.keys(stateHealthAlerts).sort()
}
