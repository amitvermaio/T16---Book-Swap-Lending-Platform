"use client"

import Navigation from "@/components/navigation"
import BorrowingHistory from "@/components/analytics/borrowing-history"
import Footer from "@/components/footer"

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BorrowingHistory />
      <Footer />
    </main>
  )
}
