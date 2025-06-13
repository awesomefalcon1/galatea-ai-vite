import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function ComicFooter() {
  return (
    <footer className="border-t-2 border-cyber-blue/30 py-6 bg-cyber-dark">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Galatea 2.0 - A Cyberpunk Retelling
          </p>
          <p className="text-xs text-muted-foreground mt-1">Original myth: Pygmalion and Galatea</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-cyber-blue transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-cyber-blue transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
