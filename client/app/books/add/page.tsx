"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddBookPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    condition: "good",
    description: "",
    lendingType: "borrow",
    borrowDuration: "14",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.genre) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Book added successfully!",
        description: `"${formData.title}" has been added to your collection.`,
      })
      setIsSubmitting(false)
      router.push("/books")
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
          <h1 className="text-balance text-4xl font-bold text-foreground mb-2">Add a Book</h1>
          <p className="text-muted-foreground">Share a book from your collection with the community</p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Book Details Section */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Book Details</h2>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Book Title *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter book title"
                      required
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Author *</label>
                    <Input
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>

                  {/* ISBN */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">ISBN (optional)</label>
                    <Input name="isbn" value={formData.isbn} onChange={handleInputChange} placeholder="Enter ISBN" />
                  </div>

                  {/* Genre */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Genre *</label>
                    <Select value={formData.genre} onValueChange={(value) => handleSelectChange("genre", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                        <SelectItem value="mystery">Mystery</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="sci-fi">Science Fiction</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="biography">Biography</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="self-help">Self-Help</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Book Condition *</label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the book condition, any notes, or special features..."
                      className="min-h-24"
                    />
                  </div>
                </div>
              </div>

              {/* Lending Settings Section */}
              <div className="pt-6 border-t">
                <h2 className="text-lg font-semibold mb-4">Lending Settings</h2>
                <div className="space-y-4">
                  {/* Lending Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lending Type *</label>
                    <Select
                      value={formData.lendingType}
                      onValueChange={(value) => handleSelectChange("lendingType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="borrow">Allow Borrowing</SelectItem>
                        <SelectItem value="swap">Allow Swapping Only</SelectItem>
                        <SelectItem value="both">Allow Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Borrow Duration */}
                  {(formData.lendingType === "borrow" || formData.lendingType === "both") && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Maximum Borrow Duration (days)</label>
                      <Select
                        value={formData.borrowDuration}
                        onValueChange={(value) => handleSelectChange("borrowDuration", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days (2 weeks)</SelectItem>
                          <SelectItem value="21">21 days (3 weeks)</SelectItem>
                          <SelectItem value="30">30 days (1 month)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Adding Book..." : "Add Book"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => router.push("/books")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
