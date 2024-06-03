import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signInSchema, signUpSchema } from 'zod-medium'
import { extractMessages, hashPassword } from '../models/indes'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const result = signUpSchema.safeParse(body)
  if (!result.success) {
    return c.json(
      { message: extractMessages(JSON.parse(result.error.message))[0] },
      411
    )
  }

  const { email, password, name, image } = result.data

  const hashedPassword = await hashPassword(password)

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (userExists) {
      return c.json({ message: 'User already exists' }, 409)
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        image: image,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.text(token)
  } catch (e) {
    console.error(e)
    return c.json({ message: 'User not created' }, 403)
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const result = signInSchema.safeParse(body)
  if (!result.success) {
    return c.json(
      { message: extractMessages(JSON.parse(result.error.message))[0] },
      411
    )
  }

  const { email, password } = result.data
  const hashedPassword = await hashPassword(password)

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
        password: hashedPassword,
      },
    })

    if (!userExists) {
      return c.json({ message: 'User not found' }, 404)
    }

    const token = await sign({ id: userExists.id }, c.env.JWT_SECRET)

    return c.text(token)
  } catch (e) {
    console.error(e)
    return c.json({ message: 'User not found' }, 404)
  }
})
