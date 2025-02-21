import { redis } from '@/redis/cient'

interface GetSubscriberInviteClickParams {
  subscriberId: string
}

export const getSubscriberInviteClicks = async ({
  subscriberId,
}: GetSubscriberInviteClickParams) => {
  const accessCount = await redis.hget('referral:access-count', subscriberId)

  return {
    count: accessCount ? Number.parseInt(accessCount) : 0,
  }
}
