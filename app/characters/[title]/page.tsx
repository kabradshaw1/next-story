import { gql } from 'graphql-tag';

export default async function SingleCharacterPage(): Promise<JSX.Element> {
  const query = gql`
    query character() {
      character($title: String!) {
        title
        text
        createdAt
        user
        downloadURLs
        scenes {
          title
        }
        roles {
          title
          organization {
            title
          }
        }
      }
    }
  `;
  return <></>;
}

// include: {
//   fileNames: true,
//   scenes: true,
//   roles: { include: { role: { include: { organization: true } } } },
// },
