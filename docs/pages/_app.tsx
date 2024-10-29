import "@/styles/globals.css"

import { useRouter } from "next/router"
import { useEffect } from "react"

export default function MyApp() {
  const router = useRouter()

  useEffect(() => {
    // Redirect all pages to the external URL
    const externalUrl = "https://docs.identitykit.xyz/"
    if (router.pathname !== "/_error") {
      // Avoid infinite loop if there's an error
      window.location.href = externalUrl
    }
  }, [router])

  return null // Prevents rendering any content since we're redirecting
}
