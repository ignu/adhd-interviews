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

export type CreateBehavioralQuestionInput = {
  category: BehavioralQuestionCategory;
  common: Scalars['Boolean'];
  question: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBehavioralQuestion: BehavioralQuestion;
  deleteBehavioralQuestion: BehavioralQuestion;
  updateBehavioralQuestion: BehavioralQuestion;
};


export type MutationcreateBehavioralQuestionArgs = {
  input: CreateBehavioralQuestionInput;
};


export type MutationdeleteBehavioralQuestionArgs = {
  id: Scalars['String'];
};


export type MutationupdateBehavioralQuestionArgs = {
  id: Scalars['String'];
  input: UpdateBehavioralQuestionInput;
};

export type Query = {
  __typename?: 'Query';
  behavioralQuestion?: Maybe<BehavioralQuestion>;
  behavioralQuestions: Array<BehavioralQuestion>;
  redwood?: Maybe<Redwood>;
};


export type QuerybehavioralQuestionArgs = {
  id: Scalars['String'];
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UpdateBehavioralQuestionInput = {
  category?: InputMaybe<BehavioralQuestionCategory>;
  common?: InputMaybe<Scalars['Boolean']>;
  question?: InputMaybe<Scalars['String']>;
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
