import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { signUpSchema } from 'zod-medium'
import { toast } from 'sonner'
import { BACKEDN_URL } from '@/config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'
import { CardWrapper } from '@/components/card-wrapper'

import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate()
  const [iamgePreviw, setImagePreview] = useState<string | undefined>(undefined)

  const backend_url = BACKEDN_URL

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: undefined,
    },
  })

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (!file.type.includes('image/')) {
          toast.error('Invalid file type', {
            description: 'Please upload an image file',
          })
          return
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error('File size too large', {
            description: 'Please upload a file less than 5MB',
          })
          return
        }
        try {
          const base64 = await convertToBase64(file)
          form.setValue('image', base64)
          setImagePreview(base64)
        } catch (e) {
          toast.error('Error uploading image', {
            description: 'Please try again',
          })
        }
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        data
      )
      const jwt = response.data
      localStorage.setItem('token', `Bearer ${jwt}`)
      navigate('/')
      toast.success('Logged in successfully')
    } catch (e) {
      toast.error('Invalid credentials', {
        description: 'Please check your credentials and try again',
      })
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <CardWrapper
        headerLabel={type === 'signup' ? 'Register yourself!' : 'Welcome back!'}
        backButtonLabel={
          type === 'signup'
            ? 'Already have an account?'
            : 'Don’t have an account?'
        }
        backButtonHref={type === 'signup' ? '/signin' : '/signup'}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
            noValidate
          >
            <div className='space-y-4'>
              {type === 'signup' && (
                <div>
                  <FormField
                    control={form.control}
                    name='name'
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={form.formState.isSubmitting}
                              placeholder='John Doe'
                              type='text'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='image'
                    disabled={form.formState.isSubmitting}
                    render={() => {
                      return (
                        <FormItem className='flex-1'>
                          <FormLabel>Profile Picture</FormLabel>
                          <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-md p-4 flex cursor-pointer ${
                              isDragActive ? 'bg-primary' : 'bg-gray-100'
                            }`}
                          >
                            <Input {...getInputProps()} />
                            {isDragActive ? (
                              <p className='text-white'>
                                Drop the image here ...
                              </p>
                            ) : (
                              <p>
                                Drag 'n' drop some image here, or click to
                                select one
                              </p>
                            )}
                            {iamgePreviw && (
                              <div className='mt-4'>
                                <img
                                  src={iamgePreviw}
                                  alt='preview'
                                  className='w-20 h-20 object-cover rounded-full'
                                />
                              </div>
                            )}
                          </div>
                          <FormDescription>
                            Image should be less than 5MB and in PNG, JPEG, JPG
                            format
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name='email'
                disabled={form.formState.isSubmitting}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={form.formState.isSubmitting}
                          placeholder='example@gexample.com'
                          type='email'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='password'
                disabled={form.formState.isSubmitting}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          {...field}
                          placeholder='********'
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {type === 'signup' ? 'Sign up' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
