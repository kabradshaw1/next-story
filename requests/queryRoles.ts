'use server';
import axios from 'axios';
import { gql } from 'graphql-tag';

export type Organizations = {
  title: string;
  roles: Array<{
    id: string;
    title: string;
  }>;
};

export default async function getRoles(): Promise<Organizations[]> {
  const query = gql`
    query organization {
      organizations {
        title
        roles {
          id
          title
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'http://localhost:4000/graphql',
      {
        query: query.loc?.source.body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const organization = response.data.data.organization;

    return organization;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
