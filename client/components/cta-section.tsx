"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

export default function CTASection() {
  return (
    <section id="cta" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                Join the Community
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Start Your Book Swap <span className="text-primary">Today</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with thousands of book lovers. Share your collection, discover new reads, and help make reading
              accessible to everyone.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="text-base font-semibold">
              <Link href="/books" className="flex items-center gap-2">
                Start Browsing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="pt-12 border-t border-border/50 mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="inline-block p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">250K+</p>
                <p className="text-muted-foreground">Books Available</p>
              </div>
              <div className="space-y-3">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground">Cities Active</p>
              </div>
              <div className="space-y-3">
                <p className="text-4xl font-bold text-secondary">Forever Free</p>
                <p className="text-muted-foreground">No hidden fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
