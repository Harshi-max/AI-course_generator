"use client" // Keep this directive

import { CourseGenerator } from "@/components/course-generator"
import { RecentCourses } from "@/components/recent-courses"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import useAppLevelAuth from "@/hooks/useAppLevelAuth" // Import the custom auth hook

export default function DashboardPage() {
  const { isLoggedIn, isLoaded } = useAppLevelAuth() // Get the loading state and login status

  const handleSignOut = () => {
    localStorage.removeItem("user") // Clear user session from localStorage
    // Optionally, force a reload or redirect to update UI
    window.location.href = "/" // Simple redirect to home
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-bold">Your Dashboard</h1>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/my-courses">
                <Button variant="ghost">My Courses</Button>
              </Link>
              {isLoaded ? (
                isLoggedIn ? (
                  <Button onClick={handleSignOut} variant="outline">
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/signin">
                    <Button>Sign In</Button>
                  </Link>
                )
              ) : (
                <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse" />
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Generate a New Course</h2>
          <CourseGenerator />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Your Recent Courses</h2>
          <RecentCourses />
        </section>
      </main>
    </div>
  )
}
