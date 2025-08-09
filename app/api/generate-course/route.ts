import { type NextRequest, NextResponse } from "next/server"
import { jsonrepair } from "jsonrepair"
import { randomUUID } from "crypto"

/**
 * Extremely tolerant JSON extractor for Gemini-style output.
 */
function extractCourseJSON(raw: string) {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : raw
  try {
    return JSON.parse(jsonrepair(candidate))
  } catch {
    throw new Error("AI returned un-parsable JSON")
  }
}

/**
 * Generates **very** simple fallback data so the UI never breaks.
 */
function stubCourse(topic: string) {
  return {
    id: randomUUID(),
    title: `Intro to ${topic}`,
    description: `A short, automatically generated overview of ${topic}.`,
    difficulty: "beginner",
    duration: "short",
    chapters: [
      {
        id: randomUUID(),
        title: `Getting started with ${topic}`,
        description: `Fundamental concepts of ${topic}.`,
        lessons: [
          {
            id: randomUUID(),
            title: `What is ${topic}?`,
            content: `<p>${topic} is …</p>`,
            duration: "10 min",
            youtubeSearchTerm: `${topic} introduction`,
          },
        ],
      },
    ],
  }
}

export async function POST(req: NextRequest) {
  const { topic, description = "", difficulty = "", duration = "" } = await req.json()

  /* ------------------------------- 1. Try Gemini ---------------------- */
  let courseData: any
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const geminiApiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
    if (!geminiApiKey) {
      console.error("NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY is not set. Gemini course generation will use stub data.")
      throw new Error("Gemini API key is missing.")
    }
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `
Create a comprehensive, step-by-step course structure for the topic: "${topic}"

Additional context: ${description || "None provided"}
Difficulty level: ${difficulty}
Duration: ${duration}

Generate a detailed course with:
1. Course title and description.
2. 4–6 chapters, each with 3–5 lessons.
3. Each lesson should have at least 400-600 words of rich HTML content.
4. For technical topics, include relevant, concise example code snippets within <pre><code>...</code></pre> tags in the lesson content.
5. Structure the lesson content with clear headings (h2, h3), paragraphs (p), and ordered/unordered lists (ol, ul) for step-by-step guidance.
6. Suggest a highly relevant and specific YouTube search term for each lesson to find a good video resource. The video should ideally complement the lesson content.
7. Ensure the depth and complexity of the content, as well as the number of lessons/chapters, align with the specified difficulty (${difficulty}) and duration (${duration}).
${
  difficulty === "advanced" && duration === "long"
    ? "The course should aim to provide a comprehensive, progressive learning path suitable for mastering the topic from foundational to advanced concepts."
    : ""
}

Return ONLY valid JSON, NO markdown fences, matching exactly:

{
  "title": "Course Title",
  "description": "Course description",
  "chapters": [
    {
      "title": "Chapter Title",
      "description": "Chapter description",
      "lessons": [
        {
          "title": "Lesson Title",
          "content": "<h2>…</h2><p>…</p><pre><code>// example code</code></pre>",
          "youtubeSearchTerm": "specific search term for video",
          "duration": "15 min"
        }
      ]
    }
  ]
}`.trim()
    const ai = await model.generateContent(prompt)
    courseData = extractCourseJSON((await ai.response).text())
  } catch (e) {
    console.warn("⚠️  Gemini failed, using stub. Reason:", e)
    courseData = stubCourse(topic)
  }

  /* ------------------------------- 2. YouTube look-ups ---------------- */
  const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  if (!youtubeApiKey) {
    console.warn("⚠️  NEXT_PUBLIC_YOUTUBE_API_KEY is not set. YouTube videos will not be fetched.")
  }

  for (const ch of courseData.chapters) {
    for (const ls of ch.lessons) {
      if (youtubeApiKey && ls.youtubeSearchTerm) {
        try {
          console.log(`Attempting YouTube search for: "${ls.youtubeSearchTerm}"`)
          const r = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
              ls.youtubeSearchTerm,
            )}&type=video&key=${youtubeApiKey}`,
          )
          if (!r.ok) {
            const errorText = await r.text()
            throw new Error(`YouTube API request failed with status ${r.status}: ${errorText}`)
          }
          const d = await r.json()
          if (d.items?.length) {
            const v = d.items[0]
            ls.videoUrl = `https://www.youtube.com/watch?v=${v.id.videoId}`
            ls.videoTitle = v.snippet.title
            console.log(`Found YouTube video for "${ls.youtubeSearchTerm}": ${ls.videoTitle} (${ls.videoUrl})`)
          } else {
            console.warn(`No YouTube video found for search term: "${ls.youtubeSearchTerm}"`)
            ls.videoUrl = null
            ls.videoTitle = null
          }
        } catch (e) {
          console.warn("YouTube lookup failed:", e)
          ls.videoUrl = null
          ls.videoTitle = null
        }
      } else {
        ls.videoUrl = null // Ensure it's null if no key or search term
        ls.videoTitle = null
      }
    }
  }

  /* ------------------------------- 3. Done ---------------------------- */
  return NextResponse.json(courseData)
}



