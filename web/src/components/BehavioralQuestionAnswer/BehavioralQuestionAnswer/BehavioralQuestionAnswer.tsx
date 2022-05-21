import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_BEHAVIORAL_QUESTION_ANSWER_MUTATION = gql`
  mutation DeleteBehavioralQuestionAnswerMutation($id: Int!) {
    deleteBehavioralQuestionAnswer(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BehavioralQuestionAnswer = ({ behavioralQuestionAnswer }) => {
  const [deleteBehavioralQuestionAnswer] = useMutation(DELETE_BEHAVIORAL_QUESTION_ANSWER_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestionAnswer deleted')
      navigate(routes.behavioralQuestionAnswers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete behavioralQuestionAnswer ' + id + '?')) {
      deleteBehavioralQuestionAnswer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">BehavioralQuestionAnswer {behavioralQuestionAnswer.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{behavioralQuestionAnswer.id}</td>
            </tr><tr>
              <th>Answer</th>
              <td>{behavioralQuestionAnswer.answer}</td>
            </tr><tr>
              <th>User id</th>
              <td>{behavioralQuestionAnswer.userId}</td>
            </tr><tr>
              <th>Public</th>
              <td>{checkboxInputTag(behavioralQuestionAnswer.public)}</td>
            </tr><tr>
              <th>Show user name</th>
              <td>{checkboxInputTag(behavioralQuestionAnswer.showUserName)}</td>
            </tr><tr>
              <th>Behavioral question id</th>
              <td>{behavioralQuestionAnswer.behavioralQuestionId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBehavioralQuestionAnswer({ id: behavioralQuestionAnswer.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(behavioralQuestionAnswer.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default BehavioralQuestionAnswer
