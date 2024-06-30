import Link from 'next/link';

import List from '@/components/main/List';
import fetchList from '@/lib/fetchList';

export default async function CharactersPage(): Promise<JSX.Element> {
  const characters = await fetchList('characters');

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-bold mr-4">Characters</h2>
          <Link className="btn glow-on-hover" href="/characters/add-character">
            Create A Character
          </Link>
        </div>
      </div>
      <div>
        <List props={characters} route="characters" />
      </div>
    </div>
  );
}
