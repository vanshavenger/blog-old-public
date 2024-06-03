import { useBlogs } from '@/hooks/use-blog'
import { BlogCard } from '@/components/blog-card'
import { BlogSkeleton } from '@/components/blog-skeleton'

export const Blogs = () => {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return (
      <div>
        <div className='flex justify-center'>
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  console.log(blogs)

  return (
    <>
      <div className='flex justify-center pt-12'>
        <div className='space-y-4'>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name ?? 'Anonymous'}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.createdAt}
              authorImage={blog.author.image}
            />
          ))}
        </div>
      </div>
    </>
  )
}
