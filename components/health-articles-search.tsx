"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, AlertCircle, ExternalLink } from "lucide-react"
import { searchWikipedia, getWikipediaUrl, type WikipediaSearchResult } from "@/lib/actions/wikipedia"

export function HealthArticlesSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [articles, setArticles] = useState<WikipediaSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    const results = await searchWikipedia(searchQuery)
    setArticles(results)
    setIsSearching(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Search Health Information</CardTitle>
          <CardDescription>
            Search for health topics, diseases, or symptoms from trusted sources like Wikipedia and health portals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., diabetes, cancer, heart disease, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="mr-2 h-4 w-4" />
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && articles.length === 0 && !isSearching && (
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-foreground">No articles found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching for a different health topic or check your spelling
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="border-border bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-xl text-card-foreground">{article.title}</CardTitle>
                  {article.description && <p className="text-sm text-muted-foreground">{article.description}</p>}
                </div>
                {article.thumbnail && (
                  <img
                    src={article.thumbnail.url || "/placeholder.svg"}
                    alt={article.title}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
              <a
                href={getWikipediaUrl(article.key)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Read full article on Wikipedia
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
