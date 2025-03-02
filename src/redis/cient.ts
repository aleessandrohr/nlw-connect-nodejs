import { env } from '@/env'
import { Redis as RedisUpstash } from '@upstash/redis'
import { Redis } from 'ioredis'

let redis: Redis | RedisUpstash

if (process.env.NODE_ENV === 'production') {
  redis = new RedisUpstash({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
  })
}

if (process.env.NODE_ENV === 'development') {
  redis = new Redis(env.REDIS_URL)
}

export { redis }
