"use client"

import Navigation from "@/components/navigation"
import UserProfile from "@/components/profile/user-profile"
import Footer from "@/components/footer"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <UserProfile />
      <Footer />
    </main>
  )
}
