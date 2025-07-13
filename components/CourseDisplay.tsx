"use client"

// This is a placeholder component. You can expand it to display the generated course.
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Youtube, FileText, Save, Loader2 } from "lucide-react"
import type { GeneratedCourse } from "@/services/courseGeneratorService"

interface CourseDisplayProps {
  course: GeneratedCourse
  onSave: () => void
  isSaving: boolean
  isLoggedIn: boolean
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ course, onSave, isSaving, isLoggedIn }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
        <CardDescription className="text-base">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {course.chapters.map((chapter, index) => (
            <AccordionItem value={`chapter-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="text-primary font-bold mr-3">Chapter {index + 1}</span>
                  {chapter.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-muted/50 rounded-md">
                <p className="italic text-muted-foreground mb-6">{chapter.description}</p>

                {chapter.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="mb-6 p-4 border rounded-md bg-background">
                    <h4 className="font-semibold mb-3 flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      {lesson.title}
                    </h4>
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-4">
                      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                    </div>
                    {lesson.videoUrl && (
                      <>
                        <h5 className="font-semibold mb-2 flex items-center text-md">
                          <Youtube className="mr-2 h-4 w-4 text-red-600" />
                          Video Resource
                        </h5>
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block border rounded-lg overflow-hidden bg-background transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                          <img
                            src={`https://i.ytimg.com/vi/${lesson.videoUrl.split("v=")[1]}/mqdefault.jpg`}
                            alt={lesson.videoTitle || lesson.title}
                            className="w-full aspect-video object-cover"
                          />
                          <p className="p-3 text-sm font-medium group-hover:text-primary transition-colors">
                            {lesson.videoTitle || lesson.title}
                          </p>
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6 text-right">
          <Button onClick={onSave} disabled={isSaving || !isLoggedIn}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Course
              </>
            )}
          </Button>
          {!isLoggedIn && <p className="text-sm text-muted-foreground mt-2">Log in to save your course.</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseDisplay
