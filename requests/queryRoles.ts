import { gql } from 'graphql-tag';

import axiosInstance from '@/lib/serverAxios';

export type Role = {
  title: string;
  organization: string;
  id: string;
};

export default async function getRoles(): Promise<Role[]> {
  const query = gql`
    query Roles {
      title
      id
      organization {
        title
      }
    }
  `;

  try {
    const response = await axiosInstance.post('', {
      query: query.loc?.source.body,
    });

    const roles = response.data.data.roles;

    return roles.map(
      (role: {
        title: string;
        organization: { title: string };
        id: string;
      }) => {
        return {
          title: role.title,
          organization: role.organization.title,
          id: role.id,
        };
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
