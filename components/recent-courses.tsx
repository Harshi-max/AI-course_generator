"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Play, Trash2 } from "lucide-react"
import Link from "next/link"
import { Course, type CourseEntityData } from "@/entities/Course"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import useAppLevelAuth from "@/hooks/useAppLevelAuth" // Import auth hook

interface CourseDisplayData {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  chapters: number // Number of chapters
  createdAt: string
}

export function RecentCourses() {
  const [courses, setCourses] = useState<CourseDisplayData[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { userId, isLoaded, isLoggedIn } = useAppLevelAuth() // Get userId and isLoaded

  useEffect(() => {
    if (isLoaded) {
      // Only fetch if Clerk has loaded
      fetchRecentCourses()
    }
  }, [isLoaded, userId]) // Re-fetch when auth state changes

  const fetchRecentCourses = async () => {
    setLoading(true)
    try {
      // Fetch courses for the current user, or empty array if not logged in
      const fetchedCourses: CourseEntityData[] = isLoggedIn && userId ? await Course.getRecent(12, userId) : []
      const coursesForDisplay: CourseDisplayData[] = fetchedCourses.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        difficulty: c.difficulty,
        duration: c.duration,
        chapters: c.chapters.length,
        createdAt: c.created_at,
      }))
      setCourses(coursesForDisplay)
    } catch (error) {
      console.error("Error fetching courses from localStorage:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to delete courses.",
        variant: "destructive",
      })
      return
    }
    try {
      const success = await Course.delete(courseId, userId) // Pass userId to delete
      if (success) {
        toast({
          title: "Course Deleted!",
          description: "The course has been successfully removed.",
        })
        fetchRecentCourses() // Re-fetch courses to update the list
      } else {
        toast({
          title: "Deletion Failed",
          description: "Could not delete the course. It might not exist or you don't have permission.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting course:", error)
      toast({
        title: "Error Deleting Course",
        description: "An unexpected error occurred while deleting the course.",
        variant: "destructive",
      })
    }
  }

  if (loading || !isLoaded) {
    // Show loading state while Clerk loads
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">Loading Courses...</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {courses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">No courses yet</h4>
            <p className="text-gray-500">
              {isLoggedIn
                ? "Generate your first AI-powered course to get started!"
                : "Sign in to generate and view your courses."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{course.chapters} chapters</span>
                  <div className="flex gap-2">
                    <Link href={`/course/${course.id}`}>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Start Learning
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="px-2">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete course</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your course from your local
                            storage.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteCourse(course.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
