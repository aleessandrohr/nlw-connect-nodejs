import { subscribeToEvent } from '@/functions/subscribe-to-event'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Inscreva-se em um evento.',
        description: 'Inscreva-se em um evento.',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({ name, email })

      return reply.status(201).send({ subscriberId })
    }
  )
}
