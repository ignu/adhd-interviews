import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import BehavioralQuestionAnswerForm from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswerForm'

const CREATE_BEHAVIORAL_QUESTION_ANSWER_MUTATION = gql`
  mutation CreateBehavioralQuestionAnswerMutation($input: CreateBehavioralQuestionAnswerInput!) {
    createBehavioralQuestionAnswer(input: $input) {
      id
    }
  }
`

const NewBehavioralQuestionAnswer = () => {
  const [createBehavioralQuestionAnswer, { loading, error }] = useMutation(CREATE_BEHAVIORAL_QUESTION_ANSWER_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestionAnswer created')
      navigate(routes.behavioralQuestionAnswers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), behavioralQuestionId: parseInt(input.behavioralQuestionId), })
    createBehavioralQuestionAnswer({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New BehavioralQuestionAnswer</h2>
      </header>
      <div className="rw-segment-main">
        <BehavioralQuestionAnswerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBehavioralQuestionAnswer
