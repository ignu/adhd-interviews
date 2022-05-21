export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type BehavioralQuestion = {
  __typename?: 'BehavioralQuestion';
  category: BehavioralQuestionCategory;
  common: Scalars['Boolean'];
  id: Scalars['String'];
  question: Scalars['String'];
};

export type BehavioralQuestionAnswer = {
  __typename?: 'BehavioralQuestionAnswer';
  answer: Scalars['String'];
  behavioralQuestion: BehavioralQuestion;
  behavioralQuestionId: Scalars['Int'];
  id: Scalars['Int'];
  public: Scalars['Boolean'];
  showUserName: Scalars['Boolean'];
  user: User;
  userId: Scalars['Int'];
};

export type BehavioralQuestionCategory =
  | 'ACTION_ORIENTED'
  | 'ADAPTIVE'
  | 'COMMUNICATION'
  | 'CONFLICT'
  | 'CREATIVITY'
  | 'DECISION_MAKING'
  | 'HANDLING_PRESSURE'
  | 'PROBLEM_SOLVING'
  | 'TEAMWORK';

export type CreateBehavioralQuestionAnswerInput = {
  answer: Scalars['String'];
  behavioralQuestionId: Scalars['Int'];
  public: Scalars['Boolean'];
  showUserName: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type CreateBehavioralQuestionInput = {
  category: BehavioralQuestionCategory;
  common: Scalars['Boolean'];
  question: Scalars['String'];
};

export type CreateUserInput = {
  admin: Scalars['Boolean'];
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles: Scalars['String'];
  salt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBehavioralQuestion: BehavioralQuestion;
  createBehavioralQuestionAnswer: BehavioralQuestionAnswer;
  createUser: User;
  deleteBehavioralQuestion: BehavioralQuestion;
  deleteBehavioralQuestionAnswer: BehavioralQuestionAnswer;
  deleteUser: User;
  updateBehavioralQuestion: BehavioralQuestion;
  updateBehavioralQuestionAnswer: BehavioralQuestionAnswer;
  updateUser: User;
};


export type MutationcreateBehavioralQuestionArgs = {
  input: CreateBehavioralQuestionInput;
};


export type MutationcreateBehavioralQuestionAnswerArgs = {
  input: CreateBehavioralQuestionAnswerInput;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationdeleteBehavioralQuestionArgs = {
  id: Scalars['String'];
};


export type MutationdeleteBehavioralQuestionAnswerArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationupdateBehavioralQuestionArgs = {
  id: Scalars['String'];
  input: UpdateBehavioralQuestionInput;
};


export type MutationupdateBehavioralQuestionAnswerArgs = {
  id: Scalars['Int'];
  input: UpdateBehavioralQuestionAnswerInput;
};


export type MutationupdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  behavioralQuestion?: Maybe<BehavioralQuestion>;
  behavioralQuestionAnswer?: Maybe<BehavioralQuestionAnswer>;
  behavioralQuestionAnswers: Array<BehavioralQuestionAnswer>;
  behavioralQuestions: Array<BehavioralQuestion>;
  redwood?: Maybe<Redwood>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QuerybehavioralQuestionArgs = {
  id: Scalars['String'];
};


export type QuerybehavioralQuestionAnswerArgs = {
  id: Scalars['Int'];
};


export type QueryuserArgs = {
  id: Scalars['Int'];
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UpdateBehavioralQuestionAnswerInput = {
  answer?: InputMaybe<Scalars['String']>;
  behavioralQuestionId?: InputMaybe<Scalars['Int']>;
  public?: InputMaybe<Scalars['Boolean']>;
  showUserName?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateBehavioralQuestionInput = {
  category?: InputMaybe<BehavioralQuestionCategory>;
  common?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  admin?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  hashedPassword?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean'];
  answers: Array<Maybe<BehavioralQuestionAnswer>>;
  email: Scalars['String'];
  hashedPassword: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiresAt?: Maybe<Scalars['DateTime']>;
  roles?: Maybe<Scalars['String']>;
  salt: Scalars['String'];
};

export type DeleteBehavioralQuestionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBehavioralQuestionMutation = { __typename?: 'Mutation', deleteBehavioralQuestion: { __typename?: 'BehavioralQuestion', id: string } };

export type FindBehavioralQuestionByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindBehavioralQuestionById = { __typename?: 'Query', behavioralQuestion?: { __typename?: 'BehavioralQuestion', id: string, question: string, category: BehavioralQuestionCategory, common: boolean } | null };

export type FindBehavioralQuestionsVariables = Exact<{ [key: string]: never; }>;


export type FindBehavioralQuestions = { __typename?: 'Query', behavioralQuestions: Array<{ __typename?: 'BehavioralQuestion', id: string, question: string, category: BehavioralQuestionCategory, common: boolean }> };

export type EditBehavioralQuestionByIdVariables = Exact<{
  id: Scalars['String'];
}>;


export type EditBehavioralQuestionById = { __typename?: 'Query', behavioralQuestion?: { __typename?: 'BehavioralQuestion', id: string, question: string, category: BehavioralQuestionCategory, common: boolean } | null };

export type UpdateBehavioralQuestionMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateBehavioralQuestionInput;
}>;


export type UpdateBehavioralQuestionMutation = { __typename?: 'Mutation', updateBehavioralQuestion: { __typename?: 'BehavioralQuestion', id: string, question: string, category: BehavioralQuestionCategory, common: boolean } };

export type CreateBehavioralQuestionMutationVariables = Exact<{
  input: CreateBehavioralQuestionInput;
}>;


export type CreateBehavioralQuestionMutation = { __typename?: 'Mutation', createBehavioralQuestion: { __typename?: 'BehavioralQuestion', id: string } };

export type DeleteBehavioralQuestionAnswerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBehavioralQuestionAnswerMutation = { __typename?: 'Mutation', deleteBehavioralQuestionAnswer: { __typename?: 'BehavioralQuestionAnswer', id: number } };

export type FindBehavioralQuestionAnswerByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindBehavioralQuestionAnswerById = { __typename?: 'Query', behavioralQuestionAnswer?: { __typename?: 'BehavioralQuestionAnswer', id: number, answer: string, userId: number, public: boolean, showUserName: boolean, behavioralQuestionId: number } | null };

export type FindBehavioralQuestionAnswersVariables = Exact<{ [key: string]: never; }>;


export type FindBehavioralQuestionAnswers = { __typename?: 'Query', behavioralQuestionAnswers: Array<{ __typename?: 'BehavioralQuestionAnswer', id: number, answer: string, userId: number, public: boolean, showUserName: boolean, behavioralQuestionId: number }> };

export type EditBehavioralQuestionAnswerByIdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EditBehavioralQuestionAnswerById = { __typename?: 'Query', behavioralQuestionAnswer?: { __typename?: 'BehavioralQuestionAnswer', id: number, answer: string, userId: number, public: boolean, showUserName: boolean, behavioralQuestionId: number } | null };

export type UpdateBehavioralQuestionAnswerMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateBehavioralQuestionAnswerInput;
}>;


export type UpdateBehavioralQuestionAnswerMutation = { __typename?: 'Mutation', updateBehavioralQuestionAnswer: { __typename?: 'BehavioralQuestionAnswer', id: number, answer: string, userId: number, public: boolean, showUserName: boolean, behavioralQuestionId: number } };

export type CreateBehavioralQuestionAnswerMutationVariables = Exact<{
  input: CreateBehavioralQuestionAnswerInput;
}>;


export type CreateBehavioralQuestionAnswerMutation = { __typename?: 'Mutation', createBehavioralQuestionAnswer: { __typename?: 'BehavioralQuestionAnswer', id: number } };
