import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router'
// 1. Import the Analytics component
import { Analytics } from '@vercel/analytics/react'

function Root() {
  return (
    <div className='w-screen h-screen bg-gray-100 py-[1vh]'>
      <Navbar />
      <div className='flex w-screen justify-center items-center'>
        <Outlet/>
      </div>
      
      {/* 2. Add the Analytics component here */}
      <Analytics />
    </div>
  )
}

export default Root