"use client"
import Navigation from "@/components/navigation"
import BorrowSwapRequests from "@/components/requests/borrow-swap-requests"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RequestsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground mb-2">Book Requests</h1>
          <p className="text-muted-foreground">Manage your borrow and swap requests</p>
        </div>

        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
            <TabsTrigger value="outgoing">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="mt-6">
            <BorrowSwapRequests type="incoming" />
          </TabsContent>

          <TabsContent value="outgoing" className="mt-6">
            <BorrowSwapRequests type="outgoing" />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  )
}
