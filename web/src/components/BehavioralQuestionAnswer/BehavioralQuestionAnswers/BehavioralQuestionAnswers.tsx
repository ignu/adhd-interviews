import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswersCell'

const DELETE_BEHAVIORAL_QUESTION_ANSWER_MUTATION = gql`
  mutation DeleteBehavioralQuestionAnswerMutation($id: Int!) {
    deleteBehavioralQuestionAnswer(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const BehavioralQuestionAnswersList = ({ behavioralQuestionAnswers }) => {
  const [deleteBehavioralQuestionAnswer] = useMutation(DELETE_BEHAVIORAL_QUESTION_ANSWER_MUTATION, {
    onCompleted: () => {
      toast.success('BehavioralQuestionAnswer deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete behavioralQuestionAnswer ' + id + '?')) {
      deleteBehavioralQuestionAnswer({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Answer</th>
            <th>User id</th>
            <th>Public</th>
            <th>Show user name</th>
            <th>Behavioral question id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {behavioralQuestionAnswers.map((behavioralQuestionAnswer) => (
            <tr key={behavioralQuestionAnswer.id}>
              <td>{truncate(behavioralQuestionAnswer.id)}</td>
              <td>{truncate(behavioralQuestionAnswer.answer)}</td>
              <td>{truncate(behavioralQuestionAnswer.userId)}</td>
              <td>{checkboxInputTag(behavioralQuestionAnswer.public)}</td>
              <td>{checkboxInputTag(behavioralQuestionAnswer.showUserName)}</td>
              <td>{truncate(behavioralQuestionAnswer.behavioralQuestionId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.behavioralQuestionAnswer({ id: behavioralQuestionAnswer.id })}
                    title={'Show behavioralQuestionAnswer ' + behavioralQuestionAnswer.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBehavioralQuestionAnswer({ id: behavioralQuestionAnswer.id })}
                    title={'Edit behavioralQuestionAnswer ' + behavioralQuestionAnswer.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete behavioralQuestionAnswer ' + behavioralQuestionAnswer.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(behavioralQuestionAnswer.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BehavioralQuestionAnswersList
