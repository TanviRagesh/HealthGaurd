export interface HealthAlert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  source: string
  sourceUrl: string
  date: string
}

export const stateHealthAlerts: Record<string, HealthAlert[]> = {
  "Andhra Pradesh": [
    {
      id: "1",
      title: "Dengue Outbreak Alert",
      description:
        "Increased dengue cases reported in coastal districts. Take preventive measures against mosquito breeding.",
      severity: "high",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-01",
    },
    {
      id: "2",
      title: "Seasonal Flu Prevention",
      description: "Seasonal influenza cases rising. Vaccination recommended for vulnerable populations.",
      severity: "medium",
      source: "WHO India",
      sourceUrl: "https://www.who.int/health-topics/influenza-seasonal",
      date: "2024-12-28",
    },
  ],
  "Arunachal Pradesh": [
    {
      id: "3",
      title: "Malaria Prevention Campaign",
      description: "Active malaria transmission in forest areas. Use mosquito nets and prophylaxis.",
      severity: "high",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/malaria",
      date: "2025-01-02",
    },
  ],
  Assam: [
    {
      id: "4",
      title: "Japanese Encephalitis Alert",
      description: "JE cases detected in rural areas. Vaccination drive underway.",
      severity: "high",
      source: "State Health Services",
      sourceUrl: "https://www.who.int/health-topics/japanese-encephalitis",
      date: "2024-12-30",
    },
    {
      id: "5",
      title: "Flood-Related Health Risks",
      description: "Water-borne disease precautions advised in flood-affected areas.",
      severity: "medium",
      source: "Disaster Management",
      sourceUrl: "https://www.who.int/emergencies",
      date: "2024-12-25",
    },
  ],
  Bihar: [
    {
      id: "6",
      title: "Acute Encephalitis Syndrome",
      description:
        "AES cases reported in several districts. Immediate medical attention advised for children with fever and altered consciousness.",
      severity: "high",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/encephalitis",
      date: "2025-01-03",
    },
  ],
  Chhattisgarh: [
    {
      id: "7",
      title: "Malaria Control Advisory",
      description: "Malaria cases in tribal areas. Distribute bed nets and ensure early diagnosis.",
      severity: "medium",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/malaria",
      date: "2024-12-27",
    },
  ],
  Goa: [
    {
      id: "8",
      title: "Dengue Prevention",
      description: "Monsoon-related dengue cases. Eliminate stagnant water sources.",
      severity: "medium",
      source: "Goa Health Services",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2024-12-29",
    },
  ],
  Gujarat: [
    {
      id: "9",
      title: "Seasonal Influenza",
      description: "Flu cases rising in urban areas. Elderly and children should get vaccinated.",
      severity: "low",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/influenza-seasonal",
      date: "2024-12-26",
    },
  ],
  Haryana: [
    {
      id: "10",
      title: "Air Quality Health Advisory",
      description: "Poor air quality affecting respiratory health. Minimize outdoor activities.",
      severity: "high",
      source: "Pollution Control Board",
      sourceUrl: "https://www.who.int/health-topics/air-pollution",
      date: "2025-01-04",
    },
  ],
  "Himachal Pradesh": [
    {
      id: "11",
      title: "Hypothermia Prevention",
      description: "Severe cold wave conditions. Protect vulnerable populations from extreme cold.",
      severity: "medium",
      source: "State Disaster Management",
      sourceUrl: "https://www.who.int/health-topics/environmental-health",
      date: "2025-01-01",
    },
  ],
  Jharkhand: [
    {
      id: "12",
      title: "Malaria and Kala-azar Alert",
      description: "Vector-borne disease cases in rural districts. Seek immediate treatment.",
      severity: "high",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/leishmaniasis",
      date: "2024-12-31",
    },
  ],
  Karnataka: [
    {
      id: "13",
      title: "Dengue Fever Cases",
      description: "Dengue reported in Bangalore and coastal regions. Use mosquito repellents.",
      severity: "medium",
      source: "BBMP Health",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-02",
    },
  ],
  Kerala: [
    {
      id: "14",
      title: "Nipah Virus Surveillance",
      description: "Enhanced surveillance for Nipah virus. Report bat exposure immediately.",
      severity: "high",
      source: "Kerala Health Services",
      sourceUrl: "https://www.who.int/health-topics/nipah-virus-disease",
      date: "2025-01-03",
    },
    {
      id: "15",
      title: "Leptospirosis Warning",
      description: "Post-monsoon leptospirosis cases. Avoid wading in stagnant water.",
      severity: "medium",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/leptospirosis",
      date: "2024-12-28",
    },
  ],
  "Madhya Pradesh": [
    {
      id: "16",
      title: "Dengue and Chikungunya",
      description: "Vector-borne diseases active. Prevent mosquito breeding around homes.",
      severity: "medium",
      source: "MP Health Services",
      sourceUrl: "https://www.who.int/health-topics/chikungunya",
      date: "2024-12-30",
    },
  ],
  Maharashtra: [
    {
      id: "17",
      title: "Dengue Outbreak",
      description: "Significant dengue cases in Mumbai and Pune. Seek medical care for high fever.",
      severity: "high",
      source: "BMC Health",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-04",
    },
    {
      id: "18",
      title: "Swine Flu Alert",
      description: "H1N1 cases detected. Practice good hygiene and avoid crowded places.",
      severity: "medium",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/influenza-seasonal",
      date: "2025-01-01",
    },
  ],
  Manipur: [
    {
      id: "19",
      title: "Malaria Control",
      description: "Malaria transmission in border areas. Use bed nets and antimalarial drugs.",
      severity: "medium",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/malaria",
      date: "2024-12-27",
    },
  ],
  Meghalaya: [
    {
      id: "20",
      title: "Tuberculosis Awareness",
      description: "TB screening camps organized. Free testing and treatment available.",
      severity: "low",
      source: "State TB Control",
      sourceUrl: "https://www.who.int/health-topics/tuberculosis",
      date: "2024-12-29",
    },
  ],
  Mizoram: [
    {
      id: "21",
      title: "Malaria Prevention",
      description: "Malaria cases in hilly regions. Regular screening advised.",
      severity: "medium",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/malaria",
      date: "2024-12-31",
    },
  ],
  Nagaland: [
    {
      id: "22",
      title: "Vector-Borne Diseases",
      description: "Malaria and dengue prevention campaigns active.",
      severity: "medium",
      source: "State Health",
      sourceUrl: "https://www.who.int/health-topics/vector-borne-diseases",
      date: "2025-01-02",
    },
  ],
  Odisha: [
    {
      id: "23",
      title: "Dengue and Malaria Alert",
      description: "Post-cyclone health surveillance. Report fever cases immediately.",
      severity: "high",
      source: "Odisha Health Services",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-03",
    },
  ],
  Punjab: [
    {
      id: "24",
      title: "Air Pollution Health Impact",
      description: "Smog affecting respiratory health. Use masks outdoors.",
      severity: "high",
      source: "Punjab Pollution Board",
      sourceUrl: "https://www.who.int/health-topics/air-pollution",
      date: "2025-01-04",
    },
  ],
  Rajasthan: [
    {
      id: "25",
      title: "Seasonal Flu",
      description: "Influenza cases rising in winter. Vaccination recommended.",
      severity: "low",
      source: "State Health Department",
      sourceUrl: "https://www.who.int/health-topics/influenza-seasonal",
      date: "2024-12-26",
    },
  ],
  Sikkim: [
    {
      id: "26",
      title: "Cold Wave Health Advisory",
      description: "Extreme cold conditions. Protect against hypothermia.",
      severity: "medium",
      source: "State Health Services",
      sourceUrl: "https://www.who.int/health-topics/environmental-health",
      date: "2025-01-01",
    },
  ],
  "Tamil Nadu": [
    {
      id: "27",
      title: "Dengue Prevention",
      description: "Dengue cases in Chennai and districts. Prevent water stagnation.",
      severity: "high",
      source: "TN Health Department",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-03",
    },
    {
      id: "28",
      title: "Chikungunya Alert",
      description: "Chikungunya transmission active. Use mosquito repellents.",
      severity: "medium",
      source: "Public Health",
      sourceUrl: "https://www.who.int/health-topics/chikungunya",
      date: "2024-12-30",
    },
  ],
  Telangana: [
    {
      id: "29",
      title: "Dengue Outbreak",
      description: "High dengue incidence in Hyderabad. Seek early treatment.",
      severity: "high",
      source: "GHMC Health",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-04",
    },
  ],
  Tripura: [
    {
      id: "30",
      title: "Malaria Control",
      description: "Malaria cases in rural areas. Use mosquito nets.",
      severity: "medium",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/malaria",
      date: "2024-12-28",
    },
  ],
  "Uttar Pradesh": [
    {
      id: "31",
      title: "Dengue and Chikungunya",
      description: "Vector-borne diseases in multiple districts. Take preventive measures.",
      severity: "high",
      source: "UP Health Department",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-02",
    },
    {
      id: "32",
      title: "Air Quality Alert",
      description: "Poor air quality in NCR region. Limit outdoor exposure.",
      severity: "high",
      source: "Pollution Control Board",
      sourceUrl: "https://www.who.int/health-topics/air-pollution",
      date: "2025-01-04",
    },
  ],
  Uttarakhand: [
    {
      id: "33",
      title: "Winter Health Advisory",
      description: "Cold-related health risks in hilly areas. Stay warm and hydrated.",
      severity: "low",
      source: "State Health Services",
      sourceUrl: "https://www.who.int/health-topics/environmental-health",
      date: "2025-01-01",
    },
  ],
  "West Bengal": [
    {
      id: "34",
      title: "Dengue Outbreak",
      description: "Dengue cases in Kolkata and districts. Eliminate mosquito breeding sites.",
      severity: "high",
      source: "WB Health Department",
      sourceUrl: "https://www.who.int/health-topics/dengue-and-severe-dengue",
      date: "2025-01-03",
    },
    {
      id: "35",
      title: "Kala-azar Surveillance",
      description: "Kala-azar cases monitored. Seek treatment for prolonged fever.",
      severity: "medium",
      source: "NVBDCP",
      sourceUrl: "https://www.who.int/health-topics/leishmaniasis",
      date: "2024-12-29",
    },
  ],
}

export function getIndianStates(): string[] {
  return Object.keys(stateHealthAlerts).sort()
}

export function getHealthAlertsByState(state: string): HealthAlert[] {
  return stateHealthAlerts[state] || []
}
