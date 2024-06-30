import List from '@/components/main/List';
import ListHeader from '@/components/main/ListHeader/ListHeader';
import fetchList from '@/lib/fetchList';

export default async function CharactersPage(): Promise<JSX.Element> {
  const characters = await fetchList('characters');

  return (
    <div className="container mx-auto mt-8">
      <ListHeader title="character" />
      <div>
        <List props={characters} route="characters" />
      </div>
    </div>
  );
}
