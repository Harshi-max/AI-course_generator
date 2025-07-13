"use client"

import { useState, useEffect } from "react"

interface AuthState {
  isLoggedIn: boolean
  userId: string | null
  isLoaded: boolean // Indicates if auth state has been loaded
}

const useAppLevelAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userId: null,
    isLoaded: false,
  })

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const userString = localStorage.getItem("user")
        if (userString) {
          const user = JSON.parse(userString)
          setAuthState({
            isLoggedIn: user.isAuthenticated === true,
            userId: user.id || null, // Use the 'id' from your mock user
            isLoaded: true,
          })
        } else {
          setAuthState({
            isLoggedIn: false,
            userId: null,
            isLoaded: true,
          })
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error)
        setAuthState({
          isLoggedIn: false,
          userId: null,
          isLoaded: true,
        })
      }
    }

    // Initial check
    checkAuthStatus()

    // Optional: Add a way to re-check auth status if localStorage changes
    // Note: localStorage changes don't trigger React re-renders directly across tabs/windows.
    // For a single tab, a simple interval or custom event could be used if needed.
    // For this mock, a refresh or direct interaction will update the state.
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return authState
}

export default useAppLevelAuth
