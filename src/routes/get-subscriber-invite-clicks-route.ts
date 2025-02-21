import { getSubscriberInviteClicks } from '@/functions/get-subscriber-invite-clicks'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/invites/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Acessar ranking de cliques do link de convite.',
          description: 'Acessar ranking de cliques do link de convite.',
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return reply.status(200).send({ count })
      }
    )
  }
