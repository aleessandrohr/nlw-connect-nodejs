import { redis } from '@/redis/cient'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export const getSubscriberRankingPosition = async ({
  subscriberId,
}: GetSubscriberRankingPositionParams) => {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return {
      position: null,
    }
  }

  return {
    position: rank + 1,
  }
}
