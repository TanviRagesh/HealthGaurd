"use server"

export interface WikipediaSearchResult {
  id: number
  key: string
  title: string
  excerpt: string
  description: string | null
  thumbnail?: {
    url: string
    width: number
    height: number
  }
}

export async function searchWikipedia(query: string): Promise<WikipediaSearchResult[]> {
  try {
    const url = `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${encodeURIComponent(query + " health medical")}&limit=10`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "HealthGuard/1.0 (https://healthguard.app)",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Wikipedia articles")
    }

    const data = await response.json()
    return data.pages || []
  } catch (error) {
    console.error("[v0] Error fetching Wikipedia articles:", error)
    return []
  }
}

export function getWikipediaUrl(key: string): string {
  return `https://en.wikipedia.org/wiki/${key}`
}
