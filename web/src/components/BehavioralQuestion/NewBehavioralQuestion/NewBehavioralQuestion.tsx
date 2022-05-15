import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import BehavioralQuestionForm from 'src/components/BehavioralQuestion/BehavioralQuestionForm'

const CREATE_BEHAVIORAL_QUESTION_MUTATION = gql`
  mutation CreateBehavioralQuestionMutation($input: CreateBehavioralQuestionInput!) {
    createBehavioralQuestion(input: $input) {
      id
    }
  }
`

const NewBehavioralQuestion = () => {
  const [createBehavioralQuestion, { loading, error }] = useMutation(CREATE_BEHAVIORAL_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestion created')
      navigate(routes.behavioralQuestions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createBehavioralQuestion({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New BehavioralQuestion</h2>
      </header>
      <div className="rw-segment-main">
        <BehavioralQuestionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBehavioralQuestion
