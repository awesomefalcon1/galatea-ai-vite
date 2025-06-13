"use client"

import { ComicHeader } from "@/components/comic-header"
import { ComicFooter } from "@/components/comic-footer"
import { ComicReader } from "@/components/comic-reader"
import { comicPages } from "@/lib/comic-data" // Keep for generateStaticParams
import { useParams, notFound } from "next/navigation" // Import useParams

export default function ComicPageClient() {
  const params = useParams()
  const pageParam = params.page

  if (!pageParam || Array.isArray(pageParam)) {
    notFound()
    return null
  }

  const pageNumber = Number.parseInt(pageParam)

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > comicPages.length) {
    notFound()
    return null
  }

  return (
    <main className="min-h-screen flex flex-col">
      <ComicHeader />
      <div className="flex-grow flex items-center justify-center p-4">
        <ComicReader currentPageNumber={pageNumber} />
      </div>
      <ComicFooter />
    </main>
  )
}
