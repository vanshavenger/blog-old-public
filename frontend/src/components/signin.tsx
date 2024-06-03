import { Auth } from '@/components/auth'
import { Quote } from '@/components/quote'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const Signin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/blogs')
    }
  }, [navigate])

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div>
          <Auth type='signin' />
        </div>
        <div className='hidden lg:block'>
          <Quote />
        </div>
      </div>
    </>
  )
}
