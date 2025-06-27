import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="scan-line"></div>
      <main className="min-h-screen flex flex-col pt-16">
        <Outlet />
        <Footer />
      </main>
    </>
  )
}
