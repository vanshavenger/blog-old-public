import { Outlet, useNavigate } from 'react-router'
import { Navbar } from '@/components/navbar'
import { useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/signin')
    }
  }, [navigate])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
