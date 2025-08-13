import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import path from 'path'
import Navbar from './components/Navbar.jsx'
import Fpick from './components/Fpick.jsx'
import Nofile from './components/Nofile.jsx'
const router=createBrowserRouter([{
  path:'/',
  element:<Root/>,
  children:[
    {
    path:'',
    element:<Fpick/>
    },
    {
      path:'/text',
      element:<Nofile/>
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
