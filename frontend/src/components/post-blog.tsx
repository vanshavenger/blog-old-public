import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEDN_URL } from '@/config'
import { CreatePostInput, createPostSchema } from 'zod-medium'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components//ui/input'
import { Textarea } from '@/components//ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const PostBlog = () => {
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const backend_url = BACKEDN_URL

  const navigate = useNavigate()

  const handleSubmit = async (data: CreatePostInput) => {
    try {
      console.log(data)
      const response = await axios.post(`${backend_url}/api/v1/blog`, data, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      navigate(`/blog/${response.data.id}`)
      toast.success('Blog posted successfully')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='container pt-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder='How to code like vash chopra?'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      minRows={7}
                      disabled={form.formState.isSubmitting}
                      placeholder='Write an article...'
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type='submit'>
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
