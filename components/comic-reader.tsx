"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ComicPage, ComicPanel } from "@/lib/comic-data"

interface ComicReaderProps {
  currentPageNumber: number
}

export function ComicReader({ currentPageNumber }: ComicReaderProps) {
  const [page, setPage] = useState<ComicPage | null>(null)
  const [pageNumber, setPageNumber] = useState(currentPageNumber)
  const [totalPages, setTotalPages] = useState(0)
  const [prevPageLink, setPrevPageLink] = useState<string | null>(null)
  const [nextPageLink, setNextPageLink] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPageData = useCallback(async (pageNum: number) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log(`Fetching page ${pageNum}...`)
      const response = await fetch(`/api/comic/${pageNum}`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Page ${pageNum} data:`, data)

      if (data.success) {
        setPage(data.page)
        setPageNumber(data.pageNumber)
        setTotalPages(data.totalPages)
        setPrevPageLink(data.prevPage ? `/comic/${data.prevPage}` : null)
        setNextPageLink(data.nextPage ? `/comic/${data.nextPage}` : null)
      } else {
        setPage(null)
        setError(data.error || "Failed to load page data")
        console.error("Failed to load page data:", data.error)
      }
    } catch (error) {
      setPage(null)
      setError(`Error loading page: ${error instanceof Error ? error.message : String(error)}`)
      console.error("Failed to fetch comic page:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPageData(currentPageNumber)
  }, [currentPageNumber, fetchPageData])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevPageLink) {
        window.location.href = prevPageLink
      } else if (e.key === "ArrowRight" && nextPageLink) {
        window.location.href = nextPageLink
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevPageLink, nextPageLink])

  const renderPanel = (panel: ComicPanel, index: number) => {
    try {
      return (
        <div
          key={index}
          className="comic-panel relative overflow-hidden"
          style={{ aspectRatio: panel.aspectRatio || "16/9" }}
        >
          {panel.image && (
            <Image src={panel.image || "/placeholder.svg"} alt={`Panel ${index + 1}`} fill className="object-cover" />
          )}
          {panel.background && (
            <div
              className="absolute inset-0"
              style={{
                background: panel.background,
              }}
            ></div>
          )}
          {panel.content && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="max-w-full">{panel.content}</div>
            </div>
          )}
          {panel.dialogue && (
            <div className="absolute bottom-4 right-4 max-w-[80%]">
              <div className="comic-text">
                <p className="text-sm md:text-base">{panel.dialogue}</p>
                {panel.speaker && <p className="text-xs md:text-sm text-cyber-blue mt-1">— {panel.speaker}</p>}
              </div>
            </div>
          )}
          {panel.narration && (
            <div className="absolute top-4 left-4 max-w-[80%]">
              <div className="comic-narration">
                <p className="text-sm md:text-base">{panel.narration}</p>
              </div>
            </div>
          )}
        </div>
      )
    } catch (error) {
      console.error(`Error rendering panel ${index}:`, error)
      return (
        <div
          key={index}
          className="comic-panel relative overflow-hidden bg-cyber-darker"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-500">Error rendering panel</p>
          </div>
        </div>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="bg-cyber-darker border-y-4 border-cyber-blue/30 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-12 w-64 bg-cyber-dark/50 animate-pulse rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/2] bg-cyber-dark/50 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full text-center py-16">
        <div className="text-red-500 text-xl mb-4">Error loading page</div>
        <div className="text-gray-400 mb-8">{error}</div>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button className="bg-cyber-blue text-black hover:bg-cyber-light">Return Home</Button>
          </Link>
          {prevPageLink && (
            <Link href={prevPageLink}>
              <Button variant="outline" className="border-cyber-blue/50 hover:border-cyber-blue">
                Previous Page
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="w-full text-center py-16">
        <div className="text-red-500 text-xl">Error loading page. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Comic Page */}
      <div className="bg-cyber-darker border-y-4 border-cyber-blue/30 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Title */}
          <h1 className="text-4xl font-cyber text-center mb-8 neon-text">{page.title}</h1>

          {/* Comic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {page.panels.map((panel, index) => renderPanel(panel, index))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
        <Button
          variant="outline"
          size="lg"
          disabled={!prevPageLink}
          asChild={!!prevPageLink}
          className="border-cyber-blue/50 hover:border-cyber-blue"
        >
          {prevPageLink ? (
            <Link href={prevPageLink}>
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous Page
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous Page
            </>
          )}
        </Button>

        <div className="text-center">
          <span className="text-cyber-blue font-bold text-lg">{pageNumber}</span>
          <span className="text-gray-400 text-lg"> / {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="lg"
          disabled={!nextPageLink}
          asChild={!!nextPageLink}
          className="border-cyber-blue/50 hover:border-cyber-blue"
        >
          {nextPageLink ? (
            <Link href={nextPageLink}>
              Next Page
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          ) : (
            <>
              Next Page
              <ChevronRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
