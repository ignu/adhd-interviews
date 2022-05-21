import type { FindBehavioralQuestionAnswers } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import BehavioralQuestionAnswers from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswers'

export const QUERY = gql`
  query FindBehavioralQuestionAnswers {
    behavioralQuestionAnswers {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No behavioralQuestionAnswers yet. '}
      <Link
        to={routes.newBehavioralQuestionAnswer()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ behavioralQuestionAnswers }: CellSuccessProps<FindBehavioralQuestionAnswers>) => {
  return <BehavioralQuestionAnswers behavioralQuestionAnswers={behavioralQuestionAnswers} />
}
