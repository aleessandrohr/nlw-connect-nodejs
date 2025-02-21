import { env } from '@/env'
import { accessInviteLink } from '@/functions/access-invite-link'
import { getRanking } from '@/functions/get-ranking'
import { redis } from '@/redis/cient'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Acessar link de convite.',
        description: 'Acessar link de convite.',
        tags: ['referral'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const { ranking } = await getRanking()

      return reply.status(200).send({ ranking })
    }
  )
}
