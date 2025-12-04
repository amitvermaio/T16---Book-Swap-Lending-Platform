"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart } from "lucide-react"
import { useState } from "react"

interface BookCardProps {
  book: {
    id: number
    title: string
    author: string
    genre: string
    condition: string
    availability: string
    owner: string
    rating: number
    reviews: number
    location: string
    image: string
    type: "borrow" | "swap"
  }
  onRequest: (book: any) => void
  onNotify: (book: any) => void
}

export default function BookCard({ book, onRequest, onNotify }: BookCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-border/40 bg-gradient-to-br from-card to-card/80">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-56 sm:h-64">
        <img
          src={book.image || "/placeholder.svg?height=256&width=192&query=book-cover"}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Condition Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/95 text-foreground text-xs font-semibold uppercase tracking-wide"
          >
            {book.condition === "like-new" ? "Like New" : book.condition}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 left-3 bg-white/95 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>

        {/* Type Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
            {book.type === "borrow" ? "Borrow" : "Swap"}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-balance font-semibold text-foreground text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{book.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({book.reviews} reviews)</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{book.location}</span>
        </div>

        {/* Owner */}
        <p className="text-xs text-muted-foreground mb-4">
          Lent by <span className="font-semibold text-foreground">{book.owner}</span>
        </p>

        {/* Availability */}
        <div className="mb-4">
          <Badge variant={book.availability === "available" ? "default" : "outline"} className="text-xs font-medium">
            {book.availability === "available" ? "Available Now" : "Unavailable"}
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          className="w-full mt-auto text-sm font-semibold"
          onClick={() => {
            if (book.availability === "available") {
              onRequest(book)
            } else {
              onNotify(book)
            }
          }}
        >
          {book.availability === "available" ? "Request Book" : "Notify Me"}
        </Button>
      </div>
    </Card>
  )
}
