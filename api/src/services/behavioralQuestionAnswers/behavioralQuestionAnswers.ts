import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  BehavioralQuestionAnswerResolvers,
} from 'types/graphql'

export const behavioralQuestionAnswers: QueryResolvers['behavioralQuestionAnswers'] =
  () => {
    return db.behavioralQuestionAnswer.findMany()
  }

export const behavioralQuestionAnswer: QueryResolvers['behavioralQuestionAnswer'] =
  ({ id }) => {
    return db.behavioralQuestionAnswer.findUnique({
      where: { id },
    })
  }

export const createBehavioralQuestionAnswer: MutationResolvers['createBehavioralQuestionAnswer'] =
  ({ input }) => {
    return db.behavioralQuestionAnswer.create({
      data: input,
    })
  }

export const updateBehavioralQuestionAnswer: MutationResolvers['updateBehavioralQuestionAnswer'] =
  ({ id, input }) => {
    return db.behavioralQuestionAnswer.update({
      data: input,
      where: { id },
    })
  }

export const deleteBehavioralQuestionAnswer: MutationResolvers['deleteBehavioralQuestionAnswer'] =
  ({ id }) => {
    return db.behavioralQuestionAnswer.delete({
      where: { id },
    })
  }

export const BehavioralQuestionAnswer: BehavioralQuestionAnswerResolvers = {
  user: (_obj, { root }) =>
    db.behavioralQuestionAnswer.findUnique({ where: { id: root.id } }).user(),
  behavioralQuestion: (_obj, { root }) =>
    db.behavioralQuestionAnswer
      .findUnique({ where: { id: root.id } })
      .behavioralQuestion(),
}
