"use client"
import { useState } from "react"
import BookCard from "./book-card"
import BookDetailModal from "./book-detail-modal"
import { useToast } from "@/hooks/use-toast"
import { Search } from "lucide-react"

interface BookCatalogProps {
  searchTerm: string
  filters: {
    genre: string
    availability: string
    location: string
    condition: string
  }
}

const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "fiction",
    condition: "like-new",
    availability: "available",
    owner: "Sarah M.",
    rating: 4.8,
    reviews: 12,
    location: "Downtown",
    image: "/the-great-gatsby-book.jpg",
    type: "borrow" as const,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "non-fiction",
    condition: "good",
    availability: "available",
    owner: "Mike R.",
    rating: 4.9,
    reviews: 28,
    location: "East Side",
    image: "/atomic-habits-book.jpg",
    type: "swap" as const,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    condition: "good",
    availability: "available",
    owner: "Alex K.",
    rating: 4.7,
    reviews: 15,
    location: "North District",
    image: "/dune-book.jpg",
    type: "borrow" as const,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "fiction",
    condition: "like-new",
    availability: "unavailable",
    owner: "Emma W.",
    rating: 4.9,
    reviews: 35,
    location: "West End",
    image: "/to-kill-a-mockingbird-book.jpg",
    type: "borrow" as const,
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "sci-fi",
    condition: "good",
    availability: "available",
    owner: "John D.",
    rating: 4.8,
    reviews: 22,
    location: "Downtown",
    image: "/project-hail-mary-book.jpg",
    type: "swap" as const,
  },
  {
    id: 6,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "fantasy",
    condition: "good",
    availability: "available",
    owner: "Lisa T.",
    rating: 4.6,
    reviews: 18,
    location: "East Side",
    image: "/the-midnight-library-book.jpg",
    type: "borrow" as const,
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "fantasy",
    condition: "good",
    availability: "available",
    owner: "David P.",
    rating: 4.9,
    reviews: 45,
    location: "North District",
    image: "/the-hobbit-book.jpg",
    type: "borrow" as const,
  },
  {
    id: 8,
    title: "Educated",
    author: "Tara Westover",
    genre: "biography",
    condition: "like-new",
    availability: "available",
    owner: "Rachel S.",
    rating: 4.8,
    reviews: 32,
    location: "West End",
    image: "/educated-tara-westover-book.jpg",
    type: "swap" as const,
  },
]

export default function BookCatalog({ searchTerm, filters }: BookCatalogProps) {
  const [selectedBook, setSelectedBook] = useState<(typeof mockBooks)[0] | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const { toast } = useToast()

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = !filters.genre || book.genre === filters.genre
    const matchesAvailability = filters.availability === "all" || book.availability === filters.availability
    const matchesCondition = !filters.condition || book.condition === filters.condition

    return matchesSearch && matchesGenre && matchesAvailability && matchesCondition
  })

  const handleRequest = (book: (typeof mockBooks)[0]) => {
    setSelectedBook(book)
    setDetailModalOpen(true)
    toast({
      title: "Request Ready",
      description: `Ready to request "${book.title}" from ${book.owner}`,
    })
  }

  const handleNotify = (book: (typeof mockBooks)[0]) => {
    toast({
      title: "Notification Set",
      description: `You'll be notified when "${book.title}" becomes available`,
    })
  }

  return (
    <>
      {/* Results Header */}
      <div className="mb-8 flex items-center gap-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground font-medium">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onRequest={handleRequest} onNotify={handleNotify} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">No books found</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Try adjusting your search terms or filters to find the books you're looking for
            </p>
          </div>
        </div>
      )}

      <BookDetailModal book={selectedBook} open={detailModalOpen} onOpenChange={setDetailModalOpen} />
    </>
  )
}
