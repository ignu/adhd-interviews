export const schema = gql`
  type BehavioralQuestionAnswer {
    id: Int!
    answer: String!
    userId: Int!
    user: User!
    public: Boolean!
    showUserName: Boolean!
    behavioralQuestionId: Int!
    behavioralQuestion: BehavioralQuestion!
  }

  type Query {
    behavioralQuestionAnswers: [BehavioralQuestionAnswer!]! @requireAuth
    behavioralQuestionAnswer(id: Int!): BehavioralQuestionAnswer @requireAuth
  }

  input CreateBehavioralQuestionAnswerInput {
    answer: String!
    userId: Int!
    public: Boolean!
    showUserName: Boolean!
    behavioralQuestionId: Int!
  }

  input UpdateBehavioralQuestionAnswerInput {
    answer: String
    userId: Int
    public: Boolean
    showUserName: Boolean
    behavioralQuestionId: Int
  }

  type Mutation {
    createBehavioralQuestionAnswer(
      input: CreateBehavioralQuestionAnswerInput!
    ): BehavioralQuestionAnswer! @requireAuth
    updateBehavioralQuestionAnswer(
      id: Int!
      input: UpdateBehavioralQuestionAnswerInput!
    ): BehavioralQuestionAnswer! @requireAuth
    deleteBehavioralQuestionAnswer(id: Int!): BehavioralQuestionAnswer!
      @requireAuth
  }
`
