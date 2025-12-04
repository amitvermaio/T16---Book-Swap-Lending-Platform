"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, BookOpen, Award, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface UserProfile {
  id: string
  name: string
  avatar: string
  rating: number
  reviews: number
  location: string
  joinDate: string
  booksLent: number
  booksOwned: number
  successRate: number
  bio: string
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    avatar: "SM",
    rating: 4.9,
    reviews: 28,
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    booksLent: 45,
    booksOwned: 120,
    successRate: 98,
    bio: "Book lover and voracious reader. Love swapping fiction and sci-fi novels!",
  },
  {
    id: "2",
    name: "James Chen",
    avatar: "JC",
    rating: 4.8,
    reviews: 32,
    location: "New York, NY",
    joinDate: "2022-11-20",
    booksLent: 67,
    booksOwned: 280,
    successRate: 96,
    bio: "Mystery and thriller enthusiast. Always keen to find new reading recommendations.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "ER",
    rating: 4.7,
    reviews: 19,
    location: "Austin, TX",
    joinDate: "2023-05-10",
    booksLent: 32,
    booksOwned: 95,
    successRate: 95,
    bio: "Casual reader exploring different genres and building my home library.",
  },
  {
    id: "4",
    name: "Michael Park",
    avatar: "MP",
    rating: 5.0,
    reviews: 15,
    location: "Seattle, WA",
    joinDate: "2023-08-22",
    booksLent: 18,
    booksOwned: 200,
    successRate: 100,
    bio: "Non-fiction focused. Happy to share knowledge through books.",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "LT",
    rating: 4.6,
    reviews: 41,
    location: "Boston, MA",
    joinDate: "2022-03-05",
    booksLent: 89,
    booksOwned: 350,
    successRate: 94,
    bio: "Classic literature devotee and book club organizer.",
  },
]

export default function UserProfiles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "recent">("rating")
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)

  const filteredUsers = mockUsers
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviews - a.reviews
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    })

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Members</h1>
          <p className="text-muted-foreground">Find and connect with other book enthusiasts</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search members by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "reviews" | "recent")}
            className="px-4 py-2 border border-input rounded-lg bg-background text-foreground"
          >
            <option value="rating">Highest Rating</option>
            <option value="reviews">Most Reviews</option>
            <option value="recent">Recently Joined</option>
          </select>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-lg font-bold text-foreground">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(user.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{user.rating}</span>
                  <span className="text-sm text-muted-foreground">({user.reviews})</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{user.bio}</p>
              </CardHeader>

              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{user.booksLent}</p>
                    <p className="text-xs text-muted-foreground">Books Lent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{user.booksOwned}</p>
                    <p className="text-xs text-muted-foreground">Books Owned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{user.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <BookOpen className="w-4 h-4" />
                    View Books
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Detail Modal */}
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedUser(null)}
          >
            <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-foreground">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <CardTitle>{selectedUser.name}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {selectedUser.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Joined {selectedUser.joinDate}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Rating Section */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Rating & Reviews</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedUser.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-foreground">{selectedUser.rating}</span>
                    <span className="text-muted-foreground">Based on {selectedUser.reviews} reviews</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{selectedUser.booksLent}</p>
                    <p className="text-sm text-muted-foreground">Books Lent</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{selectedUser.booksOwned}</p>
                    <p className="text-sm text-muted-foreground">Books Owned</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{selectedUser.successRate}%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{selectedUser.reviews}</p>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">About</h4>
                  <p className="text-muted-foreground">{selectedUser.bio}</p>
                </div>

                {/* Sample Reviews */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Recent Reviews</h4>
                  <div className="space-y-4">
                    {[
                      {
                        reviewer: "John Doe",
                        rating: 5,
                        text: "Excellent borrower! Well-maintained books and very reliable.",
                      },
                      {
                        reviewer: "Jane Smith",
                        rating: 5,
                        text: "Great communication and prompt return. Highly recommended!",
                      },
                    ].map((review, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">{review.reviewer}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="default" className="flex-1 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <BookOpen className="w-4 h-4" />
                    View Book Collection
                  </Button>
                  <Button variant="outline" size="icon">
                    <Award className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
