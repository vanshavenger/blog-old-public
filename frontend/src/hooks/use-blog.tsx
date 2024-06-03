import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEDN_URL } from '@/config'

export interface Blog {
  content: string
  title: string
  id: number
  author: {
    name: string
    email: string
    image: string
  }
  createdAt: string
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
    axios
      .get(`${BACKEDN_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlog(response.data)
        setLoading(false)
      })
  }, [id])

  return {
    loading,
    blog,
  }
}
export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios
      .get(`${BACKEDN_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlogs(response.data)
        setLoading(false)
      })
  }, [])

  return {
    loading,
    blogs,
  }
}
