import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as PrismaUser, BehavioralQuestionAnswer as PrismaBehavioralQuestionAnswer, BehavioralQuestion as PrismaBehavioralQuestion } from '.prisma/client';
import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/functions/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
      args?: TArgs,
      obj?: { root: TParent; context: TContext; info: GraphQLResolveInfo }
    ) => Promise<Partial<TResult>> | Partial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BehavioralQuestion: ResolverTypeWrapper<PrismaBehavioralQuestion>;
  BehavioralQuestionAnswer: ResolverTypeWrapper<PrismaBehavioralQuestionAnswer>;
  BehavioralQuestionCategory: BehavioralQuestionCategory;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBehavioralQuestionAnswerInput: CreateBehavioralQuestionAnswerInput;
  CreateBehavioralQuestionInput: CreateBehavioralQuestionInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateBehavioralQuestionAnswerInput: UpdateBehavioralQuestionAnswerInput;
  UpdateBehavioralQuestionInput: UpdateBehavioralQuestionInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<PrismaUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BehavioralQuestion: PrismaBehavioralQuestion;
  BehavioralQuestionAnswer: PrismaBehavioralQuestionAnswer;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  CreateBehavioralQuestionAnswerInput: CreateBehavioralQuestionAnswerInput;
  CreateBehavioralQuestionInput: CreateBehavioralQuestionInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  String: Scalars['String'];
  Time: Scalars['Time'];
  UpdateBehavioralQuestionAnswerInput: UpdateBehavioralQuestionAnswerInput;
  UpdateBehavioralQuestionInput: UpdateBehavioralQuestionInput;
  UpdateUserInput: UpdateUserInput;
  User: PrismaUser;
};

export type requireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type requireAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = requireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type skipAuthDirectiveArgs = { };

export type skipAuthDirectiveResolver<Result, Parent, ContextType = RedwoodGraphQLContext, Args = skipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BehavioralQuestionResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['BehavioralQuestion'] = ResolversParentTypes['BehavioralQuestion']> = {
  category?: Resolver<ResolversTypes['BehavioralQuestionCategory'], ParentType, ContextType>;
  common?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BehavioralQuestionAnswerResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['BehavioralQuestionAnswer'] = ResolversParentTypes['BehavioralQuestionAnswer']> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  behavioralQuestion?: Resolver<ResolversTypes['BehavioralQuestion'], ParentType, ContextType>;
  behavioralQuestionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showUserName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBehavioralQuestion?: Resolver<ResolversTypes['BehavioralQuestion'], ParentType, ContextType, RequireFields<MutationcreateBehavioralQuestionArgs, 'input'>>;
  createBehavioralQuestionAnswer?: Resolver<ResolversTypes['BehavioralQuestionAnswer'], ParentType, ContextType, RequireFields<MutationcreateBehavioralQuestionAnswerArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteBehavioralQuestion?: Resolver<ResolversTypes['BehavioralQuestion'], ParentType, ContextType, RequireFields<MutationdeleteBehavioralQuestionArgs, 'id'>>;
  deleteBehavioralQuestionAnswer?: Resolver<ResolversTypes['BehavioralQuestionAnswer'], ParentType, ContextType, RequireFields<MutationdeleteBehavioralQuestionAnswerArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  updateBehavioralQuestion?: Resolver<ResolversTypes['BehavioralQuestion'], ParentType, ContextType, RequireFields<MutationupdateBehavioralQuestionArgs, 'id' | 'input'>>;
  updateBehavioralQuestionAnswer?: Resolver<ResolversTypes['BehavioralQuestionAnswer'], ParentType, ContextType, RequireFields<MutationupdateBehavioralQuestionAnswerArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  behavioralQuestion?: Resolver<Maybe<ResolversTypes['BehavioralQuestion']>, ParentType, ContextType, RequireFields<QuerybehavioralQuestionArgs, 'id'>>;
  behavioralQuestionAnswer?: Resolver<Maybe<ResolversTypes['BehavioralQuestionAnswer']>, ParentType, ContextType, RequireFields<QuerybehavioralQuestionAnswerArgs, 'id'>>;
  behavioralQuestionAnswers?: Resolver<Array<ResolversTypes['BehavioralQuestionAnswer']>, ParentType, ContextType>;
  behavioralQuestions?: Resolver<Array<ResolversTypes['BehavioralQuestion']>, ParentType, ContextType>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = RedwoodGraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  answers?: Resolver<Array<Maybe<ResolversTypes['BehavioralQuestionAnswer']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hashedPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpiresAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = RedwoodGraphQLContext> = {
  BehavioralQuestion?: BehavioralQuestionResolvers<ContextType>;
  BehavioralQuestionAnswer?: BehavioralQuestionAnswerResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = RedwoodGraphQLContext> = {
  requireAuth?: requireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth?: skipAuthDirectiveResolver<any, any, ContextType>;
};
