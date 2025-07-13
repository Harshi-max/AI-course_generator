"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ArrowLeft, ChevronRight, ChevronLeft, Youtube } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  videoTitle?: string
  duration: string
  completed: boolean
  youtubeSearchTerm?: string // Add youtubeSearchTerm for fallback message
}

interface Chapter {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Course {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  chapters: Chapter[]
  createdAt: string
}

interface CourseViewerProps {
  course: Course
}

export function CourseViewer({ course }: CourseViewerProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
  const progress = (completedLessons.size / totalLessons) * 100

  const currentLessonData = course.chapters[currentChapter]?.lessons[currentLesson]

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]))
  }

  const goToNextLesson = () => {
    const currentChapterLessons = course.chapters[currentChapter].lessons.length

    if (currentLesson < currentChapterLessons - 1) {
      setCurrentLesson(currentLesson + 1)
    } else if (currentChapter < course.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentLesson(0)
    }
  }

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
      setCurrentLesson(course.chapters[currentChapter - 1].lessons.length - 1)
    }
  }

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{course.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">
                Progress: {completedLessons.size}/{totalLessons} lessons
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Chapter {chapterIndex + 1}: {chapter.title}
                    </h4>
                    <div className="space-y-1">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setCurrentChapter(chapterIndex)
                            setCurrentLesson(lessonIndex)
                          }}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            currentChapter === chapterIndex && currentLesson === lessonIndex
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {completedLessons.has(lesson.id) ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="flex-1">{lesson.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {currentLessonData && (
              <>
                {/* Video Section */}
                {currentLessonData.videoUrl ? (
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${extractVideoId(currentLessonData.videoUrl)}`}
                          title={currentLessonData.videoTitle}
                          className="w-full h-full rounded-t-lg"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Youtube className="h-4 w-4 text-red-600" />
                          <span>{currentLessonData.videoTitle}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  currentLessonData.youtubeSearchTerm && (
                    <Card>
                      <CardContent className="p-4 text-center text-gray-500">
                        <Youtube className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>No video available for this lesson.</p>
                        <p className="text-sm">(Searched for: "{currentLessonData.youtubeSearchTerm}")</p>
                        <p className="text-xs mt-1">
                          This might be due to an invalid YouTube API key, quota limits, or no relevant video found.
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}

                {/* Lesson Content */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{currentLessonData.title}</CardTitle>
                        <p className="text-gray-600 mt-1">
                          Chapter {currentChapter + 1}, Lesson {currentLesson + 1}
                        </p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {currentLessonData.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: currentLessonData.content }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={goToPreviousLesson}
                        disabled={currentChapter === 0 && currentLesson === 0}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous Lesson
                      </Button>

                      <div className="flex items-center gap-2">
                        {!completedLessons.has(currentLessonData.id) && (
                          <Button variant="outline" onClick={() => markLessonComplete(currentLessonData.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </Button>
                        )}

                        <Button
                          onClick={goToNextLesson}
                          disabled={
                            currentChapter === course.chapters.length - 1 &&
                            currentLesson === course.chapters[currentChapter].lessons.length - 1
                          }
                        >
                          Next Lesson
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
