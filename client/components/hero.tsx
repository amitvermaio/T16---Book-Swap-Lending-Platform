"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Users, TrendingUp } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-32 pb-20 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  Welcome to BookSwap
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground text-balance">
                <span className="text-primary">Share</span> Books, Build{" "}
                <span className="text-secondary">Community</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Connect with thousands of readers. Swap, borrow, and share books. Make reading more accessible,
                sustainable, and fun.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="text-base font-semibold">
                <Link href="/books">Explore Books</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <p className="text-3xl font-bold text-foreground">50K+</p>
                </div>
                <p className="text-sm text-muted-foreground">Books Available</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <p className="text-3xl font-bold text-foreground">10K+</p>
                </div>
                <p className="text-sm text-muted-foreground">Active Readers</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <p className="text-3xl font-bold text-foreground">98%</p>
                </div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <BookCard
                  title="Fantasy"
                  icon="✨"
                  color="from-blue-500/20 to-blue-600/20"
                  border="border-blue-200/30"
                />
                <BookCard
                  title="Mystery"
                  icon="🔍"
                  color="from-purple-500/20 to-purple-600/20"
                  border="border-purple-200/30"
                />
              </div>
              <div className="space-y-4 pt-8">
                <BookCard
                  title="Science"
                  icon="🚀"
                  color="from-orange-500/20 to-orange-600/20"
                  border="border-orange-200/30"
                />
                <BookCard
                  title="History"
                  icon="📚"
                  color="from-green-500/20 to-green-600/20"
                  border="border-green-200/30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BookCard({
  title,
  icon,
  color,
  border,
}: {
  title: string
  icon: string
  color: string
  border: string
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} p-6 rounded-2xl border ${border} hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
    >
      <p className="text-4xl mb-3">{icon}</p>
      <p className="font-semibold text-foreground text-lg">{title}</p>
      <p className="text-xs text-muted-foreground mt-2">Browse collection</p>
    </div>
  )
}
