"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { ProgressCircle } from "@/components/ui/ProgressCircle"
import { useUserData } from "@/context/UserDataContext"

export default function ProgressPage() {
  const { userData, loading } = useUserData()

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-foreground">Loading progress data...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-secondary-foreground">Track your study progress</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h2 className="text-xl font-bold mb-6">Overall Progress</h2>
          <div className="flex flex-col items-center justify-center py-4">
            <ProgressCircle value={userData.progress.overall} size="xl" />
            <p className="mt-4 text-center text-secondary-foreground">
              You've completed {userData.progress.overall}% of the syllabus
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-bold mb-6">Topic Progress</h2>
          <div className="space-y-4">
            {userData.progress.topics.map((topic: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{topic.name}</p>
                  <p className="text-sm text-secondary-foreground">{topic.progress}%</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${topic.progress}%` }}
                    role="progressbar"
                    aria-valuenow={topic.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  )
}
