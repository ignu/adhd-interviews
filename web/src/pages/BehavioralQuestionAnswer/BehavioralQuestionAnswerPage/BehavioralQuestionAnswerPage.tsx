import BehavioralQuestionAnswerCell from 'src/components/BehavioralQuestionAnswer/BehavioralQuestionAnswerCell'

type BehavioralQuestionAnswerPageProps = {
  id: number
}

const BehavioralQuestionAnswerPage = ({ id }: BehavioralQuestionAnswerPageProps) => {
  return <BehavioralQuestionAnswerCell id={id} />
}

export default BehavioralQuestionAnswerPage
