import type { FindBehavioralQuestions } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import BehavioralQuestions from 'src/components/BehavioralQuestion/BehavioralQuestions'

export const QUERY = gql`
  query FindBehavioralQuestions {
    behavioralQuestions {
      id
      question
      category
      common
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No behavioralQuestions yet. '}
      <Link to={routes.newBehavioralQuestion()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  behavioralQuestions,
}: CellSuccessProps<FindBehavioralQuestions>) => {
  return <BehavioralQuestions questions={behavioralQuestions} />
}
