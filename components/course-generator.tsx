"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateCourse, type GeneratedCourse } from "@/services/courseGeneratorService"
import { useToast } from "@/components/ui/use-toast"
import { Course } from "@/entities/Course"
import useAppLevelAuth from "@/hooks/useAppLevelAuth" // Updated hook
import CourseDisplay from "@/components/CourseDisplay"
import { Loader2, Wand2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const CourseGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    difficulty: "",
    duration: "",
  })
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const { isLoggedIn, userId, isLoaded } = useAppLevelAuth() // Get userId and isLoaded
  const router = useRouter()

  const handleGenerateCourse = async () => {
    if (!formData.topic.trim()) {
      toast({
        title: "Topic is required",
        description: "Please enter a topic to generate a course.",
        variant: "destructive",
      })
      return
    }
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate and save a course.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setGeneratedCourse(null)
    try {
      const courseData = await generateCourse(formData)
      setGeneratedCourse(courseData)
      // Automatically save the course to localStorage with userId
      await handleSaveCourse(courseData)
      toast({
        title: "Course Generated!",
        description: "Your new course is ready and saved to your dashboard.",
      })
      router.push("/dashboard") // Redirect to dashboard after successful generation and save
    } catch (error) {
      toast({
        title: "Error Generating Course",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCourse = async (courseToSave: GeneratedCourse) => {
    if (!courseToSave || !userId) return // Ensure userId is available
    setIsSaving(true)
    try {
      await Course.create({
        topic: formData.topic,
        difficulty: formData.difficulty,
        duration: formData.duration,
        ...courseToSave,
        userId: userId, // Pass the actual userId
      })
      toast({
        title: "Course Saved!",
        description: 'You can find your saved courses in "My Courses".',
      })
    } catch (error) {
      toast({
        title: "Error Saving Course",
        description: "There was a problem saving your course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Disable generation if Clerk is still loading or user is not logged in
  const isGenerateDisabled = isLoading || !formData.topic || !isLoaded || !isLoggedIn

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Wand2 className="mr-2 text-primary" />
            Generate New Course
          </CardTitle>
          <CardDescription>Fill in the details below to create a new AI-powered course.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Course Topic</Label>
              <Input
                type="text"
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="e.g., 'Machine Learning Fundamentals'"
                className="flex-grow text-base"
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateCourse()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide additional context or specific areas you'd like to focus on..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Course Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">1-2 hours</SelectItem>
                    <SelectItem value="medium">3-5 hours</SelectItem>
                    <SelectItem value="long">6+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerateCourse} disabled={isGenerateDisabled} size="lg" className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Course...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Course
                </>
              )}
            </Button>
            {!isLoaded ? (
              <p className="text-sm text-muted-foreground text-center">Loading authentication...</p>
            ) : (
              !isLoggedIn && (
                <p className="text-sm text-muted-foreground text-center">
                  Please sign in to generate and save courses.
                </p>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">Generating your course...</p>
          <p className="text-muted-foreground">This may take a moment. The AI is crafting your learning path!</p>
        </div>
      )}

      {/* CourseDisplay is now only shown if generatedCourse is not null,
          but the primary flow is to redirect to dashboard after saving */}
      {generatedCourse && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Preview Generated Course</h2>
          <CourseDisplay
            course={generatedCourse}
            onSave={() => handleSaveCourse(generatedCourse)}
            isSaving={isSaving}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  )
}

export default CourseGenerator
export { CourseGenerator }
