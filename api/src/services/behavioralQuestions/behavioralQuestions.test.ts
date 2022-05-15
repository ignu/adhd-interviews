import {
  behavioralQuestions,
  behavioralQuestion,
  createBehavioralQuestion,
  updateBehavioralQuestion,
  deleteBehavioralQuestion,
} from './behavioralQuestions'
import type { StandardScenario } from './behavioralQuestions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('behavioralQuestions', () => {
  scenario(
    'returns all behavioralQuestions',
    async (scenario: StandardScenario) => {
      const result = await behavioralQuestions()

      expect(result.length).toEqual(
        Object.keys(scenario.behavioralQuestion).length
      )
    }
  )

  scenario(
    'returns a single behavioralQuestion',
    async (scenario: StandardScenario) => {
      const result = await behavioralQuestion({
        id: scenario.behavioralQuestion.one.id,
      })

      expect(result).toEqual(scenario.behavioralQuestion.one)
    }
  )

  scenario('creates a behavioralQuestion', async () => {
    const result = await createBehavioralQuestion({
      input: { question: 'String', category: 'ACTION_ORIENTED' },
    })

    expect(result.question).toEqual('String')
    expect(result.category).toEqual('ACTION_ORIENTED')
  })

  scenario(
    'updates a behavioralQuestion',
    async (scenario: StandardScenario) => {
      const original = await behavioralQuestion({
        id: scenario.behavioralQuestion.one.id,
      })
      const result = await updateBehavioralQuestion({
        id: original.id,
        input: { question: 'String2' },
      })

      expect(result.question).toEqual('String2')
    }
  )

  scenario(
    'deletes a behavioralQuestion',
    async (scenario: StandardScenario) => {
      const original = await deleteBehavioralQuestion({
        id: scenario.behavioralQuestion.one.id,
      })
      const result = await behavioralQuestion({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
