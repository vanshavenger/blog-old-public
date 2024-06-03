import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <Link
        to={'/'}
        className='flex flex-col justify-center cursor-pointer'
      >
        VC-Blogs
      </Link>
      <div className='flex items-center justify-center flex-row gap-x-2'>
        <Link to={`/post-blog`}>
          <Button
            type='button'
            className='font-medium rounded-full text-white text-sm px-5 py-2.5 text-center mb-2 '
          >
            New
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback className='text-primary bg-white'>
                US
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/signup')
              }}
            >
              Logout <LogOutIcon className='ml-2' size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
