"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useAuth } from "@/context/AuthContext"

export default function SettingsPage() {
  const { user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  const handleDeleteAccount = () => {
    if (deleteConfirm !== "DELETE") {
      alert("Please type DELETE to confirm account deletion")
      return
    }

    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      alert("Account deleted successfully")
      setIsDeleting(false)
      window.location.href = "/login"
    }, 2000)
  }

  return (
    <MainLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-secondary-foreground">Manage your account settings</p>
      </header>

      <div className="space-y-6">
        <GlassCard>
          <h2 className="text-xl font-bold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-secondary-foreground">Toggle between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-secondary-foreground">{user?.email || "Not logged in"}</p>
            </div>

            <div>
              <p className="font-medium">Password</p>
              <Button variant="outline" size="sm" className="mt-1">
                Change Password
              </Button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-red-500/20">
          <h2 className="text-xl font-bold mb-4 text-red-500">Danger Zone</h2>
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-secondary-foreground mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                className="px-3 py-2 border border-border rounded-md bg-background"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirm !== "DELETE"}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  )
}
