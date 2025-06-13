import { ComicHeader } from "@/components/comic-header"
import { ComicFooter } from "@/components/comic-footer"
import { ComicCover } from "@/components/comic-cover"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <ComicHeader />
      <div className="flex-grow flex items-center justify-center p-4">
        <ComicCover />
      </div>
      <ComicFooter />
    </main>
  )
}
