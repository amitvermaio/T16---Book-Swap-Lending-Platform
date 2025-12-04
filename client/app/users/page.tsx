"use client"

import Navigation from "@/components/navigation"
import UserProfiles from "@/components/users/user-profiles"
import Footer from "@/components/footer"

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <UserProfiles />
      <Footer />
    </main>
  )
}
