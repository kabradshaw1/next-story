import { gql } from 'graphql-tag';

import Lists from '@/components/main/Lists';
import axiosInstance from '@/lib/axios';

export default async function CharactersPage(): Promise<JSX.Element> {
  const query = gql`
    query Characters {
      characters {
        title
        downloadURLs
      }
    }
  `;
  const response = await axiosInstance.post('', {
    query: query.loc?.source.body,
  });

  const characters = response.data.data.characters;
  console.log('the characters', characters);
  return (
    <div className="card">
      <h1>Characters</h1>
      <Lists props={characters} route="characters" />
    </div>
  );
}
// I also have error and loading here

// if (loading) return <div>Loading...</div>;
// if (error !== null) return <div>Error: {error?.message}</div>;
// if (data === undefined) {
//   return <div>There was a problem loading the data.</div>;
// }
// const characters =
//   data.characters?.map((character) => {
//     let imageUrl;
//     if (
//       character?.downloadURLs !== null &&
//       character?.downloadURLs !== undefined
//     ) {
//       const randomIndex = Math.floor(
//         Math.random() * character?.downloadURLs.length
//       );
//       imageUrl = character?.downloadURLs[randomIndex];
//     }
//     return {
//       title: character?.title as string,
//       imageUrl: imageUrl as string | undefined,
//     };
//   }) ?? [];
