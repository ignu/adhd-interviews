import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BehavioralQuestionCreateArgs>({
  behavioralQuestion: {
    one: { data: { question: 'String', category: 'ACTION_ORIENTED' } },
    two: { data: { question: 'String', category: 'ACTION_ORIENTED' } },
  },
})

export type StandardScenario = typeof standard
