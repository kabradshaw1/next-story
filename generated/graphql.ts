import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type Conflict = {
  __typename?: 'Conflict';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type CreateRoleInput = {
  subordinatesTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  superiorTitle?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type FileInput = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type Location = {
  __typename?: 'Location';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  headquartersOf?: Maybe<Organization>;
  id?: Maybe<Scalars['Int']['output']>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  ship?: Maybe<Ship>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter?: Maybe<Character>;
  createConflict?: Maybe<Conflict>;
  createLocation?: Maybe<Location>;
  createOrganization?: Maybe<Organization>;
  createScene?: Maybe<Scene>;
  createShip?: Maybe<Ship>;
  deleteCharacter?: Maybe<Character>;
  deleteConflict?: Maybe<Conflict>;
  deleteLocation?: Maybe<Location>;
  deleteOrganization?: Maybe<Organization>;
  deleteScene?: Maybe<Scene>;
  deleteShip?: Maybe<Ship>;
  updateCharacter?: Maybe<Character>;
  updateConflict?: Maybe<Conflict>;
  updateLocation?: Maybe<Location>;
  updateOrganization?: Maybe<Organization>;
  updateScene?: Maybe<Scene>;
  updateShip?: Maybe<Ship>;
};


export type MutationCreateCharacterArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  roleIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateConflictArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sceneIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateLocationArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  headquartersOfIds?: InputMaybe<Scalars['Int']['input']>;
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  shipId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateOrganizationArgs = {
  conflictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  headquartersId?: InputMaybe<Scalars['Int']['input']>;
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  rolesCreate?: InputMaybe<Array<InputMaybe<CreateRoleInput>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateSceneArgs = {
  characterIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  conflictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  population?: InputMaybe<Array<InputMaybe<ScenePopulationInput>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  timeline?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateShipArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  populationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteCharacterArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteConflictArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteLocationArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteOrganizationArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteSceneArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteShipArgs = {
  title: Scalars['String']['input'];
};


export type MutationUpdateCharacterArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  id: Scalars['Int']['input'];
  roleAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  roleRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateConflictArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  id: Scalars['Int']['input'];
  organizationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sceneAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sceneRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateLocationArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  headquartersOfId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  organizationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  shipId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOrganizationArgs = {
  conflictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  headquartersId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  rolesCreate?: InputMaybe<Array<InputMaybe<CreateRoleInput>>>;
  rolesDeleteId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  rolesUpdate?: InputMaybe<Array<InputMaybe<UpdateRoleInput>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSceneArgs = {
  characterAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  characterRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  conflictAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  conflictRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  id: Scalars['Int']['input'];
  locationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  population?: InputMaybe<Array<InputMaybe<ScenePopulationInput>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateShipArgs = {
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  id: Scalars['Int']['input'];
  locationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  populationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  populationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Organization = {
  __typename?: 'Organization';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  conflicts?: Maybe<Array<Maybe<Conflict>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  headquarters?: Maybe<Location>;
  id?: Maybe<Scalars['Int']['output']>;
  locations?: Maybe<Array<Maybe<Location>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type Population = {
  __typename?: 'Population';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  population: Scalars['Int']['output'];
  scene?: Maybe<Scene>;
  ship?: Maybe<Ship>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  character?: Maybe<Character>;
  characters?: Maybe<Array<Maybe<Character>>>;
  conflict?: Maybe<Conflict>;
  conflicts?: Maybe<Array<Maybe<Conflict>>>;
  location?: Maybe<Location>;
  locations?: Maybe<Array<Maybe<Location>>>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  scene?: Maybe<Scene>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  ship?: Maybe<Ship>;
  ships?: Maybe<Array<Maybe<Ship>>>;
};


export type QueryCharacterArgs = {
  title: Scalars['String']['input'];
};


export type QueryConflictArgs = {
  title: Scalars['String']['input'];
};


export type QueryLocationArgs = {
  title: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  title: Scalars['String']['input'];
};


export type QueryRoleArgs = {
  title: Scalars['String']['input'];
};


export type QuerySceneArgs = {
  title: Scalars['String']['input'];
};


export type QueryShipArgs = {
  title: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  characters?: Maybe<Array<Maybe<Character>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  organization?: Maybe<Organization>;
  subordinates?: Maybe<Array<Maybe<Role>>>;
  superior?: Maybe<Role>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: Scalars['String']['output'];
};

export type Scene = {
  __typename?: 'Scene';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  characters?: Maybe<Array<Maybe<Character>>>;
  conflicts?: Maybe<Array<Maybe<Conflict>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Array<Maybe<Location>>>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  populations?: Maybe<Array<Maybe<Population>>>;
  text?: Maybe<Scalars['String']['output']>;
  timeline: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type ScenePopulationInput = {
  population: Scalars['Int']['input'];
  shipId?: InputMaybe<Scalars['Int']['input']>;
};

export type Ship = {
  __typename?: 'Ship';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  locations?: Maybe<Array<Maybe<Location>>>;
  populations?: Maybe<Array<Maybe<Population>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type UpdateRoleInput = {
  id: Scalars['Int']['input'];
  subordinatesTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  superiorTitle?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles?: Array<{ __typename?: 'Role', id?: number | null, title: string, organization?: { __typename?: 'Organization', title: string } | null } | null> | null };


export const RolesDocument = gql`
    query roles {
  roles {
    id
    title
    organization {
      title
    }
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export function useRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<typeof useRolesSuspenseQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;