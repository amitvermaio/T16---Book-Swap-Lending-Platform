"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Edit2, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/the-great-gatsby-book.jpg",
    status: "Available",
    condition: "Excellent",
    type: "Borrow",
    rating: 4.8,
    borrows: 5,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/atomic-habits-book.jpg",
    status: "Borrowed",
    condition: "Good",
    type: "Swap",
    rating: 4.9,
    borrows: 8,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "/dune-book.jpg",
    status: "Available",
    condition: "Like New",
    type: "Borrow",
    rating: 4.7,
    borrows: 3,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/to-kill-a-mockingbird-book.jpg",
    status: "Available",
    condition: "Good",
    type: "Swap",
    rating: 4.9,
    borrows: 12,
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/project-hail-mary-book.jpg",
    status: "Available",
    condition: "Excellent",
    type: "Borrow",
    rating: 4.8,
    borrows: 6,
  },
  {
    id: 6,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/the-midnight-library-book.jpg",
    status: "Available",
    condition: "Good",
    type: "Borrow",
    rating: 4.6,
    borrows: 4,
  },
  {
    id: 7,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    cover: "/book-cover-.jpg?height=200&width=150&query=where-crawdads-sing",
    status: "Available",
    condition: "Excellent",
    type: "Swap",
    rating: 4.7,
    borrows: 7,
  },
  {
    id: 8,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/book-cover-.jpg?height=200&width=150&query=book-cover",
    status: "Available",
    condition: "Good",
    type: "Borrow",
    rating: 4.6,
    borrows: 4,
  },
]

export default function BookCollectionGrid() {
  const [books, setBooks] = useState(mockBooks)
  const [editingBook, setEditingBook] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleDelete = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
    toast({
      title: "Book removed",
      description: "The book has been removed from your collection.",
    })
  }

  const handleEdit = (id: number) => {
    setEditingBook(id)
  }

  const handleShare = (id: number) => {
    const book = books.find((b) => b.id === id)
    toast({
      title: "Share link copied!",
      description: `Check out "${book?.title}" - shared by Sarah Martinez`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Borrowed":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-full">
      {/* Header with sorting and view options */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">My Book Collection ({books.length})</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Sort by Title
          </Button>
          <Button variant="outline" size="sm">
            Filter by Status
          </Button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="group">
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
              {/* Book Cover */}
              <div className="relative overflow-hidden h-48 md:h-56 bg-muted">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badge */}
                <Badge className={`absolute top-2 right-2 ${getStatusColor(book.status)}`}>{book.status}</Badge>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="gap-1 bg-white/90 hover:bg-white"
                      onClick={() => handleShare(book.id)}
                    >
                      <Share2 className="h-3 w-3" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1 p-3 flex flex-col">
                <h4 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h4>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{book.author}</p>

                {/* Details */}
                <div className="space-y-1 mb-3 flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Condition:</span>
                    <Badge variant="outline" className="text-xs">
                      {book.condition}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{book.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Borrowed:</span>
                    <span className="font-medium">{book.borrows}x</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1 bg-transparent"
                        onClick={() => handleEdit(book.id)}
                      >
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Book Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Book Title</label>
                          <Input defaultValue={book.title} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Author</label>
                          <Input defaultValue={book.author} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Condition</label>
                          <select className="w-full border rounded-md p-2 text-sm">
                            <option>Like New</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Lending Type</label>
                          <select className="w-full border rounded-md p-2 text-sm">
                            <option>Borrow</option>
                            <option>Swap</option>
                            <option>Both</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Additional Notes</label>
                          <Textarea placeholder="Any special notes about this book..." />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => toast({ title: "Book updated", description: "Changes saved successfully." })}
                          >
                            Save Changes
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 gap-1 hover:bg-red-50"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-center">
            <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No books yet</h3>
            <p className="text-muted-foreground mb-6">Start building your collection by adding books!</p>
            <Button>Add Your First Book</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
