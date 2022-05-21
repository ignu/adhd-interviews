import type { Prisma } from '@prisma/client'

export const standard =
  defineScenario<Prisma.BehavioralQuestionAnswerCreateArgs>({
    behavioralQuestionAnswer: {
      one: {
        data: {
          answer: 'String',
          user: {
            create: {
              email: 'String6427775',
              hashedPassword: 'String',
              salt: 'String',
            },
          },
          behavioralQuestion: {
            create: { question: 'String', category: 'ACTION_ORIENTED' },
          },
        },
      },
      two: {
        data: {
          answer: 'String',
          user: {
            create: {
              email: 'String9028572',
              hashedPassword: 'String',
              salt: 'String',
            },
          },
          behavioralQuestion: {
            create: { question: 'String', category: 'ACTION_ORIENTED' },
          },
        },
      },
    },
  })

export type StandardScenario = typeof standard
