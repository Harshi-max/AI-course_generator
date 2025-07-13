"use client" // Keep this directive

import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Video, Users, Sparkles, Lightbulb, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useAppLevelAuth from "@/hooks/useAppLevelAuth" // Import the custom auth hook

export default function HomePage() {
  const { isLoggedIn, isLoaded } = useAppLevelAuth() // Get the loading state and login status

  const handleSignOut = () => {
    localStorage.removeItem("user") // Clear user session from localStorage
    // Optionally, force a reload or redirect to update UI
    window.location.href = "/" // Simple redirect to home
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Course Generator</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/my-courses">
              <Button variant="ghost">My Courses</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Generate Course</Button>
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
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 opacity-50 -z-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Unlock Knowledge with <span className="text-purple-700">AI-Powered Courses</span>
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Instantly create comprehensive, structured learning paths on any topic. Dive deep with AI-generated content
            and perfectly curated YouTube videos. Your personalized learning journey starts here.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Generating Your Course
            </Button>
          </Link>
        </div>
      </section>

      {/* AI Visuals Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">Intelligent Design, Powerful Learning</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <Image
              src="/images/ai-robot-lightbulb.png"
              alt="AI Robot holding a lightbulb, symbolizing ideas and innovation"
              fill
              style={{ objectFit: "cover" }}
              className="object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
              <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
                Sparking new ideas with AI-driven insights.
              </p>
            </div>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <Image
              src="/images/ai-robot-data-screen.png"
              alt="AI Robot analyzing data and generating content"
              fill
              style={{ objectFit: "cover" }}
              className="object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
              <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
                Crafting comprehensive courses from complex data.
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 mt-8 max-w-2xl mx-auto">
          Our advanced AI processes your requests to deliver highly relevant and structured educational content.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
            <Lightbulb className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h4 className="text-xl font-semibold mb-3">1. Input Your Topic</h4>
            <p className="text-gray-600">Tell our AI what you want to learn, from beginner to advanced concepts.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
            <Sparkles className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h4 className="text-xl font-semibold mb-3">2. AI Generates Content</h4>
            <p className="text-gray-600">Our intelligent AI crafts detailed chapters and lessons for you.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
            <GraduationCap className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h4 className="text-xl font-semibold mb-3">3. Learn & Master</h4>
            <p className="text-gray-600">Explore your custom course with integrated videos and track your progress.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-xl shadow-inner">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Generated Content</h3>
            <p className="text-gray-600">Comprehensive course materials created by Google Gemini AI</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center text-center">
            <Video className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">YouTube Integration</h3>
            <p className="text-gray-600">Curated video content to enhance your learning</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Structured Learning</h3>
            <p className="text-gray-600">Step-by-step progression through organized chapters</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="text-lg font-semibold">AI Course Generator</span>
          </div>
          <p className="text-gray-400">Empowering learning through AI-generated educational content</p>
          <div className="mt-6 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} AI Course Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
