"use client"

import { CourseViewer } from "@/components/course-viewer"
import { Course } from "@/entities/Course" // Import Course entity
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import useAppLevelAuth from "@/hooks/useAppLevelAuth" // Import auth hook

// Define the Course interface as expected by CourseViewer
interface CourseForViewer {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  chapters: Array<{
    id: string
    title: string
    description: string
    lessons: Array<{
      id: string
      title: string
      content: string
      videoUrl?: string
      videoTitle?: string
      duration: string
      completed: boolean
      youtubeSearchTerm?: string // Ensure this is present for the viewer
    }>
  }>
  createdAt: string
}

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [course, setCourse] = useState<CourseForViewer | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { userId, isLoaded, isLoggedIn } = useAppLevelAuth()

  // 👉  synchronous extraction; no Promise, no suspension
  const courseId = params.id

  useEffect(() => {
    async function fetchCourse() {
      if (!isLoaded) return // Wait for auth state to be loaded

      // If not logged in, or userId is null, redirect to signin
      if (!isLoggedIn || !userId) {
        router.push("/signin")
        return
      }

      setLoading(true)
      try {
        // Fetch course, ensuring it belongs to the current user
        const fetchedCourse = await Course.get(courseId, userId) // Pass userId to get
        if (fetchedCourse) {
          // Transform fetchedCourse (CourseEntityData) to the CourseForViewer format
          const transformedCourse: CourseForViewer = {
            id: fetchedCourse.id,
            title: fetchedCourse.title,
            description: fetchedCourse.description,
            difficulty: fetchedCourse.difficulty,
            duration: fetchedCourse.duration,
            createdAt: fetchedCourse.created_at,
            chapters: fetchedCourse.chapters.map((chapter) => ({
              id: chapter.id,
              title: chapter.title,
              description: chapter.description,
              lessons: chapter.lessons.map((lesson) => ({
                id: lesson.id,
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.video_url || undefined, // Convert snake_case to camelCase
                videoTitle: lesson.video_title || undefined, // Convert snake_case to camelCase
                duration: lesson.duration,
                completed: false, // Assuming lessons are not marked complete on load
                youtubeSearchTerm: lesson.youtube_search_term || undefined, // Convert snake_case to camelCase
              })),
            })),
          }
          setCourse(transformedCourse)
        } else {
          // If course not found or doesn't belong to user, redirect
          router.push("/my-courses")
        }
      } catch (error) {
        console.error("Error fetching course from localStorage:", error)
        router.push("/my-courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId, router, userId, isLoaded, isLoggedIn]) // Use courseId in dependencies

  if (loading || !isLoaded) {
    // Show loading state while auth loads
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="p-8 text-center">
            <CardContent className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg font-semibold">Loading Course...</p>
            </CardContent>
          </Card>
        </div>
    )
  }

  if (!course) {
    return null // Should redirect via router.push if not found
  }

  return <CourseViewer course={course} />
}


