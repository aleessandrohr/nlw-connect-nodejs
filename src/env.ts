import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = envSchema.parse({
  PORT: process.env.PORT,
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL,
  WEB_URL: process.env.WEB_URL,
})
