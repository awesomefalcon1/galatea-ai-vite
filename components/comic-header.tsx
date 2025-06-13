import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, BookOpen } from "lucide-react"

export function ComicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-cyber-dark/90 backdrop-blur-lg border-b-2 border-cyber-blue/30">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-cyber-pink rounded-full opacity-70 blur-sm"></div>
              <div className="absolute inset-0.5 bg-cyber-dark rounded-full flex items-center justify-center">
                <span className="text-cyber-pink font-bold text-xs">G2.0</span>
              </div>
            </div>
            <span className="font-cyber text-xl tracking-wider neon-text">GALATEA 2.0</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/comic/1"
            className="text-sm font-medium text-cyber-blue hover:text-cyber-light transition-colors"
          >
            READ
          </Link>
          <Link
            href="/chapters"
            className="text-sm font-medium text-muted-foreground hover:text-cyber-light transition-colors"
          >
            CHAPTERS
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-cyber-light transition-colors"
          >
            ABOUT
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/comic/1" className="hidden md:block">
            <Button
              variant="default"
              size="sm"
              className="bg-cyber-blue text-black hover:bg-cyber-light flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>READ NOW</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
