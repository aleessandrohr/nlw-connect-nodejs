import { redis } from '@/redis/cient'

interface SubscribeToEventParams {
  subscriberId: string
}

export const accessInviteLink = async ({
  subscriberId,
}: SubscribeToEventParams) => {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
