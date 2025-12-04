"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookDetailModalProps {
  book: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BookDetailModal({ book, open, onOpenChange }: BookDetailModalProps) {
  const [message, setMessage] = useState("")
  const [requestType, setRequestType] = useState<"borrow" | "swap">("borrow")
  const { toast } = useToast()

  if (!book) return null

  const handleRequestSubmit = () => {
    if (!message.trim() && requestType === "swap") {
      toast({
        title: "Message required",
        description: "Please add a message for swap requests",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Request sent!",
      description: `${requestType === "borrow" ? "Borrow" : "Swap"} request sent to ${book.owner}`,
    })

    setMessage("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>{book.author}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm text-muted-foreground mb-1">Author</h3>
              <p className="font-medium">{book.author}</p>
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground mb-1">Genre</h3>
              <Badge variant="outline" className="capitalize">
                {book.genre}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Rating</h3>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(book.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="text-sm font-medium">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{book.location}</span>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm text-muted-foreground mb-2">Owner</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{book.owner[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{book.owner}</p>
                  <p className="text-xs text-muted-foreground">Book owner</p>
                </div>
              </div>
            </div>

            {/* Request Type Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Request Type</h3>
              <div className="flex gap-2">
                <Button
                  variant={requestType === "borrow" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRequestType("borrow")}
                  className={requestType === "borrow" ? "" : "bg-transparent"}
                >
                  Borrow
                </Button>
                <Button
                  variant={requestType === "swap" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRequestType("swap")}
                  className={requestType === "swap" ? "" : "bg-transparent"}
                >
                  Swap
                </Button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {requestType === "swap" ? "Books offering to swap" : "Message (optional)"}
              </label>
              <Textarea
                placeholder={requestType === "swap" ? "List books you're offering..." : "Add a personal message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button className="flex-1" onClick={handleRequestSubmit}>
                Send {requestType === "borrow" ? "Borrow" : "Swap"} Request
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
