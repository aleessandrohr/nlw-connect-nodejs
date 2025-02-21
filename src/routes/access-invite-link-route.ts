import { env } from '@/env'
import { accessInviteLink } from '@/functions/access-invite-link'
import { redis } from '@/redis/cient'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Acessar link de convite.',
        description: 'Acessar link de convite.',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referral', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
