"use client"

import { usePathname } from "next/navigation"
import { ComicHeader } from "./comic-header"
import { useComicContext } from "@/app/context/comic-context"
import { useContext } from "react"
import { ComicContext } from "@/app/context/comic-context"

export function ComicHeaderWrapper() {
  const pathname = usePathname()
  const isComicPage = pathname.startsWith("/comic/")
  
  // Always call useContext at the top level
  const comicContext = useContext(ComicContext)
  
  // Only use comic context data if we're on a comic page and context is available
  if (isComicPage && comicContext) {
    return (
      <ComicHeader
        comicTitle={comicContext.currentPage?.title}
        currentPanelIndex={comicContext.currentPanelIndex}
        totalPanels={comicContext.totalPanels}
      />
    )
  }

  return <ComicHeader />
}
