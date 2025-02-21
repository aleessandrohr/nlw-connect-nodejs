import { redis } from '@/redis/cient'

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export const getSubscriberInvitesCount = async ({
  subscriberId,
}: GetSubscriberInvitesCountParams) => {
  const accessCount = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: accessCount ? Number.parseInt(accessCount) : 0,
  }
}
