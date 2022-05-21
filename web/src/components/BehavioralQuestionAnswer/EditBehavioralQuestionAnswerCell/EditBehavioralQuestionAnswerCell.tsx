import type { EditBehavioralQuestionAnswerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import BehavioralQuestionAnswerForm from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswerForm'

export const QUERY = gql`
  query EditBehavioralQuestionAnswerById($id: Int!) {
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
const UPDATE_BEHAVIORAL_QUESTION_ANSWER_MUTATION = gql`
  mutation UpdateBehavioralQuestionAnswerMutation($id: Int!, $input: UpdateBehavioralQuestionAnswerInput!) {
    updateBehavioralQuestionAnswer(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ behavioralQuestionAnswer }: CellSuccessProps<EditBehavioralQuestionAnswerById>) => {
  const [updateBehavioralQuestionAnswer, { loading, error }] = useMutation(UPDATE_BEHAVIORAL_QUESTION_ANSWER_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestionAnswer updated')
      navigate(routes.behavioralQuestionAnswers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), behavioralQuestionId: parseInt(input.behavioralQuestionId), })
    updateBehavioralQuestionAnswer({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit BehavioralQuestionAnswer {behavioralQuestionAnswer.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BehavioralQuestionAnswerForm behavioralQuestionAnswer={behavioralQuestionAnswer} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
