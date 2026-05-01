import React from 'react'
import { NavLink } from 'react-router'

function Navbar() {
  const color = "";
  return (
    <div className="w-full flex justify-center py-4 font-mono">
      <div className="flex bg-[var(--term-panel)] border border-[var(--term-border)] rounded-md p-1 w-[90vw] lg:w-[40vw]">

        <NavLink
          to="/"
          className={({ isActive }) => `flex-1 text-center py-2 text-sm transition ${isActive ? "bg-[var(--term-green)] text-black" : "text-[var(--term-text)] hover:text-white"}`
          }
        >
          [ files ]
        </NavLink>

        <NavLink
          to="/text"
          className={({ isActive }) => `flex-1 text-center py-2 text-sm transition ${isActive ? "bg-[var(--term-green)] text-black" : "text-[var(--term-text)] hover:text-white"}`
          }
        >
          [ text ]
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar