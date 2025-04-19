"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Create context with default values to avoid the "must be used within a provider" error
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Get initial theme from localStorage or prefer-color-scheme
  useEffect(() => {
    setMounted(true)

    // Check for saved theme in localStorage
    const savedTheme = typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme | null) : null

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  // Update document when theme changes
  useEffect(() => {
    if (!mounted) return

    document.documentElement.classList.toggle("dark", theme === "dark")

    // Save theme to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  // Provide the actual context value only after mounting to avoid hydration mismatch
  const contextValue = {
    theme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
