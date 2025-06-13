import { NextResponse } from "next/server"
import { comicPages } from "@/lib/comic-data"

export async function GET(request: Request, { params }: { params: { page: string } }) {
  const pageNumber = Number.parseInt(params.page)

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > comicPages.length) {
    return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 })
  }

  const page = comicPages[pageNumber - 1]

  return NextResponse.json({
    success: true,
    page,
    pageNumber,
    totalPages: comicPages.length,
    prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    nextPage: pageNumber < comicPages.length ? pageNumber + 1 : null,
  })
}
