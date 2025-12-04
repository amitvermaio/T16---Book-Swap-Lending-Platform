"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Users, Clock, Star, Bell, Zap } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description: "Search by title, author, genre, or location. Find the perfect book instantly.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Connect with fellow readers, rate experiences, and build lasting relationships.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Track all requests, due dates, and borrowing history at a glance.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get instant notifications for requests, approvals, and important updates.",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Read honest reviews and ratings from the community to make informed decisions.",
  },
  {
    icon: Zap,
    title: "Quick Sharing",
    description: "Add books, manage requests, and complete swaps in just a few clicks.",
  },
]

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
              Why Choose BookSwap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Everything You Need for Book Sharing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make book sharing seamless, safe, and fun for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg w-fit mb-3 border border-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
