// "use client"
//
// import { Button } from "@/components/ui/button"
// import {
//   BookOpen,
//   Brain,
//   Video,
//   Users,
//   Sparkles,
//   Lightbulb,
//   GraduationCap,
// } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"
// import useAppLevelAuth from "@/hooks/useAppLevelAuth"
//
// export default function HomePage() {
//   const { isLoggedIn, isLoaded } = useAppLevelAuth()
//
//   const handleSignOut = () => {
//     localStorage.removeItem("user")
//     window.location.href = "/"
//   }
//
//   return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
//         {/* Header */}
//         <header className="border-b border-gray-700 bg-gray-950/90 backdrop-blur sticky top-0 z-50">
//           <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Brain className="h-8 w-8 text-purple-400" />
//               <h1 className="text-2xl font-bold text-white">AI Course Generator</h1>
//             </div>
//             <nav className="flex items-center gap-4">
//               <Link href="/my-courses">
//                 <Button variant="ghost" className="text-gray-200 hover:text-white">My Courses</Button>
//               </Link>
//               <Link href="/dashboard">
//                 <Button className="bg-purple-600 hover:bg-purple-700 text-white">Generate Course</Button>
//               </Link>
//               {isLoaded ? (
//                   isLoggedIn ? (
//                       <Button
//                           onClick={handleSignOut}
//                           variant="outline"
//                           className="border-gray-600 text-gray-300 hover:text-white"
//                       >
//                         Sign Out
//                       </Button>
//                   ) : (
//                       <Link href="/signin">
//                         <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
//                       </Link>
//                   )
//               ) : (
//                   <div className="w-24 h-10 bg-gray-700 rounded-md animate-pulse" />
//               )}
//             </nav>
//           </div>
//         </header>
//
//         {/* Hero Section */}
//         <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/60 -z-10" />
//           <div className="max-w-4xl mx-auto relative z-10">
//             <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
//               Learn Smarter with{" "}
//               <span className="text-purple-400">Curated Courses</span>
//             </h2>
//             <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
//               Build structured learning paths with rich content and hand-picked video resources.
//             </p>
//             <Link href="/dashboard">
//               <Button
//                   size="lg"
//                   className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg font-semibold shadow-lg transition-all text-white"
//               >
//                 <Sparkles className="h-5 w-5 mr-2" />
//                 Start Your Course Journey
//               </Button>
//             </Link>
//           </div>
//         </section>
//
//         {/* Visual Highlights */}
//         <section className="container mx-auto px-4 py-16 text-center">
//           <h3 className="text-4xl font-bold text-gray-100 mb-12">Designed for Clarity and Depth</h3>
//           <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//             <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-700">
//               <Image
//                   src="/images/ai-robot-lightbulb.png"
//                   alt="Visual inspiration"
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="object-center"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
//                 <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
//                   Turning ideas into structured knowledge.
//                 </p>
//               </div>
//             </div>
//             <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-gray-700">
//               <Image
//                   src="/images/ai-robot-data-screen.png"
//                   alt="Data visualization"
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="object-center"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
//                 <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
//                   From research to real learning in seconds.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <p className="text-lg text-gray-300 mt-8 max-w-2xl mx-auto">
//             Every course is crafted for focus, depth, and retention — made by Harshitha Arava.
//           </p>
//         </section>
//
//         {/* How It Works Section */}
//         <section className="container mx-auto px-4 py-16">
//           <h3 className="text-4xl font-bold text-center text-white mb-12">How It Works</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center">
//               <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
//               <h4 className="text-xl font-semibold mb-3">1. Choose a Topic</h4>
//               <p className="text-gray-300">Select the subject you want to explore in depth.</p>
//             </div>
//             <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center">
//               <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6" />
//               <h4 className="text-xl font-semibold mb-3">2. Get Your Custom Course</h4>
//               <p className="text-gray-300">Receive a detailed course outline crafted with care and logic.</p>
//             </div>
//             <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center">
//               <GraduationCap className="h-16 w-16 text-green-400 mx-auto mb-6" />
//               <h4 className="text-xl font-semibold mb-3">3. Learn at Your Pace</h4>
//               <p className="text-gray-300">Use the structured material and videos to master any concept.</p>
//             </div>
//           </div>
//         </section>
//
//         {/* Key Features Section */}
//         <section className="container mx-auto px-4 py-16 bg-gray-900 rounded-xl shadow-inner">
//           <h3 className="text-4xl font-bold text-center text-white mb-12">Why Use This Platform?</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
//               <BookOpen className="h-12 w-12 text-purple-400 mb-4" />
//               <h3 className="text-lg font-semibold mb-2 text-white">Original Content</h3>
//               <p className="text-gray-400">Custom-written learning material tailored to your goals.</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
//               <Video className="h-12 w-12 text-blue-400 mb-4" />
//               <h3 className="text-lg font-semibold mb-2 text-white">Video Enrichment</h3>
//               <p className="text-gray-400">Hand-picked YouTube videos that align perfectly with each topic.</p>
//             </div>
//             <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
//               <Users className="h-12 w-12 text-green-400 mb-4" />
//               <h3 className="text-lg font-semibold mb-2 text-white">Guided Flow</h3>
//               <p className="text-gray-400">Clear progression through organized chapters and checkpoints.</p>
//             </div>
//           </div>
//         </section>
//
//         {/* Footer */}
//         <footer className="bg-gray-950 text-gray-300 pt-12 border-t border-gray-800">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
//               <div className="text-center md:text-left">
//                 <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
//                   <Brain className="h-6 w-6 text-purple-400" />
//                   <span className="text-lg font-semibold text-white">AI Course Generator</span>
//                 </div>
//                 <p className="text-sm text-gray-400 max-w-xs">
//                   Built from the ground up to simplify learning. Designed and developed by Harshitha Arava.
//                 </p>
//               </div>
//
//               <div className="text-center md:text-right space-y-2">
//                 <p className="text-sm text-gray-400">
//                   Crafted with ❤️ by <span className="text-purple-400 font-medium">Harshitha Arava</span>
//                 </p>
//                 <div className="flex justify-center md:justify-end gap-4">
//                   <a
//                       href="https://www.linkedin.com/in/harshitha-arava/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-purple-400 transition"
//                   >
//                     LinkedIn
//                   </a>
//                   <a
//                       href="https://github.com/Harshi-max"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-purple-400 transition"
//                   >
//                     GitHub
//                   </a>
//                   <a
//                       href="mailto:srilakshmidevimutyala@gmail.com"
//                       className="hover:text-purple-400 transition"
//                   >
//                     Contact
//                   </a>
//                 </div>
//               </div>
//             </div>
//
//           </div>
//         </footer>
//       </div>
//   )
// }



"use client"

import { Button } from "@/components/ui/button"
import {
    BookOpen,
    Brain,
    Video,
    Users,
    Sparkles,
    Lightbulb,
    GraduationCap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useAppLevelAuth from "@/hooks/useAppLevelAuth"

export default function HomePage() {
    const { isLoggedIn, isLoaded } = useAppLevelAuth()

    const handleSignOut = () => {
        localStorage.removeItem("user")
        window.location.href = "/"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            {/* Header */}
            <header className="border-b border-gray-700 bg-gray-950/90 backdrop-blur sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
                        <h1 className="text-2xl font-bold text-white">AI Course Generator</h1>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/my-courses">
                            <Button variant="ghost" className="text-gray-200 hover:text-white">My Courses</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Generate Course</Button>
                        </Link>
                        {isLoaded ? (
                            isLoggedIn ? (
                                <Button
                                    onClick={handleSignOut}
                                    variant="outline"
                                    className="border-gray-600 text-gray-300 hover:text-white"
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <Link href="/signin">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                                </Link>
                            )
                        ) : (
                            <div className="w-24 h-10 bg-gray-700 rounded-md animate-pulse" />
                        )}
                    </nav>
                </div>
            </header>

            {/* Scrolling Text Animation */}
            <div className="overflow-hidden whitespace-nowrap bg-purple-950 py-2 border-b border-purple-700 text-sm">
                <div className="animate-marquee inline-block text-purple-300 font-medium px-4">
                    Made with 💜 by Harshitha Arava • Intelligent course planning • Personalized learning • Explore. Learn. Grow.
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-900/60 -z-10" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                        Learn Smarter with <span className="text-purple-400">Curated Courses</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                        Build structured learning paths with rich content and hand-picked video resources.
                    </p>
                    <Link href="/dashboard">
                        <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg font-semibold shadow-lg transition-all text-white"
                        >
                            <Sparkles className="h-5 w-5 mr-2" />
                            Start Your Course Journey
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Visual Highlights */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h3 className="text-4xl font-bold text-gray-100 mb-12">Designed for Clarity and Depth</h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700 transform transition-transform hover:scale-105">
                        <Image
                            src="/images/ai-robot-lightbulb.png"
                            alt="Visual inspiration"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                            <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
                                Turning ideas into structured knowledge.
                            </p>
                        </div>
                    </div>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700 transform transition-transform hover:scale-105">
                        <Image
                            src="/images/ai-robot-data-screen.png"
                            alt="Data visualization"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                            <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
                                From research to real learning in seconds.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-lg text-gray-300 mt-8 max-w-2xl mx-auto">
                    Every course is crafted for focus, depth, and retention — made with care by Harshitha Arava.
                </p>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4 py-16">
                <h3 className="text-4xl font-bold text-center text-white mb-12">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center hover:shadow-xl transform hover:-translate-y-2 transition">
                        <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                        <h4 className="text-xl font-semibold mb-3">1. Choose a Topic</h4>
                        <p className="text-gray-300">Select the subject you want to explore in depth.</p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center hover:shadow-xl transform hover:-translate-y-2 transition">
                        <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                        <h4 className="text-xl font-semibold mb-3">2. Get Your Custom Course</h4>
                        <p className="text-gray-300">Receive a detailed course outline crafted with care and logic.</p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl shadow-md border border-gray-700 text-center hover:shadow-xl transform hover:-translate-y-2 transition">
                        <GraduationCap className="h-16 w-16 text-green-400 mx-auto mb-6" />
                        <h4 className="text-xl font-semibold mb-3">3. Learn at Your Pace</h4>
                        <p className="text-gray-300">Use the structured material and videos to master any concept.</p>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="container mx-auto px-4 py-16 bg-gray-900 rounded-xl shadow-inner">
                <h3 className="text-4xl font-bold text-center text-white mb-12">Why Use This Platform?</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
                        <BookOpen className="h-12 w-12 text-purple-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-white">Original Content</h3>
                        <p className="text-gray-400">Custom-written learning material tailored to your goals.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
                        <Video className="h-12 w-12 text-blue-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-white">Video Enrichment</h3>
                        <p className="text-gray-400">Hand-picked YouTube videos that align perfectly with each topic.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex flex-col items-center text-center">
                        <Users className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-white">Guided Flow</h3>
                        <p className="text-gray-400">Clear progression through organized chapters and checkpoints.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-300 pt-12 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <Brain className="h-6 w-6 text-purple-400" />
                                <span className="text-lg font-semibold text-white">AI Course Generator</span>
                            </div>
                            <p className="text-sm text-gray-400 max-w-xs">
                                Built from the ground up to simplify learning. Designed and developed by Harshitha Arava.
                            </p>
                        </div>

                        <div className="text-center md:text-right space-y-2">
                            <p className="text-sm text-gray-400">
                                Crafted with ❤️ by <span className="text-purple-400 font-medium">Harshitha Arava</span>
                            </p>
                            <div className="flex justify-center md:justify-end gap-4">
                                <a
                                    href="https://www.linkedin.com/in/harshitha-arava/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-purple-400 transition"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/Harshi-max"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-purple-400 transition"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="mailto:srilakshmidevimutyala@gmail.com"
                                    className="hover:text-purple-400 transition"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}