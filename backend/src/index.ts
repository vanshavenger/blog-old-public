import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.use('/api/*', cors())

app.use('/api/v1/blog/*', async (c, next) => {
  const bearer = c.req.header('Authorization')
  if (!bearer) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const token = bearer.split(' ')[1]
  if (!token) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  try {
    const payload = await verify(token, c.env?.JWT_SECRET)
    if (!payload) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    c.set('userId', payload.id as string)
    await next()
  } catch (e) {
    console.error(e)
    return c.json({ message: 'Unauthorized' }, 401)
  }
})

app.route('/api/v1/user', userRouter)

app.route('/api/v1/blog', blogRouter)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
