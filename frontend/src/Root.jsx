import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router'
import { Analytics } from '@vercel/analytics/react'

function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020403]">
      <Navbar />

      <main className="flex-1 overflow-auto flex justify-center p-2">
        <Outlet />
      </main>

      <Analytics />
    </div>
  )
}

export default Root