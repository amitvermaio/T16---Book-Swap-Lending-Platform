"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import BookCatalog from "@/components/books/book-catalog"
import BookSearchFilters from "@/components/books/book-search-filters"
import Footer from "@/components/footer"

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    genre: "",
    availability: "all",
    location: "",
    condition: "",
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-card/50 border-b border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <BookSearchFilters
            filters={filters}
            onFilterChange={setFilters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-balance text-5xl font-bold text-foreground mb-3">Browse Books</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover amazing books to borrow, swap, or add to your collection. Connect with book lovers in your
            community.
          </p>
        </div>

        <BookCatalog searchTerm={searchTerm} filters={filters} />
      </div>
      <Footer />
    </main>
  )
}
