// This file now handles course persistence using localStorage.
// It simulates a database by storing and retrieving course data from the browser's local storage.

interface LessonData {
  title: string
  content: string
  youtubeSearchTerm: string // This is the input format
  duration: string
  videoUrl?: string
  videoTitle?: string
}

interface ChapterData {
  title: string
  description: string
  lessons: LessonData[]
}

export interface CourseDataForCreate {
  topic: string
  title: string
  description: string
  difficulty: string
  duration: string
  chapters: ChapterData[]
  userId: string // Add userId to the creation data
}

export interface CourseEntityData {
  id: string
  title: string
  description: string
  topic: string
  difficulty: string
  duration: string
  chapters: Array<{
    id: string
    course_id: string
    title: string
    description: string
    order_index: number
    lessons: Array<{
      id: string
      chapter_id: string
      title: string
      content: string
      video_url?: string // Stored as snake_case
      video_title?: string // Stored as snake_case
      duration: string
      order_index: number
      youtube_search_term?: string // Stored as snake_case
    }>
  }>
  created_at: string
  updated_at: string
  userId: string // Add userId to the entity data
}

const LOCAL_STORAGE_KEY = "ai_courses"

// Helper to load all courses from localStorage
function loadCoursesFromLocalStorage(): CourseEntityData[] {
  if (typeof window === "undefined") return [] // Ensure this runs only on client-side
  try {
    const storedCourses = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedCourses ? JSON.parse(storedCourses) : []
  } catch (error) {
    console.error("Error loading courses from localStorage:", error)
    return []
  }
}

// Helper to save all courses to localStorage
function saveCoursesToLocalStorage(courses: CourseEntityData[]) {
  if (typeof window === "undefined") return // Ensure this runs only on client-side
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses))
  } catch (error) {
    console.error("Error saving courses to localStorage:", error)
    // Handle quota exceeded error if necessary
  }
}

export class Course {
  static async create(courseData: CourseDataForCreate): Promise<CourseEntityData> {
    const courses = loadCoursesFromLocalStorage()
    const newCourse: CourseEntityData = {
      id: crypto.randomUUID(), // Generate a unique ID for the course
      title: courseData.title,
      description: courseData.description,
      topic: courseData.topic,
      difficulty: courseData.difficulty,
      duration: courseData.duration,
      chapters: courseData.chapters.map((chapter, cIdx) => ({
        id: crypto.randomUUID(),
        course_id: "", // Will be set after course ID is known
        title: chapter.title,
        description: chapter.description,
        order_index: cIdx,
        lessons: chapter.lessons.map((lesson, lIdx) => ({
          id: crypto.randomUUID(),
          chapter_id: "", // Will be set after chapter ID is known
          title: lesson.title,
          content: lesson.content,
          video_url: lesson.videoUrl, // Map camelCase to snake_case for storage
          video_title: lesson.videoTitle, // Map camelCase to snake_case for storage
          duration: lesson.duration,
          order_index: lIdx,
          youtube_search_term: lesson.youtubeSearchTerm, // Map camelCase to snake_case for storage
        })),
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      userId: courseData.userId, // Assign the userId from the input data
    }

    // Link chapters and lessons to their parent IDs
    newCourse.chapters.forEach((chapter) => {
      chapter.course_id = newCourse.id
      chapter.lessons.forEach((lesson) => {
        lesson.chapter_id = chapter.id
      })
    })

    courses.push(newCourse)
    saveCoursesToLocalStorage(courses)
    console.log("Course saved to localStorage:", newCourse.id, "for user:", newCourse.userId) // Log to confirm single save
    return newCourse
  }

  static async get(id: string, userId?: string): Promise<CourseEntityData | null> {
    const courses = loadCoursesFromLocalStorage()
    // Filter by ID and optionally by userId
    const course = courses.find((c) => c.id === id && (!userId || c.userId === userId))
    return course || null
  }

  static async getRecent(limit = 12, userId?: string): Promise<CourseEntityData[]> {
    let courses = loadCoursesFromLocalStorage()
    if (userId) {
      courses = courses.filter((course) => course.userId === userId)
    }
    // Sort by creation date (most recent first) and limit
    return courses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit)
  }

  static async delete(id: string, userId: string): Promise<boolean> {
    const courses = loadCoursesFromLocalStorage()
    const initialLength = courses.length
    // Only delete if the course belongs to the specified user
    const updatedCourses = courses.filter((course) => !(course.id === id && course.userId === userId))
    saveCoursesToLocalStorage(updatedCourses)
    console.log("Course deleted from localStorage:", id, "by user:", userId)
    return updatedCourses.length < initialLength // Returns true if a course was actually removed
  }
}
