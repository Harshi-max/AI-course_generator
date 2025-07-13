import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
// Removed ClerkProvider import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Course Generator",
  description: "Generate comprehensive courses with AI and YouTube integration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Removed Clerk publishable key check

  return (
    // Removed ClerkProvider wrapper
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
