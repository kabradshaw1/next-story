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
  id: Scalars['Int']['output'];
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
  id: Scalars['Int']['output'];
  organizations?: Maybe<Array<Maybe<Organization>>>;
  scenes?: Maybe<Array<Maybe<Scene>>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadURLs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  user: Scalars['String']['output'];
};

export type CreateRoleInput = {
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
  id: Scalars['Int']['output'];
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
  endTimeline: Scalars['Int']['input'];
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  populations?: InputMaybe<Array<InputMaybe<ScenePopulationInput>>>;
  startTimeline: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['Int']['input'];
};


export type MutationDeleteConflictArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSceneArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteShipArgs = {
  id: Scalars['Int']['input'];
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
  endTimeline?: InputMaybe<Scalars['Int']['input']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  id: Scalars['Int']['input'];
  locationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  locationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationAddIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  organizationRemoveIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  population?: InputMaybe<Array<InputMaybe<ScenePopulationInput>>>;
  startTimeline?: InputMaybe<Scalars['Int']['input']>;
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
  id: Scalars['Int']['output'];
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
  id: Scalars['Int']['input'];
};


export type QueryConflictArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySceneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryShipArgs = {
  id: Scalars['Int']['input'];
};

export type Role = {
  __typename?: 'Role';
  cannon?: Maybe<Scalars['Boolean']['output']>;
  characters?: Maybe<Array<Maybe<Character>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  organization?: Maybe<Organization>;
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
  endTimeline: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  location?: Maybe<Array<Maybe<Location>>>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  populations?: Maybe<Array<Maybe<Population>>>;
  startTimeline: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
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
  id: Scalars['Int']['output'];
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
  superiorTitle?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCharacterMutationVariables = Exact<{
  title: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>> | InputMaybe<FileInput>>;
  roleIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter?: { __typename?: 'Character', title: string, text?: string | null, createdAt?: string | null, user: string, uploadURLs?: Array<string | null> | null, roles?: Array<{ __typename?: 'Role', title: string } | null> | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  title: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>> | InputMaybe<FileInput>>;
  roleCreate?: InputMaybe<Array<InputMaybe<CreateRoleInput>> | InputMaybe<CreateRoleInput>>;
  conflictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  headquartersId?: InputMaybe<Scalars['Int']['input']>;
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'Organization', title: string, text?: string | null, createdAt?: string | null, user: string, uploadURLs?: Array<string | null> | null, conflicts?: Array<{ __typename?: 'Conflict', title: string } | null> | null, headquarters?: { __typename?: 'Location', title: string } | null, locations?: Array<{ __typename?: 'Location', title: string } | null> | null, roles?: Array<{ __typename?: 'Role', title: string, superior?: { __typename?: 'Role', title: string } | null } | null> | null } | null };

export type CreateSceneMutationVariables = Exact<{
  title: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>> | InputMaybe<FileInput>>;
  startTimeline: Scalars['Int']['input'];
  endTimeline: Scalars['Int']['input'];
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  characterIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  conflictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  populations?: InputMaybe<Array<InputMaybe<ScenePopulationInput>> | InputMaybe<ScenePopulationInput>>;
}>;


export type CreateSceneMutation = { __typename?: 'Mutation', createScene?: { __typename?: 'Scene', title: string, text?: string | null, createdAt?: string | null, user: string, uploadURLs?: Array<string | null> | null, location?: Array<{ __typename?: 'Location', title: string } | null> | null, characters?: Array<{ __typename?: 'Character', title: string } | null> | null, organizations?: Array<{ __typename?: 'Organization', title: string } | null> | null, populations?: Array<{ __typename?: 'Population', population: number, ship?: { __typename?: 'Ship', title: string } | null } | null> | null, conflicts?: Array<{ __typename?: 'Conflict', title: string } | null> | null } | null };

export type ForOrganizationFormQueryVariables = Exact<{ [key: string]: never; }>;


export type ForOrganizationFormQuery = { __typename?: 'Query', conflicts?: Array<{ __typename?: 'Conflict', id: number, title: string } | null> | null, locations?: Array<{ __typename?: 'Location', id: number, title: string } | null> | null };

export type ForSceneFormQueryVariables = Exact<{ [key: string]: never; }>;


export type ForSceneFormQuery = { __typename?: 'Query', characters?: Array<{ __typename?: 'Character', id: number, title: string } | null> | null, conflicts?: Array<{ __typename?: 'Conflict', id: number, title: string } | null> | null, locations?: Array<{ __typename?: 'Location', id: number, title: string } | null> | null, organizations?: Array<{ __typename?: 'Organization', id: number, title: string } | null> | null, ships?: Array<{ __typename?: 'Ship', id: number, title: string } | null> | null };

export type OrganizationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', title: string, text?: string | null, createdAt?: string | null, user: string, downloadURLs?: Array<string | null> | null, scenes?: Array<{ __typename?: 'Scene', title: string, id: number } | null> | null, conflicts?: Array<{ __typename?: 'Conflict', title: string, id: number } | null> | null, headquarters?: { __typename?: 'Location', title: string, id: number } | null, locations?: Array<{ __typename?: 'Location', title: string, id: number } | null> | null, roles?: Array<{ __typename?: 'Role', title: string, text?: string | null, id: number, superior?: { __typename?: 'Role', title: string } | null } | null> | null } | null };

export type SceneQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SceneQuery = { __typename?: 'Query', scene?: { __typename?: 'Scene', title: string, text?: string | null, createdAt?: string | null, user: string, downloadURLs?: Array<string | null> | null, characters?: Array<{ __typename?: 'Character', title: string, id: number } | null> | null, conflicts?: Array<{ __typename?: 'Conflict', title: string, id: number } | null> | null, location?: Array<{ __typename?: 'Location', title: string, id: number } | null> | null, organizations?: Array<{ __typename?: 'Organization', title: string, id: number } | null> | null, populations?: Array<{ __typename?: 'Population', population: number, id?: number | null, ship?: { __typename?: 'Ship', title: string, id: number } | null } | null> | null } | null };

export type CharacterQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', title: string, text?: string | null, createdAt?: string | null, user: string, downloadURLs?: Array<string | null> | null, scenes?: Array<{ __typename?: 'Scene', title: string, id: number } | null> | null, roles?: Array<{ __typename?: 'Role', title: string, id: number, organization?: { __typename?: 'Organization', title: string, id: number } | null } | null> | null } | null };

export type ScenesQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenesQuery = { __typename?: 'Query', scenes?: Array<{ __typename?: 'Scene', title: string, startTimeline: number, endTimeline: number, downloadURLs?: Array<string | null> | null, id: number } | null> | null };

export type OrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'Organization', title: string, roles?: Array<{ __typename?: 'Role', title: string, id: number } | null> | null } | null> | null };


export const CreateCharacterDocument = gql`
    mutation createCharacter($title: String!, $text: String, $files: [FileInput], $roleIds: [Int]) {
  createCharacter(title: $title, text: $text, files: $files, roleIds: $roleIds) {
    title
    text
    createdAt
    user
    uploadURLs
    roles {
      title
    }
  }
}
    `;
export type CreateCharacterMutationFn = Apollo.MutationFunction<CreateCharacterMutation, CreateCharacterMutationVariables>;

/**
 * __useCreateCharacterMutation__
 *
 * To run a mutation, you first call `useCreateCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCharacterMutation, { data, loading, error }] = useCreateCharacterMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      files: // value for 'files'
 *      roleIds: // value for 'roleIds'
 *   },
 * });
 */
export function useCreateCharacterMutation(baseOptions?: Apollo.MutationHookOptions<CreateCharacterMutation, CreateCharacterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCharacterMutation, CreateCharacterMutationVariables>(CreateCharacterDocument, options);
      }
export type CreateCharacterMutationHookResult = ReturnType<typeof useCreateCharacterMutation>;
export type CreateCharacterMutationResult = Apollo.MutationResult<CreateCharacterMutation>;
export type CreateCharacterMutationOptions = Apollo.BaseMutationOptions<CreateCharacterMutation, CreateCharacterMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($title: String!, $text: String, $files: [FileInput], $roleCreate: [CreateRoleInput], $conflictIds: [Int], $headquartersId: Int, $locationIds: [Int]) {
  createOrganization(
    title: $title
    text: $text
    files: $files
    rolesCreate: $roleCreate
    conflictIds: $conflictIds
    headquartersId: $headquartersId
    locationIds: $locationIds
  ) {
    title
    text
    createdAt
    user
    uploadURLs
    conflicts {
      title
    }
    headquarters {
      title
    }
    locations {
      title
    }
    roles {
      title
      superior {
        title
      }
    }
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      files: // value for 'files'
 *      roleCreate: // value for 'roleCreate'
 *      conflictIds: // value for 'conflictIds'
 *      headquartersId: // value for 'headquartersId'
 *      locationIds: // value for 'locationIds'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const CreateSceneDocument = gql`
    mutation createScene($title: String!, $text: String, $files: [FileInput], $startTimeline: Int!, $endTimeline: Int!, $locationIds: [Int], $characterIds: [Int], $organizationIds: [Int], $conflictIds: [Int], $populations: [ScenePopulationInput]) {
  createScene(
    title: $title
    text: $text
    files: $files
    startTimeline: $startTimeline
    endTimeline: $endTimeline
    locationIds: $locationIds
    characterIds: $characterIds
    organizationIds: $organizationIds
    conflictIds: $conflictIds
    populations: $populations
  ) {
    title
    text
    createdAt
    user
    uploadURLs
    location {
      title
    }
    characters {
      title
    }
    organizations {
      title
    }
    populations {
      population
      ship {
        title
      }
    }
    conflicts {
      title
    }
  }
}
    `;
export type CreateSceneMutationFn = Apollo.MutationFunction<CreateSceneMutation, CreateSceneMutationVariables>;

/**
 * __useCreateSceneMutation__
 *
 * To run a mutation, you first call `useCreateSceneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSceneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSceneMutation, { data, loading, error }] = useCreateSceneMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      files: // value for 'files'
 *      startTimeline: // value for 'startTimeline'
 *      endTimeline: // value for 'endTimeline'
 *      locationIds: // value for 'locationIds'
 *      characterIds: // value for 'characterIds'
 *      organizationIds: // value for 'organizationIds'
 *      conflictIds: // value for 'conflictIds'
 *      populations: // value for 'populations'
 *   },
 * });
 */
export function useCreateSceneMutation(baseOptions?: Apollo.MutationHookOptions<CreateSceneMutation, CreateSceneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSceneMutation, CreateSceneMutationVariables>(CreateSceneDocument, options);
      }
export type CreateSceneMutationHookResult = ReturnType<typeof useCreateSceneMutation>;
export type CreateSceneMutationResult = Apollo.MutationResult<CreateSceneMutation>;
export type CreateSceneMutationOptions = Apollo.BaseMutationOptions<CreateSceneMutation, CreateSceneMutationVariables>;
export const ForOrganizationFormDocument = gql`
    query forOrganizationForm {
  conflicts {
    id
    title
  }
  locations {
    id
    title
  }
}
    `;

/**
 * __useForOrganizationFormQuery__
 *
 * To run a query within a React component, call `useForOrganizationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useForOrganizationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useForOrganizationFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useForOrganizationFormQuery(baseOptions?: Apollo.QueryHookOptions<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>(ForOrganizationFormDocument, options);
      }
export function useForOrganizationFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>(ForOrganizationFormDocument, options);
        }
export function useForOrganizationFormSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>(ForOrganizationFormDocument, options);
        }
export type ForOrganizationFormQueryHookResult = ReturnType<typeof useForOrganizationFormQuery>;
export type ForOrganizationFormLazyQueryHookResult = ReturnType<typeof useForOrganizationFormLazyQuery>;
export type ForOrganizationFormSuspenseQueryHookResult = ReturnType<typeof useForOrganizationFormSuspenseQuery>;
export type ForOrganizationFormQueryResult = Apollo.QueryResult<ForOrganizationFormQuery, ForOrganizationFormQueryVariables>;
export const ForSceneFormDocument = gql`
    query forSceneForm {
  characters {
    id
    title
  }
  conflicts {
    id
    title
  }
  locations {
    id
    title
  }
  organizations {
    id
    title
  }
  ships {
    id
    title
  }
}
    `;

/**
 * __useForSceneFormQuery__
 *
 * To run a query within a React component, call `useForSceneFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useForSceneFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useForSceneFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useForSceneFormQuery(baseOptions?: Apollo.QueryHookOptions<ForSceneFormQuery, ForSceneFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ForSceneFormQuery, ForSceneFormQueryVariables>(ForSceneFormDocument, options);
      }
export function useForSceneFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ForSceneFormQuery, ForSceneFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ForSceneFormQuery, ForSceneFormQueryVariables>(ForSceneFormDocument, options);
        }
export function useForSceneFormSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ForSceneFormQuery, ForSceneFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ForSceneFormQuery, ForSceneFormQueryVariables>(ForSceneFormDocument, options);
        }
export type ForSceneFormQueryHookResult = ReturnType<typeof useForSceneFormQuery>;
export type ForSceneFormLazyQueryHookResult = ReturnType<typeof useForSceneFormLazyQuery>;
export type ForSceneFormSuspenseQueryHookResult = ReturnType<typeof useForSceneFormSuspenseQuery>;
export type ForSceneFormQueryResult = Apollo.QueryResult<ForSceneFormQuery, ForSceneFormQueryVariables>;
export const OrganizationDocument = gql`
    query organization($id: Int!) {
  organization(id: $id) {
    title
    text
    createdAt
    user
    downloadURLs
    scenes {
      title
      id
    }
    conflicts {
      title
      id
    }
    headquarters {
      title
      id
    }
    locations {
      title
      id
    }
    roles {
      title
      text
      id
      superior {
        title
      }
    }
  }
}
    `;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables> & ({ variables: OrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
      }
export function useOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationSuspenseQueryHookResult = ReturnType<typeof useOrganizationSuspenseQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const SceneDocument = gql`
    query scene($id: Int!) {
  scene(id: $id) {
    title
    text
    createdAt
    user
    downloadURLs
    characters {
      title
      id
    }
    conflicts {
      title
      id
    }
    location {
      title
      id
    }
    organizations {
      title
      id
    }
    populations {
      population
      id
      ship {
        title
        id
      }
    }
  }
}
    `;

/**
 * __useSceneQuery__
 *
 * To run a query within a React component, call `useSceneQuery` and pass it any options that fit your needs.
 * When your component renders, `useSceneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSceneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSceneQuery(baseOptions: Apollo.QueryHookOptions<SceneQuery, SceneQueryVariables> & ({ variables: SceneQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SceneQuery, SceneQueryVariables>(SceneDocument, options);
      }
export function useSceneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SceneQuery, SceneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SceneQuery, SceneQueryVariables>(SceneDocument, options);
        }
export function useSceneSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SceneQuery, SceneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SceneQuery, SceneQueryVariables>(SceneDocument, options);
        }
export type SceneQueryHookResult = ReturnType<typeof useSceneQuery>;
export type SceneLazyQueryHookResult = ReturnType<typeof useSceneLazyQuery>;
export type SceneSuspenseQueryHookResult = ReturnType<typeof useSceneSuspenseQuery>;
export type SceneQueryResult = Apollo.QueryResult<SceneQuery, SceneQueryVariables>;
export const CharacterDocument = gql`
    query character($id: Int!) {
  character(id: $id) {
    title
    text
    createdAt
    user
    downloadURLs
    scenes {
      title
      id
    }
    roles {
      title
      id
      organization {
        title
        id
      }
    }
  }
}
    `;

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables> & ({ variables: CharacterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export function useCharacterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterSuspenseQueryHookResult = ReturnType<typeof useCharacterSuspenseQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const ScenesDocument = gql`
    query scenes {
  scenes {
    title
    startTimeline
    endTimeline
    downloadURLs
    id
  }
}
    `;

/**
 * __useScenesQuery__
 *
 * To run a query within a React component, call `useScenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScenesQuery({
 *   variables: {
 *   },
 * });
 */
export function useScenesQuery(baseOptions?: Apollo.QueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
      }
export function useScenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
        }
export function useScenesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ScenesQuery, ScenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ScenesQuery, ScenesQueryVariables>(ScenesDocument, options);
        }
export type ScenesQueryHookResult = ReturnType<typeof useScenesQuery>;
export type ScenesLazyQueryHookResult = ReturnType<typeof useScenesLazyQuery>;
export type ScenesSuspenseQueryHookResult = ReturnType<typeof useScenesSuspenseQuery>;
export type ScenesQueryResult = Apollo.QueryResult<ScenesQuery, ScenesQueryVariables>;
export const OrganizationsDocument = gql`
    query organizations {
  organizations {
    title
    roles {
      title
      id
    }
  }
}
    `;

/**
 * __useOrganizationsQuery__
 *
 * To run a query within a React component, call `useOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
      }
export function useOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
        }
export function useOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationsQuery, OrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, options);
        }
export type OrganizationsQueryHookResult = ReturnType<typeof useOrganizationsQuery>;
export type OrganizationsLazyQueryHookResult = ReturnType<typeof useOrganizationsLazyQuery>;
export type OrganizationsSuspenseQueryHookResult = ReturnType<typeof useOrganizationsSuspenseQuery>;
export type OrganizationsQueryResult = Apollo.QueryResult<OrganizationsQuery, OrganizationsQueryVariables>;