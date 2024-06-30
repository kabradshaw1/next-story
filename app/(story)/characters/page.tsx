import Link from 'next/link';

import List from '@/components/main/List';
import fetchList from '@/lib/fetchList';

export default async function CharactersPage(): Promise<JSX.Element> {
  const characters = await fetchList('characters');

  return (
    <div className="mx-auto mt-8">
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
