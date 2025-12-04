"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Clock, AlertCircle, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RequestItem {
  id: string
  bookTitle: string
  requesterName: string
  requesterAvatar: string
  requestType: "borrow" | "swap"
  requestDate: string
  status: "pending" | "approved" | "rejected" | "active" | "completed"
  dueDate?: string
  swapBook?: string
}

const mockIncomingRequests: RequestItem[] = [
  {
    id: "1",
    bookTitle: "The Great Gatsby",
    requesterName: "John Smith",
    requesterAvatar: "/diverse-group-avatars.png",
    requestType: "borrow",
    requestDate: "2 hours ago",
    status: "pending",
    dueDate: "2 weeks",
  },
  {
    id: "2",
    bookTitle: "Atomic Habits",
    requesterName: "Lisa Johnson",
    requesterAvatar: "/pandoran-bioluminescent-forest.png",
    requestType: "swap",
    requestDate: "1 day ago",
    status: "approved",
    swapBook: "Project Hail Mary",
  },
  {
    id: "3",
    bookTitle: "Dune",
    requesterName: "Mike Chen",
    requesterAvatar: "/diverse-group-avatars.png",
    requestType: "borrow",
    requestDate: "3 days ago",
    status: "rejected",
  },
]

const mockOutgoingRequests: RequestItem[] = [
  {
    id: "4",
    bookTitle: "To Kill a Mockingbird",
    requesterName: "Emma Wilson",
    requesterAvatar: "/diverse-group-avatars.png",
    requestType: "borrow",
    requestDate: "5 hours ago",
    status: "pending",
  },
  {
    id: "5",
    bookTitle: "The Midnight Library",
    requesterName: "Alex King",
    requesterAvatar: "/diverse-group-avatars.png",
    requestType: "borrow",
    requestDate: "1 week ago",
    status: "active",
    dueDate: "5 days",
  },
  {
    id: "6",
    bookTitle: "Project Hail Mary",
    requesterName: "Sarah Davis",
    requesterAvatar: "/stylized-figure-6.png",
    requestType: "borrow",
    requestDate: "2 weeks ago",
    status: "completed",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "active":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-gray-100 text-gray-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "approved":
      return <Check className="h-4 w-4" />
    case "rejected":
      return <X className="h-4 w-4" />
    case "active":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

interface BorrowSwapRequestsProps {
  type: "incoming" | "outgoing"
}

export default function BorrowSwapRequests({ type }: BorrowSwapRequestsProps) {
  const [requests, setRequests] = useState(type === "incoming" ? mockIncomingRequests : mockOutgoingRequests)
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null)
  const [alertDialog, setAlertDialog] = useState<{ open: boolean; action: string; requestId: string }>({
    open: false,
    action: "",
    requestId: "",
  })
  const { toast } = useToast()

  const handleApprove = (requestId: string) => {
    const updated = requests.map((r) => (r.id === requestId ? { ...r, status: "approved" as const } : r))
    setRequests(updated)
    toast({
      title: "Request approved!",
      description: "The requester has been notified",
    })
  }

  const handleReject = (requestId: string) => {
    const updated = requests.map((r) => (r.id === requestId ? { ...r, status: "rejected" as const } : r))
    setRequests(updated)
    toast({
      title: "Request rejected",
      description: "The requester has been notified",
    })
  }

  const handleMarkReturned = (requestId: string) => {
    const updated = requests.map((r) => (r.id === requestId ? { ...r, status: "completed" as const } : r))
    setRequests(updated)
    toast({
      title: "Book marked as returned",
      description: "Thank you for returning the book!",
    })
  }

  const handleMessage = (requesterName: string) => {
    toast({
      title: "Message feature",
      description: `Opening chat with ${requesterName}...`,
    })
  }

  return (
    <>
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <Avatar>
                  <AvatarImage src={request.requesterAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{request.requesterName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {type === "incoming" ? request.requesterName : "To: " + request.requesterName}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {request.requestType === "borrow" ? "Borrow Request" : "Swap Request"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    Wants to {request.requestType} <span className="font-medium">{request.bookTitle}</span>
                  </p>

                  {request.swapBook && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Offers to swap with: <span className="font-medium">{request.swapBook}</span>
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">Requested {request.requestDate}</p>

                  {request.dueDate && request.status === "active" && (
                    <p className="text-xs text-accent font-medium mt-1">Due in: {request.dueDate}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="ml-1 capitalize">{request.status}</span>
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            {type === "incoming" && request.status === "pending" && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" className="flex-1" onClick={() => handleApprove(request.id)}>
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
              </div>
            )}

            {type === "outgoing" && request.status === "active" && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" className="flex-1" onClick={() => handleMarkReturned(request.id)}>
                  Mark as Returned
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleMessage(request.requesterName)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            )}

            {type === "incoming" && request.status === "active" && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" className="flex-1" onClick={() => handleMarkReturned(request.id)}>
                  Mark as Returned
                </Button>
              </div>
            )}
          </Card>
        ))}

        {requests.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No requests yet</p>
          </Card>
        )}
      </div>

      <AlertDialog open={alertDialog.open} onOpenChange={(open) => setAlertDialog({ ...alertDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {alertDialog.action}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
