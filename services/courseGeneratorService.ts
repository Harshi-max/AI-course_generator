export interface GeneratedCourse {
  title: string
  description: string
  chapters: any[]
}

interface GenerateCourseParams {
  topic: string
  description: string
  difficulty: string
  duration: string
}

export async function generateCourse(params: GenerateCourseParams): Promise<GeneratedCourse> {
  const res = await fetch("/api/generate-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })

  // The API now only returns the generated course data, it does not save it.
  // Saving is handled client-side by Course.create in CourseGenerator.
  const body = await res.json().catch(async () => {
    const txt = await res.text()
    throw new Error(txt)
  })

  if (!res.ok) throw new Error(body?.error || "Generation failed")

  return body as GeneratedCourse
}
