export const schema = gql`
  type BehavioralQuestion {
    id: String!
    question: String!
    category: BehavioralQuestionCategory!
    common: Boolean!
  }

  enum BehavioralQuestionCategory {
    ACTION_ORIENTED
    ADAPTIVE
    COMMUNICATION
    CONFLICT
    CREATIVITY
    DECISION_MAKING
    HANDLING_PRESSURE
    PROBLEM_SOLVING
    TEAMWORK
  }

  type Query {
    behavioralQuestions: [BehavioralQuestion!]! @requireAuth
    behavioralQuestion(id: String!): BehavioralQuestion @requireAuth
  }

  input CreateBehavioralQuestionInput {
    question: String!
    category: BehavioralQuestionCategory!
    common: Boolean!
  }

  input UpdateBehavioralQuestionInput {
    question: String
    category: BehavioralQuestionCategory
    common: Boolean
  }

  type Mutation {
    createBehavioralQuestion(
      input: CreateBehavioralQuestionInput!
    ): BehavioralQuestion! @requireAuth
    updateBehavioralQuestion(
      id: String!
      input: UpdateBehavioralQuestionInput!
    ): BehavioralQuestion! @requireAuth
    deleteBehavioralQuestion(id: String!): BehavioralQuestion! @requireAuth
  }
`
