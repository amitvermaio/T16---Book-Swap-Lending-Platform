"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X, Bell } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount] = useState(3)

  const navLinks = [
    { href: "/books", label: "Browse Books" },
    { href: "/requests", label: "Requests" },
    { href: "/tracking", label: "Tracking" },
    { href: "/users", label: "Community" },
    { href: "/analytics", label: "Analytics" },
    { href: "/notifications", label: "Notifications" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="p-2 bg-primary rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">BookSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/notifications" title="Notifications">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-bold">
                    SM
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/books">Browse Books</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/requests">My Requests</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border pb-4">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

