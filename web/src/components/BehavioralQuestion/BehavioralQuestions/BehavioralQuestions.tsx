import { BehavioralQuestion } from 'types/graphql'
import ReactMarkdown from 'react-markdown'
import NewBehavioralQuestionAnswer from 'src/components/BehavioralQuestionAnswer/NewBehavioralQuestionAnswer'

const BehavioralQuestionsList = ({
  questions,
}: {
  questions: BehavioralQuestion[]
}) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive p-4 mb-4">
      {questions.map((behavioralQuestion) => (
        <div>
          <h2>
            <ReactMarkdown>{behavioralQuestion.question}</ReactMarkdown>
          </h2>
          <NewBehavioralQuestionAnswer />
        </div>
      ))}
    </div>
  )
}

export default BehavioralQuestionsList
