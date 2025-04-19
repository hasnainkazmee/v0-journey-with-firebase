"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { useUserData } from "@/context/UserDataContext"
import { CheckCircle, Circle, ChevronDown, ChevronUp, Search } from "lucide-react"

export default function SyllabusPage() {
  const { userData, loading, toggleTopicCompletion } = useUserData()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleToggleTopic = async (topicId: string, completed: boolean) => {
    await toggleTopicCompletion(topicId, !completed)
  }

  const filteredSyllabus = userData.syllabus
    .map((section) => ({
      ...section,
      topics: section.topics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((section) => section.topics.length > 0)

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-foreground">Loading syllabus...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Syllabus</h1>
          <p className="text-secondary-foreground">Track your study progress through the syllabus</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-foreground" />
          <input
            type="text"
            placeholder="Search topics..."
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-6">
        {filteredSyllabus.map((section) => (
          <GlassCard key={section.id}>
            <button className="w-full flex justify-between items-center" onClick={() => toggleSection(section.id)}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              {expandedSections[section.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {(expandedSections[section.id] || searchQuery) && (
              <div className="mt-4 space-y-2">
                {section.topics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                    <button onClick={() => handleToggleTopic(topic.id, topic.completed)} className="flex-shrink-0">
                      {topic.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-secondary-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{topic.title}</p>
                      <p className="text-xs text-secondary-foreground">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </MainLayout>
  )
}
