import { BehavioralQuestion } from 'types/graphql'
import ReactMarkdown from 'react-markdown'

const BehavioralQuestionsList = ({
  questions,
}: {
  questions: BehavioralQuestion[]
}) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive p-4 mb-4">
      {questions.map((behavioralQuestion) => (
        <h2>
          <ReactMarkdown>{behavioralQuestion.question}</ReactMarkdown>
        </h2>
      ))}
    </div>
  )
}

export default BehavioralQuestionsList
