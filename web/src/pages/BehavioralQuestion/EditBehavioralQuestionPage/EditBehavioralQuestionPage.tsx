import EditBehavioralQuestionCell from 'src/components/BehavioralQuestion/EditBehavioralQuestionCell'

type BehavioralQuestionPageProps = {
  id: string
}

const EditBehavioralQuestionPage = ({ id }: BehavioralQuestionPageProps) => {
  return <EditBehavioralQuestionCell id={id} />
}

export default EditBehavioralQuestionPage
