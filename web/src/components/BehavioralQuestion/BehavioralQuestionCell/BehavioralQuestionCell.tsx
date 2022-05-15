import type { FindBehavioralQuestionById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BehavioralQuestion from 'src/components/BehavioralQuestion/BehavioralQuestion'

export const QUERY = gql`
  query FindBehavioralQuestionById($id: String!) {
    behavioralQuestion: behavioralQuestion(id: $id) {
      id
      question
      category
      common
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>BehavioralQuestion not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ behavioralQuestion }: CellSuccessProps<FindBehavioralQuestionById>) => {
  return <BehavioralQuestion behavioralQuestion={behavioralQuestion} />
}
