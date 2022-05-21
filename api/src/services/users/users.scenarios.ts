import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String5336514',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'String',
      },
    },
    two: {
      data: {
        email: 'String3758348',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
