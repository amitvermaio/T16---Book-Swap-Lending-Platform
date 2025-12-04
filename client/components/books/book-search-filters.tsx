"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, X } from "lucide-react"
import Link from "next/link"

interface BookSearchFiltersProps {
  filters: {
    genre: string
    availability: string
    location: string
    condition: string
  }
  onFilterChange: (filters: any) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function BookSearchFilters({
  filters,
  onFilterChange,
  searchTerm,
  onSearchChange,
}: BookSearchFiltersProps) {
  const handleGenreChange = (value: string) => {
    onFilterChange({ ...filters, genre: value === "all-genres" ? "" : value })
  }

  const handleAvailabilityChange = (value: string) => {
    onFilterChange({ ...filters, availability: value })
  }

  const handleLocationChange = (value: string) => {
    onFilterChange({ ...filters, location: value === "any-location" ? "" : value })
  }

  const handleConditionChange = (value: string) => {
    onFilterChange({ ...filters, condition: value === "any-condition" ? "" : value })
  }

  const handleClearFilters = () => {
    onSearchChange("")
    onFilterChange({
      genre: "",
      availability: "all",
      location: "",
      condition: "",
    })
  }

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm || filters.genre || filters.availability !== "all" || filters.location || filters.condition

  return (
    <div className="py-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
        {/* Add Book Button */}
        <Button asChild size="sm" className="shrink-0">
          <Link href="/books/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Link>
        </Button>

        {/* Search Bar */}
        <div className="flex-1 min-w-[200px] max-w-xs">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
            <Input
              placeholder="Search by title, author..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10 bg-background border-border/60 text-sm"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <Select value={filters.genre || "all-genres"} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-[140px] h-10 bg-background border-border/60 text-sm">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-genres">All genres</SelectItem>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="sci-fi">Sci-Fi</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="biography">Biography</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>

        {/* Availability Filter */}
        <Select value={filters.availability} onValueChange={handleAvailabilityChange}>
          <SelectTrigger className="w-[140px] h-10 bg-background border-border/60 text-sm">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available Now</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select value={filters.location || "any-location"} onValueChange={handleLocationChange}>
          <SelectTrigger className="w-[140px] h-10 bg-background border-border/60 text-sm">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any-location">Any location</SelectItem>
            <SelectItem value="nearby">Within 5 miles</SelectItem>
            <SelectItem value="city">Same city</SelectItem>
            <SelectItem value="state">Same state</SelectItem>
          </SelectContent>
        </Select>

        {/* Condition Filter */}
        <Select value={filters.condition || "any-condition"} onValueChange={handleConditionChange}>
          <SelectTrigger className="w-[140px] h-10 bg-background border-border/60 text-sm">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any-condition">Any condition</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="shrink-0">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
