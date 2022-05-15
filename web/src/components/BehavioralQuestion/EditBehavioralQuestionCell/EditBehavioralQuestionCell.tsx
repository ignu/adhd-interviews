import type { EditBehavioralQuestionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import BehavioralQuestionForm from 'src/components/BehavioralQuestion/BehavioralQuestionForm'

export const QUERY = gql`
  query EditBehavioralQuestionById($id: String!) {
    behavioralQuestion: behavioralQuestion(id: $id) {
      id
      question
      category
      common
    }
  }
`
const UPDATE_BEHAVIORAL_QUESTION_MUTATION = gql`
  mutation UpdateBehavioralQuestionMutation($id: String!, $input: UpdateBehavioralQuestionInput!) {
    updateBehavioralQuestion(id: $id, input: $input) {
      id
      question
      category
      common
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ behavioralQuestion }: CellSuccessProps<EditBehavioralQuestionById>) => {
  const [updateBehavioralQuestion, { loading, error }] = useMutation(UPDATE_BEHAVIORAL_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestion updated')
      navigate(routes.behavioralQuestions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateBehavioralQuestion({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit BehavioralQuestion {behavioralQuestion.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BehavioralQuestionForm behavioralQuestion={behavioralQuestion} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
