import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  authorName: string
  title: string
  content: string
  publishedDate: string
  id: number
  authorImage: string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  authorImage,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className='block'>
      <div className='p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-screen-md mx-auto cursor-pointer'>
        <div className='flex items-center mb-4'>
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>{authorName[0]}</AvatarFallback>
          </Avatar>
          <div className='ml-3'>
            <div className='text-sm font-semibold text-muted-foreground'>
              {authorName}
            </div>
            <div className='text-sm text-gray-500'>
              {formatDate(publishedDate)}
            </div>
          </div>
        </div>
        <div className='mb-2'>
          <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
        <div className='text-muted-foreground mb-4'>
          {content.slice(0, 100) + '...'}
        </div>
        <div className='text-gray-500 text-sm'>{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  )
}
