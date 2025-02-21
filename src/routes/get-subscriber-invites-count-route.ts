import { getSubscriberInvitesCount } from '@/functions/get-subscriber-invites-count'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Acessar contagem de convites do link de convite.',
          description: 'Acessar contagem de convites do link de convite.',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return reply.status(200).send({ count })
      }
    )
  }
