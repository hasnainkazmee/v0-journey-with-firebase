import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { UserDataProvider } from "@/context/UserDataContext"
import { NotificationProvider } from "@/context/NotificationContext"
import { ToastProvider } from "@/components/ui/Toast"
import "@/styles/globals.css"

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "CSS Prep - Study Dashboard",
  description: "A comprehensive study dashboard for CSS exam preparation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans min-h-screen bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <UserDataProvider>
              <NotificationProvider>
                <ToastProvider>{children}</ToastProvider>
              </NotificationProvider>
            </UserDataProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
