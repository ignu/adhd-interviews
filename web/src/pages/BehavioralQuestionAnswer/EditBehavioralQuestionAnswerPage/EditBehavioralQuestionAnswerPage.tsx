import EditBehavioralQuestionAnswerCell from 'src/components/BehavioralQuestionAnswer/EditBehavioralQuestionAnswerCell'

type BehavioralQuestionAnswerPageProps = {
  id: number
}

const EditBehavioralQuestionAnswerPage = ({ id }: BehavioralQuestionAnswerPageProps) => {
  return <EditBehavioralQuestionAnswerCell id={id} />
}

export default EditBehavioralQuestionAnswerPage
