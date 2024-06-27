import Lists from '@/components/main/Lists';

import fetchCharacters from './fetchCharacters';

export default async function CharactersPage(): Promise<JSX.Element> {
  const characters = (await fetchCharacters()) as Array<{
    title: string;
    imageUrl: string | undefined;
  }>;

  return (
    <div className="card">
      <h2>Characters</h2>
      <Lists props={characters} route="characters" />
    </div>
  );
}
