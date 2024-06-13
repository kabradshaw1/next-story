import Lists from '@/components/main/Lists';
import { useMinCharactersQuery } from '@/generated/graphql';

export default async function CharactersPage(): Promise<JSX.Element> {
  // I also have error and loading here
  const { loading, data, error } = useMinCharactersQuery();
  if (loading === true) return <div>Loading...</div>;
  if (error !== null) return <div>Error: {error?.message}</div>;
  if (data === undefined) {
    return <div>There was a problem loading the data.</div>;
  }
  const characters = data.characters?.map((character) => {
    let imageUrl;
    if (
      character?.downloadURLs !== null &&
      character?.downloadURLs !== undefined
    ) {
      const randomIndex = Math.floor(
        Math.random() * character?.downloadURLs.length
      );
      imageUrl = character?.downloadURLs[randomIndex];
    }
    return {
      title: character?.title,
      imageUrl,
    };
  });
  return (
    <div className="card">
      <h1>Characters</h1>
      <Lists props={characters} route="characters" />
    </div>
  );
}

// export async function getServerSideProps() {}
