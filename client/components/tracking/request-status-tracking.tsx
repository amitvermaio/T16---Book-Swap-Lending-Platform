"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Clock, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface BorrowRecord {
  id: string
  bookTitle: string
  owner: string
  borrowDate: string
  dueDate: string
  daysRemaining: number
  status: "active" | "overdue" | "returning" | "completed"
  progress: number
}

const mockBorrows: BorrowRecord[] = [
  {
    id: "1",
    bookTitle: "The Great Gatsby",
    owner: "Sarah M.",
    borrowDate: "Dec 1, 2024",
    dueDate: "Dec 15, 2024",
    daysRemaining: 5,
    status: "active",
    progress: 66,
  },
  {
    id: "2",
    bookTitle: "Project Hail Mary",
    owner: "John D.",
    borrowDate: "Nov 20, 2024",
    dueDate: "Dec 4, 2024",
    daysRemaining: -2,
    status: "overdue",
    progress: 125,
  },
  {
    id: "3",
    bookTitle: "Atomic Habits",
    owner: "Mike R.",
    borrowDate: "Dec 8, 2024",
    dueDate: "Dec 22, 2024",
    daysRemaining: 12,
    status: "active",
    progress: 28,
  },
]

export default function RequestStatusTracking() {
  const [borrows, setBorrows] = useState(mockBorrows)
  const [extensionDialogOpen, setExtensionDialogOpen] = useState(false)
  const [extensionDays, setExtensionDays] = useState("7")
  const [selectedBorrowId, setSelectedBorrowId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleReturnBook = (borrowId: string) => {
    setBorrows(borrows.map((b) => (b.id === borrowId ? { ...b, status: "completed" as const } : b)))
    toast({
      title: "Book return confirmed",
      description: "Thank you for returning the book on time!",
    })
  }

  const handleRequestExtension = (borrowId: string) => {
    setSelectedBorrowId(borrowId)
    setExtensionDialogOpen(true)
  }

  const handleSubmitExtension = () => {
    if (!selectedBorrowId || !extensionDays) return

    toast({
      title: "Extension requested",
      description: `Requested ${extensionDays} days extension. Waiting for owner approval.`,
    })

    setExtensionDialogOpen(false)
    setExtensionDays("7")
  }

  const handleContactOwner = (ownerName: string) => {
    toast({
      title: "Opening chat",
      description: `Starting conversation with ${ownerName}...`,
    })
  }

  const handleReturnImmediate = (borrowId: string) => {
    toast({
      title: "Return scheduled",
      description: "The owner has been notified. Please arrange pickup/delivery.",
    })
    setBorrows(borrows.map((b) => (b.id === borrowId ? { ...b, status: "returning" as const } : b)))
  }

  return (
    <div className="space-y-4">
      {borrows.map((borrow) => (
        <Card key={borrow.id} className="p-6">
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{borrow.bookTitle}</h3>
                <p className="text-sm text-muted-foreground">From {borrow.owner}</p>
              </div>

              <Badge
                variant={
                  borrow.status === "overdue" ? "destructive" : borrow.status === "completed" ? "secondary" : "default"
                }
              >
                {borrow.status === "overdue" && (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Overdue
                  </>
                )}
                {borrow.status === "active" && (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Active
                  </>
                )}
                {borrow.status === "returning" && (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Returning
                  </>
                )}
                {borrow.status === "completed" && (
                  <>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </>
                )}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Borrowed</p>
                <p className="font-medium">{borrow.borrowDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Due</p>
                <p className={`font-medium ${borrow.status === "overdue" ? "text-destructive" : ""}`}>
                  {borrow.dueDate}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Time Remaining</p>
                <p className={`font-medium ${borrow.status === "overdue" ? "text-destructive" : "text-accent"}`}>
                  {borrow.status === "overdue"
                    ? `${Math.abs(borrow.daysRemaining)} days overdue`
                    : `${borrow.daysRemaining} days`}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress
                value={Math.min(borrow.progress, 100)}
                className={`h-2 ${borrow.status === "overdue" ? "bg-red-200" : ""}`}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {borrow.progress.toFixed(0)}% of borrow period completed
              </p>
            </div>

            {/* Actions */}
            {borrow.status === "active" && (
              <div className="flex gap-2 pt-4 border-t flex-wrap">
                <Button size="sm" className="flex-1 min-w-max" onClick={() => handleReturnBook(borrow.id)}>
                  I've Returned It
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-max bg-transparent"
                  onClick={() => handleRequestExtension(borrow.id)}
                >
                  Request Extension
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-max bg-transparent"
                  onClick={() => handleContactOwner(borrow.owner)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Owner
                </Button>
              </div>
            )}

            {borrow.status === "overdue" && (
              <div className="flex gap-2 pt-4 border-t bg-red-50 -m-6 p-6 rounded-b-lg flex-wrap">
                <Button size="sm" className="flex-1 min-w-max" onClick={() => handleReturnImmediate(borrow.id)}>
                  Return Book Immediately
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-w-max bg-transparent"
                  onClick={() => handleContactOwner(borrow.owner)}
                >
                  Contact Owner
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}

      <Dialog open={extensionDialogOpen} onOpenChange={setExtensionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Extension</DialogTitle>
            <DialogDescription>
              Request additional time to keep the book. The owner will review your request.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Days to Extend</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={extensionDays}
                onChange={(e) => setExtensionDays(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Reason (optional)</label>
              <Textarea placeholder="Let the owner know why you need more time..." />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSubmitExtension}>
                Send Request
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setExtensionDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
