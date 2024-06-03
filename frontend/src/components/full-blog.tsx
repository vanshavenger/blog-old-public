import { Blog } from '@/hooks/use-blog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className='flex justify-center mb-32'>
      <div className='max-w-screen-xl w-full px-10 lg:px-20'>
        <div className='pt-12'>
          <div className='flex justify-between items-center'>
            <div className='text-5xl font-extrabold'>{blog.title}</div>
          </div>
          <div className='pt-2 text-gray-600'>
            Posted on {formatDate(blog.createdAt)}
          </div>
        </div>
        <div className=' w-fit pt-4'>
          <div className='text-lg leading-relaxed'>{blog.content}</div>
        </div>
        <Separator className='mt-10' />
        <div className='flex items-center pt-10'>
          <Avatar>
            <AvatarImage src={blog.author.image} />
            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className='ml-4'>
            <div className='text-lg text-muted-foreground'>Author</div>
            <div className='text-xl font-bold'>
              {blog.author.name ?? 'Anonymous'}
            </div>
            <div className='pt-2 text-muted-foreground'>
              Random catch phrase about the author's ability to grab the user's
              attention
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
