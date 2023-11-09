import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Opaque: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum Annual {
  Annual = 'ANNUAL'
}

/** Boolean expression comparing fields on type "Annual" */
export type AnnualFilter = {
  eq?: InputMaybe<Annual>;
  in?: InputMaybe<Array<Annual>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Annual>;
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export enum Frequency {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY'
}

/** Boolean expression comparing fields on type "Frequency" */
export type FrequencyFilter = {
  eq?: InputMaybe<Frequency>;
  in?: InputMaybe<Array<Frequency>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Frequency>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export enum Interval {
  Days = 'DAYS',
  Months = 'MONTHS',
  Years = 'YEARS'
}

/** Boolean expression comparing fields on type "Interval" */
export type IntervalFilter = {
  eq?: InputMaybe<Interval>;
  in?: InputMaybe<Array<Interval>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Interval>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `categories` collection */
  deleteFromcategoriesCollection: CategoriesDeleteResponse;
  /** Deletes zero or more records from the `reminders` collection */
  deleteFromremindersCollection: RemindersDeleteResponse;
  /** Deletes zero or more records from the `settings` collection */
  deleteFromsettingsCollection: SettingsDeleteResponse;
  /** Adds one or more `categories` records to the collection */
  insertIntocategoriesCollection?: Maybe<CategoriesInsertResponse>;
  /** Adds one or more `reminders` records to the collection */
  insertIntoremindersCollection?: Maybe<RemindersInsertResponse>;
  /** Adds one or more `settings` records to the collection */
  insertIntosettingsCollection?: Maybe<SettingsInsertResponse>;
  /** Updates zero or more records in the `categories` collection */
  updatecategoriesCollection: CategoriesUpdateResponse;
  /** Updates zero or more records in the `reminders` collection */
  updateremindersCollection: RemindersUpdateResponse;
  /** Updates zero or more records in the `settings` collection */
  updatesettingsCollection: SettingsUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromcategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoriesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromremindersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RemindersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromsettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SettingsFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntocategoriesCollectionArgs = {
  objects: Array<CategoriesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoremindersCollectionArgs = {
  objects: Array<RemindersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntosettingsCollectionArgs = {
  objects: Array<SettingsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdatecategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoriesFilter>;
  set: CategoriesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateremindersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RemindersFilter>;
  set: RemindersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatesettingsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SettingsFilter>;
  set: SettingsUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

export enum Ongoing {
  Ongoing = 'ONGOING'
}

/** Boolean expression comparing fields on type "Ongoing" */
export type OngoingFilter = {
  eq?: InputMaybe<Ongoing>;
  in?: InputMaybe<Array<Ongoing>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Ongoing>;
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `categories` */
  categoriesCollection?: Maybe<CategoriesConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `reminders` */
  remindersCollection?: Maybe<RemindersConnection>;
  /** A pagable collection of type `settings` */
  settingsCollection?: Maybe<SettingsConnection>;
};


/** The root type for querying data */
export type QueryCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CategoriesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryRemindersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RemindersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RemindersOrderBy>>;
};


/** The root type for querying data */
export type QuerySettingsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<SettingsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SettingsOrderBy>>;
};

export enum Single {
  Single = 'SINGLE'
}

/** Boolean expression comparing fields on type "Single" */
export type SingleFilter = {
  eq?: InputMaybe<Single>;
  in?: InputMaybe<Array<Single>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Single>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum Test {
  A = 'a',
  B = 'b',
  C = 'c'
}

/** Boolean expression comparing fields on type "Test" */
export type TestFilter = {
  eq?: InputMaybe<Test>;
  in?: InputMaybe<Array<Test>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Test>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

export enum Type {
  Annual = 'ANNUAL',
  Ongoing = 'ONGOING',
  Single = 'SINGLE'
}

/** Boolean expression comparing fields on type "Type" */
export type TypeFilter = {
  eq?: InputMaybe<Type>;
  in?: InputMaybe<Array<Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Type>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type Categories = Node & {
  __typename?: 'categories';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  iconId?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  remindersCollection?: Maybe<RemindersConnection>;
  settings?: Maybe<Settings>;
  userid?: Maybe<Scalars['UUID']['output']>;
};


export type CategoriesRemindersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RemindersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RemindersOrderBy>>;
};

export type CategoriesConnection = {
  __typename?: 'categoriesConnection';
  edges: Array<CategoriesEdge>;
  pageInfo: PageInfo;
};

export type CategoriesDeleteResponse = {
  __typename?: 'categoriesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type CategoriesEdge = {
  __typename?: 'categoriesEdge';
  cursor: Scalars['String']['output'];
  node: Categories;
};

export type CategoriesFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  iconId?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  isLocked?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  userid?: InputMaybe<UuidFilter>;
};

export type CategoriesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  iconId?: InputMaybe<Scalars['String']['input']>;
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['UUID']['input']>;
};

export type CategoriesInsertResponse = {
  __typename?: 'categoriesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type CategoriesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  iconId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  isLocked?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  userid?: InputMaybe<OrderByDirection>;
};

export type CategoriesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  iconId?: InputMaybe<Scalars['String']['input']>;
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['UUID']['input']>;
};

export type CategoriesUpdateResponse = {
  __typename?: 'categoriesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Categories>;
};

export type Reminders = Node & {
  __typename?: 'reminders';
  autoRenewal?: Maybe<Scalars['Boolean']['output']>;
  category?: Maybe<Categories>;
  categoryId?: Maybe<Scalars['BigInt']['output']>;
  company: Scalars['String']['output'];
  cost: Scalars['Float']['output'];
  created_at?: Maybe<Scalars['Datetime']['output']>;
  date: Scalars['Date']['output'];
  frequency?: Maybe<Frequency>;
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<Settings>;
  type: Type;
  userid?: Maybe<Scalars['UUID']['output']>;
};

export type RemindersConnection = {
  __typename?: 'remindersConnection';
  edges: Array<RemindersEdge>;
  pageInfo: PageInfo;
  /** The total number of records matching the `filter` criteria */
  totalCount: Scalars['Int']['output'];
};

export type RemindersDeleteResponse = {
  __typename?: 'remindersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Reminders>;
};

export type RemindersEdge = {
  __typename?: 'remindersEdge';
  cursor: Scalars['String']['output'];
  node: Reminders;
};

export type RemindersFilter = {
  autoRenewal?: InputMaybe<BooleanFilter>;
  categoryId?: InputMaybe<BigIntFilter>;
  company?: InputMaybe<StringFilter>;
  cost?: InputMaybe<FloatFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  date?: InputMaybe<DateFilter>;
  frequency?: InputMaybe<FrequencyFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  notes?: InputMaybe<StringFilter>;
  type?: InputMaybe<TypeFilter>;
  userid?: InputMaybe<UuidFilter>;
};

export type RemindersInsertInput = {
  autoRenewal?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  frequency?: InputMaybe<Frequency>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Type>;
  userid?: InputMaybe<Scalars['UUID']['input']>;
};

export type RemindersInsertResponse = {
  __typename?: 'remindersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Reminders>;
};

export type RemindersOrderBy = {
  autoRenewal?: InputMaybe<OrderByDirection>;
  categoryId?: InputMaybe<OrderByDirection>;
  company?: InputMaybe<OrderByDirection>;
  cost?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  date?: InputMaybe<OrderByDirection>;
  frequency?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  userid?: InputMaybe<OrderByDirection>;
};

export type RemindersUpdateInput = {
  autoRenewal?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  frequency?: InputMaybe<Frequency>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Type>;
  userid?: InputMaybe<Scalars['UUID']['input']>;
};

export type RemindersUpdateResponse = {
  __typename?: 'remindersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Reminders>;
};

export type Settings = Node & {
  __typename?: 'settings';
  categoriesCollection?: Maybe<CategoriesConnection>;
  currency?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  interval?: Maybe<Interval>;
  last_name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notice_period?: Maybe<Scalars['Int']['output']>;
  remindersCollection?: Maybe<RemindersConnection>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};


export type SettingsCategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CategoriesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoriesOrderBy>>;
};


export type SettingsRemindersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RemindersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RemindersOrderBy>>;
};

export type SettingsConnection = {
  __typename?: 'settingsConnection';
  edges: Array<SettingsEdge>;
  pageInfo: PageInfo;
};

export type SettingsDeleteResponse = {
  __typename?: 'settingsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Settings>;
};

export type SettingsEdge = {
  __typename?: 'settingsEdge';
  cursor: Scalars['String']['output'];
  node: Settings;
};

export type SettingsFilter = {
  currency?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  first_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  interval?: InputMaybe<IntervalFilter>;
  last_name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  notice_period?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type SettingsInsertInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  interval?: InputMaybe<Interval>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  notice_period?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SettingsInsertResponse = {
  __typename?: 'settingsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Settings>;
};

export type SettingsOrderBy = {
  currency?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  first_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  interval?: InputMaybe<OrderByDirection>;
  last_name?: InputMaybe<OrderByDirection>;
  notice_period?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type SettingsUpdateInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  interval?: InputMaybe<Interval>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  notice_period?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SettingsUpdateResponse = {
  __typename?: 'settingsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Settings>;
};

export type AddCategoryMutationVariables = Exact<{
  category: Scalars['String']['input'];
  isLocked: Scalars['Boolean']['input'];
  iconId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', insertIntocategoriesCollection?: { __typename?: 'categoriesInsertResponse', affectedCount: number, records: Array<{ __typename?: 'categories', id: any, name: string, isLocked?: boolean | null, iconId?: string | null, userid?: any | null }> } | null };

export type AddReminderMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  categoryId: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  type: Type;
  company?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  frequency: Frequency;
  autoRenewal?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddReminderMutation = { __typename?: 'Mutation', insertIntoremindersCollection?: { __typename?: 'remindersInsertResponse', affectedCount: number } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteFromcategoriesCollection: { __typename?: 'categoriesDeleteResponse', affectedCount: number } };

export type DeleteReminderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type DeleteReminderMutation = { __typename?: 'Mutation', deleteFromremindersCollection: { __typename?: 'remindersDeleteResponse', affectedCount: number } };

export type UpdateCategoryMutationVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  iconId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updatecategoriesCollection: { __typename?: 'categoriesUpdateResponse', affectedCount: number } };

export type UpdateReminderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
  categoryId: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  type: Type;
  company?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  frequency: Frequency;
  autoRenewal?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateReminderMutation = { __typename?: 'Mutation', updateremindersCollection: { __typename?: 'remindersUpdateResponse', affectedCount: number } };

export type UpdateSettingsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['UUID']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updatesettingsCollection: { __typename?: 'settingsUpdateResponse', affectedCount: number, records: Array<{ __typename?: 'settings', id: any }> } };

export type GetAllRemindersQueryVariables = Exact<{
  today?: InputMaybe<Scalars['Date']['input']>;
  upcoming?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetAllRemindersQuery = { __typename?: 'Query', upcoming?: { __typename?: 'remindersConnection', list: Array<{ __typename?: 'remindersEdge', reminder: { __typename?: 'reminders', id: any, name: string, company: string, cost: number, date: any, autoRenewal?: boolean | null, category?: { __typename?: 'categories', iconId?: string | null, name: string } | null } }> } | null, reminders?: { __typename?: 'remindersConnection', list: Array<{ __typename?: 'remindersEdge', reminder: { __typename?: 'reminders', id: any, name: string, company: string, cost: number, category?: { __typename?: 'categories', iconId?: string | null, name: string } | null } }> } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'categoriesConnection', list: Array<{ __typename?: 'categoriesEdge', category: { __typename?: 'categories', id: any, name: string, iconId?: string | null, reminders?: { __typename?: 'remindersConnection', totalCount: number } | null } }> } | null };

export type GetRemindersQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['BigInt']['input']>;
  today?: InputMaybe<Scalars['Date']['input']>;
  upcoming?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetRemindersQuery = { __typename?: 'Query', upcoming?: { __typename?: 'remindersConnection', list: Array<{ __typename?: 'remindersEdge', reminder: { __typename?: 'reminders', id: any, name: string, company: string, cost: number, date: any, autoRenewal?: boolean | null, category?: { __typename?: 'categories', iconId?: string | null, name: string } | null } }> } | null, reminders?: { __typename?: 'remindersConnection', list: Array<{ __typename?: 'remindersEdge', reminder: { __typename?: 'reminders', id: any, name: string, company: string, cost: number, category?: { __typename?: 'categories', iconId?: string | null, name: string } | null } }> } | null };

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { __typename?: 'Query', settings?: { __typename?: 'settingsConnection', list: Array<{ __typename?: 'settingsEdge', setting: { __typename?: 'settings', id: any, first_name?: string | null, last_name?: string | null, email?: string | null } }> } | null };

export type GetReminderQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetReminderQuery = { __typename?: 'Query', reminders?: { __typename?: 'remindersConnection', list: Array<{ __typename?: 'remindersEdge', reminder: { __typename?: 'reminders', name: string, type: Type, company: string, cost: number, date: any, frequency?: Frequency | null, autoRenewal?: boolean | null, notes?: string | null, category?: { __typename?: 'categories', id: any, name: string } | null } }> } | null };


export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isLocked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntocategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isLocked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isLocked"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iconId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isLocked"}},{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","name":{"kind":"Name","value":"userid"}}]}}]}}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Type"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"company"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoRenewal"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertIntoremindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"company"},"value":{"kind":"Variable","name":{"kind":"Name","value":"company"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cost"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"autoRenewal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoRenewal"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"notes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notes"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<AddReminderMutation, AddReminderMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromcategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFromremindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<DeleteReminderMutation, DeleteReminderMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iconId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatecategoriesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iconId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iconId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Type"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"company"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Frequency"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoRenewal"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateremindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"company"},"value":{"kind":"Variable","name":{"kind":"Name","value":"company"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cost"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"frequency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequency"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"autoRenewal"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoRenewal"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"notes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notes"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}}]}}]}}]} as unknown as DocumentNode<UpdateReminderMutation, UpdateReminderMutationVariables>;
export const UpdateSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatesettingsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"last_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const GetAllRemindersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllReminders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upcoming"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upcoming"},"name":{"kind":"Name","value":"remindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upcoming"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminder"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"autoRenewal"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reminders"},"name":{"kind":"Name","value":"remindersCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminder"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRemindersQuery, GetAllRemindersQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"load"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categories"},"name":{"kind":"Name","value":"categoriesCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"category"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","alias":{"kind":"Name","value":"reminders"},"name":{"kind":"Name","value":"remindersCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetRemindersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReminders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"upcoming"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"upcoming"},"name":{"kind":"Name","value":"remindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"upcoming"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminder"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"autoRenewal"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reminders"},"name":{"kind":"Name","value":"remindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminder"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRemindersQuery, GetRemindersQueryVariables>;
export const GetSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"settings"},"name":{"kind":"Name","value":"settingsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"setting"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSettingsQuery, GetSettingsQueryVariables>;
export const GetReminderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReminder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminders"},"name":{"kind":"Name","value":"remindersCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list"},"name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reminder"},"name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"autoRenewal"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetReminderQuery, GetReminderQueryVariables>;