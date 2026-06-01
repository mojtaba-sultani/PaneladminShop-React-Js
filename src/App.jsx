import React from 'react'
import './App.css'
import { useRoutes } from 'react-router'
import routes from './routes'
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import { ThemeProvider } from './Contexts/ThemeContext'
export default function App() {
  let Router = useRoutes(routes)
  return (
    <ThemeProvider>
      <Header />
      <div className='flex relative min-h-screen'>
        <Sidebar />
        <div className='w-full bg-bgBody'>
          {Router}
        </div>
      </div>
    </ThemeProvider>
  )
}
