import { useParams } from 'react-router-dom'
import { useBlog } from '@/hooks/use-blog'
import { FullBlog } from '@/components/full-blog'
import { Spinner } from '@/components/spinner'

export const Blog = () => {
  const { id } = useParams()
  const { loading, blog } = useBlog({
    id: id ?? '',
  })

  if (loading || !blog) {
    return (
      <>
        <div className='h-screen flex flex-col justify-center'>
          <div className='flex justify-center'>
            <Spinner />
          </div>
        </div>
      </>
    )
  }
  return <FullBlog blog={blog} />
}
