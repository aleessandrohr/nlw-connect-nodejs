import { getSubscriberRankingPosition } from '@/functions/get-subscriber-ranking-position'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Acessar posição do link de convite.',
          description: 'Acessar posição do link de convite.',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return reply.status(200).send({ position })
      }
    )
  }
