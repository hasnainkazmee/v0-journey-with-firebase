"use client"

import { useTheme } from "@/context/ThemeContext"
import { Button } from "./Button"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return <div className="w-9 h-9"></div> // Placeholder with same dimensions
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
        animate={{
          scale: theme === "dark" ? 1 : 0.5,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: 180 }}
        animate={{
          scale: theme === "light" ? 1 : 0.5,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>

      {/* Invisible element to maintain button size */}
      <span className="invisible">
        <Sun className="h-5 w-5" />
      </span>
    </Button>
  )
}
