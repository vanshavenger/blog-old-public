import { Skeleton } from '@/components/ui/skeleton'

export const BlogSkeleton = () => {
  return (
    <div role='status'>
      <div className='p-4 pb-4 w-screen max-w-screen-md cursor-pointer'>
        <Skeleton className='h-2 w-2 p-4 rounded-full' />
        <div className='flex'>
          <Skeleton className='h-2' />
          <Skeleton className='h-2' />
          <Skeleton className='h-2' />
          <div className='flex justify-center flex-col pl-2'>
            <Skeleton className='h-1 w-1 rounded-full' />
          </div>
          <div className='pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col'>
            <Skeleton />
          </div>
        </div>
        <div className='text-xl font-semibold pt-2'>
          <Skeleton className='h-2' />
        </div>
        <div className='text-md font-thin'>
          <Skeleton className='h-2' />
        </div>
        <div className='text-slate-500 text-sm font-thin pt-4'>
          <Skeleton className='h-2' />
        </div>
      </div>
    </div>
  )
}
