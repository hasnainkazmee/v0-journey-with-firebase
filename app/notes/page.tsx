"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { useUserData } from "@/context/UserDataContext"
import { FileText, Plus, Search } from "lucide-react"

export default function NotesPage() {
  const { userData, loading } = useUserData()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = userData.notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-foreground">Loading notes...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-secondary-foreground">Manage your study notes</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-9 pr-4 py-2 rounded-md border border-border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/notes/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </Link>
        </div>
      </header>

      {filteredNotes.length === 0 ? (
        <GlassCard className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-secondary-foreground opacity-50 mb-4" />
          <h2 className="text-xl font-bold mb-2">No notes found</h2>
          <p className="text-secondary-foreground mb-6">
            {searchQuery ? "Try a different search term" : "Create your first note to get started"}
          </p>
          <Link href="/notes/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <GlassCard className="h-full hover:border-primary transition-colors">
                <h2 className="text-lg font-bold mb-2 line-clamp-1">{note.title}</h2>
                <p className="text-sm text-secondary-foreground mb-4">
                  Updated: {new Date(note.updatedAt).toLocaleDateString()}
                </p>
                <p className="text-secondary-foreground line-clamp-3">{note.content.substring(0, 150)}...</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  )
}
