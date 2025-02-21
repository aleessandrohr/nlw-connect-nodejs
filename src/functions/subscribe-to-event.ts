import { subscriptions } from '@/drizzle/schema/subscriptions'

import { db } from '@/drizzle/client'
import { redis } from '@/redis/cient'
import { eq } from 'drizzle-orm'

interface SubscribeToEventParams {
  name: string
  email: string
  referralId?: string | null
}

export const subscribeToEvent = async ({
  name,
  email,
  referralId,
}: SubscribeToEventParams) => {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning()
  const [subscriber] = result

  if (referralId) {
    await redis.zincrby('referral:ranking', 1, referralId)
  }

  return {
    subscriberId: subscriber.id,
  }
}
