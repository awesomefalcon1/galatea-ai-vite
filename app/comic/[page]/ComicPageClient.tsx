"use client"

import { useState, useEffect } from "react"
import { ComicHeader } from "@/components/comic-header"
import { ComicFooter } from "@/components/comic-footer"
import { ComicReader } from "@/components/comic-reader"
import { comicPages } from "@/lib/comic-data"
import { useParams, notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function ComicPageClient() {
  const params = useParams()
  const pageParam = params.page
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState<number | null>(null)

  useEffect(() => {
    if (!pageParam || Array.isArray(pageParam)) {
      notFound()
      return
    }

    const parsedPageNumber = Number.parseInt(pageParam)
    setPageNumber(parsedPageNumber)

    if (isNaN(parsedPageNumber)) {
      setError("Invalid page number")
      return
    }

    if (parsedPageNumber < 1 || parsedPageNumber > comicPages.length) {
      setError(`Page ${parsedPageNumber} not found. Available pages: 1-${comicPages.length}`)
      return
    }

    setError(null)
  }, [pageParam, router])

  // If there's an error, show an error message with options to go home or to first page
  if (error) {
    return (
      <main className="min-h-screen flex flex-col">
        <ComicHeader />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-cyber mb-6 text-cyber-pink">Error Loading Comic</h1>
            <p className="text-xl mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-cyber-blue text-black hover:bg-cyber-light">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
              <Link href="/comic/1">
                <Button variant="outline" className="border-cyber-blue/50 hover:border-cyber-blue">
                  Go to First Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <ComicFooter />
      </main>
    )
  }

  if (!pageNumber) {
    return null // Or a loading state
  }

  return (
    <main className="min-h-screen flex flex-col">
      <ComicHeader />
      <div className="flex-grow">
        <ComicReader currentPageNumber={pageNumber} />
      </div>
      <ComicFooter />
    </main>
  )
}
