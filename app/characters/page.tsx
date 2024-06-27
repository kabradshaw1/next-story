import Link from 'next/link';

import List from '@/components/main/List';

import fetchCharacters from './fetchCharacters';

export default async function CharactersPage(): Promise<JSX.Element> {
  const characters = (await fetchCharacters()) as Array<{
    title: string;
    imageUrl: string | undefined;
  }>;

  return (
    <div className="card mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Characters</h2>
      <div className="mb-4">
        <Link className="btn glow-on-hover" href="/characters/add-character">
          Create A Character
        </Link>
      </div>
      <div>
        <List props={characters} route="characters" />
      </div>
    </div>
  );
}
