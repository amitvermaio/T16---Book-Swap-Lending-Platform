"use client"

import Link from "next/link"
import { BookOpen, Twitter, Instagram, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">BookSwap</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making reading more accessible, sustainable, and community-driven.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-primary transition">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground space-y-4 md:space-y-0">
          <p>&copy; 2025 BookSwap. All rights reserved. Connecting readers worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
