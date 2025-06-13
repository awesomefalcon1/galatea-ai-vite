"use client"

import { useState, useEffect } from "react" // Add useEffect
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import type { ComicPage } from "@/lib/comic-data"

interface ComicReaderProps {
  currentPageNumber: number // New prop
}

export function ComicReader({ currentPageNumber }: ComicReaderProps) {
  const [zoom, setZoom] = useState(1)
  const [page, setPage] = useState<ComicPage | null>(null) // Initialize as null
  const [pageNumber, setPageNumber] = useState(currentPageNumber)
  const [totalPages, setTotalPages] = useState(0)
  const [prevPageLink, setPrevPageLink] = useState<string | null>(null)
  const [nextPageLink, setNextPageLink] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true

  useEffect(() => {
    const fetchPageData = async (pageNum: number) => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/comic/${pageNum}`)
        const data = await response.json()

        if (data.success) {
          setPage(data.page)
          setPageNumber(data.pageNumber)
          setTotalPages(data.totalPages)
          setPrevPageLink(data.prevPage ? `/comic/${data.prevPage}` : null)
          setNextPageLink(data.nextPage ? `/comic/${data.nextPage}` : null)
        } else {
          setPage(null) // Handle error case
          console.error("Failed to load page data:", data.error)
        }
      } catch (error) {
        setPage(null) // Handle error case
        console.error("Failed to fetch comic page:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPageData(currentPageNumber)
  }, [currentPageNumber]) // Re-fetch if currentPageNumber changes

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.25)
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(zoom - 0.25)
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl w-full flex items-center justify-center h-[600px]">
        <div className="text-cyber-blue animate-pulse text-xl">Loading Page {currentPageNumber}...</div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="max-w-6xl w-full flex items-center justify-center h-[600px]">
        <div className="text-red-500 text-xl">Error loading page. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevPageLink || isLoading}
            asChild={!!(prevPageLink && !isLoading)}
            className="border-cyber-blue/50 hover:border-cyber-blue"
          >
            {prevPageLink && !isLoading ? (
              <Link href={prevPageLink}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!nextPageLink || isLoading}
            asChild={!!(nextPageLink && !isLoading)}
            className="border-cyber-blue/50 hover:border-cyber-blue"
          >
            {nextPageLink && !isLoading ? (
              <Link href={nextPageLink}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {pageNumber} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="border-cyber-blue/50 hover:border-cyber-blue"
          >
            <ZoomOut className="h-4 w-4" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 2}
            className="border-cyber-blue/50 hover:border-cyber-blue"
          >
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">Zoom in</span>
          </Button>
        </div>
      </div>

      <div className="overflow-auto bg-cyber-darker border border-cyber-blue/30 rounded-lg">
        <div
          className="relative transition-transform duration-300 ease-in-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
            {page.panels.map((panel, index) => (
              <div
                key={index}
                className={`comic-panel ${panel.className || ""}`}
                style={{ aspectRatio: panel.aspectRatio || "16/9" }}
              >
                {panel.image && (
                  <Image
                    src={panel.image || "/placeholder.svg"}
                    alt={`Panel ${index + 1}`}
                    fill
                    className="object-cover"
                  />
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
                      <p className="text-sm">{panel.dialogue}</p>
                      {panel.speaker && <p className="text-xs text-cyber-blue mt-1">— {panel.speaker}</p>}
                    </div>
                  </div>
                )}
                {panel.narration && (
                  <div className="absolute top-4 left-4 max-w-[80%]">
                    <div className="comic-narration">
                      <p className="text-sm">{panel.narration}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={!prevPageLink || isLoading}
          asChild={!!(prevPageLink && !isLoading)}
          className="border-cyber-blue/50 hover:border-cyber-blue"
        >
          {prevPageLink && !isLoading ? (
            <Link href={prevPageLink}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </>
          )}
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {pageNumber} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!nextPageLink || isLoading}
          asChild={!!(nextPageLink && !isLoading)}
          className="border-cyber-blue/50 hover:border-cyber-blue"
        >
          {nextPageLink && !isLoading ? (
            <Link href={nextPageLink}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
