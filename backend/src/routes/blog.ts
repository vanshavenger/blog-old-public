import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { createPostSchema, updatePostSchema } from 'zod-medium'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
  Variables: {
    userId: string
  }
}>()

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const result = createPostSchema.safeParse(body)
  if (!result.success) {
    return c.json({ message: 'Invalid input' }, 411)
  }

  const { title, content } = result.data
  const authorId = c.get('userId')

  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
        createdAt: new Date(),
      },
    })
    return c.json({ id: post.id })
  } catch (e) {
    console.error(e)
    return c.json({ message: 'Post not created' }, 403)
  }
})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const authorId = c.get('userId')
  const result = updatePostSchema.safeParse(body)
  if (!result.success) {
    return c.json({ message: 'Invalid input' }, 411)
  }
  const { id, title, content } = result.data

  try {
    const postExists = await prisma.post.findFirst({
      where: {
        id: id,
        authorId: authorId,
      },
    })

    if (!postExists) {
      return c.json({ message: 'Post not found' }, 404)
    }

    const post = await prisma.post.update({
      where: {
        id: id,
        authorId: authorId,
      },
      data: {
        title: title,
        content: content,
        updatedAt: new Date(),
      },
    })
    return c.json({ message: 'Blog updated' })
  } catch (e) {
    console.error(e)
    return c.json({ message: 'Post not updated' }, 403)
  }
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    })
    return c.json(posts)
  } catch (e) {
    console.error(e)
    return c.json({ message: 'Posts not found' }, 404)
  }
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.req.param('id')

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    })
    return c.json(post)
  } catch (e) {
    console.error(e)
    return c.json({ message: 'Post not found' }, 404)
  }
})
