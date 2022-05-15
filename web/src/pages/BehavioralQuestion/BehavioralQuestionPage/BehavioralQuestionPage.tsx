import BehavioralQuestionCell from 'src/components/BehavioralQuestion/BehavioralQuestionCell'

type BehavioralQuestionPageProps = {
  id: string
}

const BehavioralQuestionPage = ({ id }: BehavioralQuestionPageProps) => {
  return <BehavioralQuestionCell id={id} />
}

export default BehavioralQuestionPage
