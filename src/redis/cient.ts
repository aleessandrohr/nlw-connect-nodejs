import { env } from '@/env'
import { Redis as RedisUpstash } from '@upstash/redis'

const redis = new RedisUpstash({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
})

export { redis }
