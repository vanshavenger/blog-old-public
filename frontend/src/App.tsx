import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from '@/components/signup'
import { Signin } from '@/components/signin'
import { Blog } from '@/components/blog'
import { Home } from '@/components/home'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Blogs } from '@//components/blogs'
import { PostBlog } from '@/components/post-blog'
import Layout from '@/components/layout'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/blog/:id' element={<Blog />} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/post-blog' element={<PostBlog />} />
            </Route>

            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors closeButton />
      </ThemeProvider>
    </>
  )
}

export default App
