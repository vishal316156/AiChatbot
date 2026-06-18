import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'



const App = () => {

  const {user, authLoading} = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  if (authLoading) {
  return <Loading />
  }
  if(pathname =='/loading') return <Loading/>

  return (
    <>

    {!isMenuOpen && (<img src={assets.menu_icon} 
      className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={()=> setIsMenuOpen(true)} /> ) }

      {user ? (<div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen = {isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/" element={<ChatBox />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>
    </div>) : (
  <Routes>
    <Route
      path="/"
      element={
        <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
          <Login />
        </div>
      }
    />

    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
)}
    </>
  ) 
}

export default App
