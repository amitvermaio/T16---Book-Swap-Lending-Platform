"use client"
import Navigation from "@/components/navigation"
import NotificationsList from "@/components/notifications/notifications-list"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with requests, approvals, and book returns</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <NotificationsList type="all" />
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <NotificationsList type="requests" />
          </TabsContent>

          <TabsContent value="approvals" className="mt-6">
            <NotificationsList type="approvals" />
          </TabsContent>

          <TabsContent value="returns" className="mt-6">
            <NotificationsList type="returns" />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  )
}
