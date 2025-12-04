"use client"

import Navigation from "@/components/navigation"
import RequestStatusTracking from "@/components/tracking/request-status-tracking"
import Footer from "@/components/footer"

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-bold text-foreground mb-2">Borrow Status Tracker</h1>
          <p className="text-muted-foreground">Track the status of your active borrows and swaps</p>
        </div>

        <RequestStatusTracking />
      </div>
      <Footer />
    </main>
  )
}
