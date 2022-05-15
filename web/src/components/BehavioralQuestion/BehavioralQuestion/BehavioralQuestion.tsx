import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_BEHAVIORAL_QUESTION_MUTATION = gql`
  mutation DeleteBehavioralQuestionMutation($id: String!) {
    deleteBehavioralQuestion(id: $id) {
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

const BehavioralQuestion = ({ behavioralQuestion }) => {
  const [deleteBehavioralQuestion] = useMutation(DELETE_BEHAVIORAL_QUESTION_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestion deleted')
      navigate(routes.behavioralQuestions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete behavioralQuestion ' + id + '?')) {
      deleteBehavioralQuestion({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">BehavioralQuestion {behavioralQuestion.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{behavioralQuestion.id}</td>
            </tr><tr>
              <th>Question</th>
              <td>{behavioralQuestion.question}</td>
            </tr><tr>
              <th>Category</th>
              <td>{formatEnum(behavioralQuestion.category)}</td>
            </tr><tr>
              <th>Common</th>
              <td>{checkboxInputTag(behavioralQuestion.common)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBehavioralQuestion({ id: behavioralQuestion.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(behavioralQuestion.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default BehavioralQuestion
