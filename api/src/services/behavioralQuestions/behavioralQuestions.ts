import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const behavioralQuestions: QueryResolvers['behavioralQuestions'] =
  () => {
    return db.behavioralQuestion.findMany()
  }

export const behavioralQuestion: QueryResolvers['behavioralQuestion'] = ({
  id,
}) => {
  return db.behavioralQuestion.findUnique({
    where: { id },
  })
}

export const createBehavioralQuestion: MutationResolvers['createBehavioralQuestion'] =
  ({ input }) => {
    return db.behavioralQuestion.create({
      data: input,
    })
  }

export const updateBehavioralQuestion: MutationResolvers['updateBehavioralQuestion'] =
  ({ id, input }) => {
    return db.behavioralQuestion.update({
      data: input,
      where: { id },
    })
  }

export const deleteBehavioralQuestion: MutationResolvers['deleteBehavioralQuestion'] =
  ({ id }) => {
    return db.behavioralQuestion.delete({
      where: { id },
    })
  }
