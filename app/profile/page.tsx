"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    examDate: user?.examDate || "",
    goals: user?.goals || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false)
      // In a real app, you would update the user data in the context/backend
    }, 1000)
  }

  return (
    <MainLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-secondary-foreground">Manage your personal information</p>
      </header>

      <GlassCard>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold">Personal Information</h2>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              />
            </div>

            <div>
              <label htmlFor="examDate" className="block text-sm font-medium mb-1">
                Exam Date
              </label>
              <input
                id="examDate"
                name="examDate"
                type="date"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium mb-1">
                Study Goals
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-foreground">Name</p>
              <p className="font-medium">{user?.name || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-secondary-foreground">Email</p>
              <p className="font-medium">{user?.email || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-secondary-foreground">Exam Date</p>
              <p className="font-medium">{user?.examDate || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-secondary-foreground">Study Goals</p>
              <p className="font-medium whitespace-pre-line">{user?.goals || "Not set"}</p>
            </div>
          </div>
        )}
      </GlassCard>
    </MainLayout>
  )
}
