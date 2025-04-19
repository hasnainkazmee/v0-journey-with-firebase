"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { useUserData } from "@/context/UserDataContext"
import { useNotifications } from "@/context/NotificationContext"
import { Heart, MessageCircle, Share, Plus, Search, User } from "lucide-react"

export default function CommunityPage() {
  const { userData, loading } = useUserData()
  const { addNotification } = useNotifications()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock community posts
  const communityPosts = [
    {
      id: "post1",
      userId: "user1",
      userName: "Fatima Ali",
      title: "CSS Flexbox Notes",
      excerpt: "Comprehensive notes on CSS Flexbox layout with examples and common use cases.",
      likes: 24,
      comments: 5,
      shares: 3,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
      id: "post2",
      userId: "user2",
      userName: "Ahmed Khan",
      title: "Pakistan Affairs Subject Notes",
      excerpt: "Complete notes covering all major topics for Pakistan Affairs CSS subject.",
      likes: 42,
      comments: 12,
      shares: 8,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
      id: "post3",
      userId: "user3",
      userName: "Zainab Malik",
      title: "Current Affairs - May 2023",
      excerpt: "Monthly compilation of important current affairs for CSS preparation.",
      likes: 18,
      comments: 3,
      shares: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    },
  ]

  const filteredPosts = communityPosts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLike = (postId: string, userName: string) => {
    addNotification({
      type: "like",
      message: `You liked ${userName}'s post`,
      postId,
      userId: "user1",
      userName,
    })
  }

  const handleComment = (postId: string, userName: string) => {
    addNotification({
      type: "comment",
      message: `You commented on ${userName}'s post`,
      postId,
      userId: "user1",
      userName,
    })
  }

  const handleShare = (postId: string, userName: string) => {
    addNotification({
      type: "share",
      message: `You shared ${userName}'s post`,
      postId,
      userId: "user1",
      userName,
    })
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-foreground">Loading community posts...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-secondary-foreground">Share and discover study resources</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-9 pr-4 py-2 rounded-md border border-border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <GlassCard key={post.id}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{post.userName}</p>
                <p className="text-xs text-secondary-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-secondary-foreground mb-4">{post.excerpt}</p>

            <div className="flex justify-between border-t border-white/10 pt-4">
              <button
                className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors"
                onClick={() => handleLike(post.id, post.userName)}
              >
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </button>
              <button
                className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors"
                onClick={() => handleComment(post.id, post.userName)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </button>
              <button
                className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors"
                onClick={() => handleShare(post.id, post.userName)}
              >
                <Share className="h-4 w-4" />
                <span>{post.shares}</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </MainLayout>
  )
}
