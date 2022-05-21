import type { FindBehavioralQuestionAnswerById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BehavioralQuestionAnswer from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswer'

export const QUERY = gql`
  query FindBehavioralQuestionAnswerById($id: Int!) {
    behavioralQuestionAnswer: behavioralQuestionAnswer(id: $id) {
      id
      answer
      userId
      public
      showUserName
      behavioralQuestionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>BehavioralQuestionAnswer not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ behavioralQuestionAnswer }: CellSuccessProps<FindBehavioralQuestionAnswerById>) => {
  return <BehavioralQuestionAnswer behavioralQuestionAnswer={behavioralQuestionAnswer} />
}
