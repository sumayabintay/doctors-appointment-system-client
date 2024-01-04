import React from 'react'
import Navbar from '../Pages/Shared/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer'

export default function Main() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
