import { Outlet } from "react-router-dom"
import { Navbar } from "@components/navbar"

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="scan-line"></div>
      <main className="min-h-screen flex flex-col pt-16">
        <Outlet />
      </main>
    </>
  )
}
