"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle, Bell, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "request" | "approval" | "return" | "due_soon" | "overdue"
  title: string
  message: string
  userName?: string
  userAvatar?: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "request",
    title: "New Borrow Request",
    message: 'John Smith requested to borrow "The Great Gatsby"',
    userName: "John Smith",
    userAvatar: "/diverse-group-avatars.png",
    timestamp: "2 minutes ago",
    read: false,
    actionUrl: "/requests?id=1",
  },
  {
    id: "2",
    type: "approval",
    title: "Request Approved",
    message: 'Emma Wilson approved your borrow request for "To Kill a Mockingbird"',
    userName: "Emma Wilson",
    userAvatar: "/pandoran-bioluminescent-forest.png",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/tracking",
  },
  {
    id: "3",
    type: "due_soon",
    title: "Book Due Soon",
    message: '"Project Hail Mary" is due in 3 days',
    timestamp: "5 hours ago",
    read: true,
    actionUrl: "/tracking",
  },
  {
    id: "4",
    type: "return",
    title: "Book Returned",
    message: 'Mike Chen returned "Atomic Habits" to your collection',
    userName: "Mike Chen",
    userAvatar: "/diverse-group-avatars.png",
    timestamp: "1 day ago",
    read: true,
    actionUrl: "/books",
  },
  {
    id: "5",
    type: "overdue",
    title: "Book Overdue",
    message: '"Dune" is now 2 days overdue. Please return it soon.',
    timestamp: "2 days ago",
    read: true,
    actionUrl: "/tracking",
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "request":
      return <Bell className="h-5 w-5 text-blue-500" />
    case "approval":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "return":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "due_soon":
      return <Clock className="h-5 w-5 text-yellow-500" />
    case "overdue":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

interface NotificationsListProps {
  type: "all" | "requests" | "approvals" | "returns"
}

export default function NotificationsList({ type }: NotificationsListProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const { toast } = useToast()

  const filtered = notifications.filter((notif) => {
    if (type === "all") return true
    if (type === "requests") return notif.type === "request"
    if (type === "approvals") return notif.type === "approval"
    if (type === "returns") return ["return", "due_soon", "overdue"].includes(notif.type)
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    toast({
      title: "Marked as read",
    })
  }

  const handleArchive = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    toast({
      title: "Notification archived",
    })
  }

  const handleNavigate = (actionUrl: string | undefined) => {
    if (actionUrl) {
      window.location.href = actionUrl
    }
  }

  return (
    <div className="space-y-3">
      {filtered.map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 transition-colors cursor-pointer hover:bg-accent/10 ${
            !notification.read ? "bg-accent/5 border-accent/20" : ""
          }`}
          onClick={() => handleNavigate(notification.actionUrl)}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">{getNotificationIcon(notification.type)}</div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-accent"></div>}
              </div>

              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

              {notification.userName && (
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={notification.userAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{notification.userName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{notification.userName}</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
            </div>

            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {!notification.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="h-8 w-8 p-0"
                  title="Mark as read"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleArchive(notification.id)}
                className="h-8 w-8 p-0"
                title="Archive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {type === "all" ? "No notifications" : "No notifications in this category"}
          </p>
        </Card>
      )}
    </div>
  )
}
