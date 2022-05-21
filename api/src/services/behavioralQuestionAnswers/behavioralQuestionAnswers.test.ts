import {
  behavioralQuestionAnswers,
  behavioralQuestionAnswer,
  createBehavioralQuestionAnswer,
  updateBehavioralQuestionAnswer,
  deleteBehavioralQuestionAnswer,
} from './behavioralQuestionAnswers'
import type { StandardScenario } from './behavioralQuestionAnswers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('behavioralQuestionAnswers', () => {
  scenario(
    'returns all behavioralQuestionAnswers',
    async (scenario: StandardScenario) => {
      const result = await behavioralQuestionAnswers()

      expect(result.length).toEqual(
        Object.keys(scenario.behavioralQuestionAnswer).length
      )
    }
  )

  scenario(
    'returns a single behavioralQuestionAnswer',
    async (scenario: StandardScenario) => {
      const result = await behavioralQuestionAnswer({
        id: scenario.behavioralQuestionAnswer.one.id,
      })

      expect(result).toEqual(scenario.behavioralQuestionAnswer.one)
    }
  )

  scenario(
    'creates a behavioralQuestionAnswer',
    async (scenario: StandardScenario) => {
      const result = await createBehavioralQuestionAnswer({
        input: {
          answer: 'String',
          userId: scenario.behavioralQuestionAnswer.two.userId,
          behavioralQuestionId:
            scenario.behavioralQuestionAnswer.two.behavioralQuestionId,
        },
      })

      expect(result.answer).toEqual('String')
      expect(result.userId).toEqual(
        scenario.behavioralQuestionAnswer.two.userId
      )
      expect(result.behavioralQuestionId).toEqual(
        scenario.behavioralQuestionAnswer.two.behavioralQuestionId
      )
    }
  )

  scenario(
    'updates a behavioralQuestionAnswer',
    async (scenario: StandardScenario) => {
      const original = await behavioralQuestionAnswer({
        id: scenario.behavioralQuestionAnswer.one.id,
      })
      const result = await updateBehavioralQuestionAnswer({
        id: original.id,
        input: { answer: 'String2' },
      })

      expect(result.answer).toEqual('String2')
    }
  )

  scenario(
    'deletes a behavioralQuestionAnswer',
    async (scenario: StandardScenario) => {
      const original = await deleteBehavioralQuestionAnswer({
        id: scenario.behavioralQuestionAnswer.one.id,
      })
      const result = await behavioralQuestionAnswer({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
