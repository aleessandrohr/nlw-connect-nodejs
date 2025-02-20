import { subscriptions } from "@/drizzle/schema/subscriptions"

import { db } from "@/drizzle/client"

interface SubscribeToEventParams {
  name: string
  email: string
}

export const subscribeToEvent = async ({ name, email }: SubscribeToEventParams) => {
  const result = await db.insert(subscriptions).values({ name, email }).returning()
  const [subscriber] = result

  return {
    subscriberId: subscriber.id,
  }
}
