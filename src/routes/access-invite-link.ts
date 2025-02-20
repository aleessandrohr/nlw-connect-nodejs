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
          201: z.object({
            subscriberId: z.string(),
          }),
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

export const getReferralAccessCountRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId/referrals/access-count',
    {
      schema: {
        summary: 'Acessar contagem de acessos do link de convite.',
        description: 'Acessar contagem de acessos do link de convite.',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            accessCount: z.string().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      const accessCount = await redis.hget('referral:access-count', subscriberId)

      return reply.status(200).send({ accessCount })
    }
  )
}
