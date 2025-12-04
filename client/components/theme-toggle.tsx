"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 transition-transform" />
      )}
    </Button>
  )
}
