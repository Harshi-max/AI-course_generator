"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Loader2, Mail, Lock, User, Sparkles } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Password validation
  const isValidPassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter your password.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication - in real app, you'd validate against your backend
      const mockUsers = [
        { email: "user@example.com", password: "Password123!", id: "mock_user_1" },
        { email: "admin@example.com", password: "Admin123!", id: "mock_user_2" },
      ]

      const user = mockUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store user session (in real app, you'd get a JWT token)
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            id: user.id, // Store the mock user ID
            isAuthenticated: true,
            loginTime: new Date().toISOString(),
          }),
        )

        toast({
          title: "Signed In Successfully!",
          description: "Welcome back! Redirecting to home page...",
        })

        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        toast({
          title: "Sign In Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      toast({
        title: "Full Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    if (!isValidPassword(password)) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters with uppercase, lowercase, and numbers.",
        variant: "destructive",
      })
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock user creation
      const newUser = {
        id: `mock_user_${Math.random().toString(36).substr(2, 9)}`, // Generate a unique mock ID
        email,
        fullName,
        createdAt: new Date().toISOString(),
        isAuthenticated: true,
      }

      // Store user session
      localStorage.setItem("user", JSON.stringify(newUser))

      toast({
        title: "Account Created Successfully!",
        description: "Welcome! Your account has been created and you're now signed in.",
      })

      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error) {
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address to reset your password.",
        variant: "destructive",
      })
      return
    }
    setResetLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Password Reset Email Sent!",
        description: "If an account with this email exists, you'll receive reset instructions shortly.",
      })

      setShowResetPassword(false)
      setEmail("")
    } catch (error) {
      toast({
        title: "Reset Password Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setResetLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setFullName("")
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    resetForm()
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(236,72,153,0.05),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        <Card className="backdrop-blur-xl bg-white/70 border-white/20 shadow-2xl shadow-violet-500/10">
          <CardHeader className="text-center relative pb-8 pt-10">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-2 -left-2 text-violet-600 hover:text-violet-800 hover:bg-violet-50/50 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-20 animate-pulse"></div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
              {showResetPassword ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg leading-relaxed">
              {showResetPassword
                ? "Enter your email to receive reset instructions."
                : isSignUp
                  ? "Join us and start your journey today."
                  : "Sign in to continue your journey."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-10 pb-10">
            {showResetPassword ? (
              <form onSubmit={handlePasswordReset} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="reset-email" className="text-sm font-semibold text-gray-700">
                    Email address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                    <Input
                      id="reset-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={resetLoading}
                      placeholder="Enter your email address"
                      className="pl-12 pr-4 py-3 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3 text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Reset Email...
                      </>
                    ) : (
                      "Send Reset Email"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowResetPassword(false)}
                    disabled={resetLoading}
                    className="w-full py-3 text-base font-semibold border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 text-gray-700 rounded-xl transition-all duration-200"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <form className="space-y-6">
                  {isSignUp && (
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={loading}
                          placeholder="Enter your full name"
                          className="pl-12 pr-4 py-3 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        placeholder="Enter your email address"
                        className="pl-12 pr-4 py-3 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 py-3 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-violet-50 text-gray-400 hover:text-violet-500 transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {isSignUp && (
                      <p className="text-sm text-gray-500 mt-2 px-1">
                        Must be 8+ characters with uppercase, lowercase, and numbers
                      </p>
                    )}
                  </div>
                  {isSignUp && (
                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={loading}
                          placeholder="Confirm your password"
                          className="pl-12 pr-12 py-3 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-violet-50 text-gray-400 hover:text-violet-500 transition-colors duration-200"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={loading}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
                <div className="space-y-4">
                  <Button
                    onClick={isSignUp ? handleSignUp : handleSignIn}
                    disabled={loading}
                    className="w-full py-3 text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-0 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {isSignUp ? "Creating Account..." : "Signing In..."}
                      </>
                    ) : isSignUp ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleMode}
                    disabled={loading}
                    className="w-full py-3 text-base font-semibold border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 text-gray-700 rounded-xl transition-all duration-200 bg-transparent"
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                  </Button>
                </div>

                {!isSignUp && (
                  <div className="text-center pt-2">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setShowResetPassword(true)}
                      disabled={loading}
                      className="text-sm text-violet-600 hover:text-violet-800 font-medium transition-colors duration-200"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
