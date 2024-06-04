import Lists from '@/components/main/Lists';

export default async function CharactersPage(): Promise<JSX.Element> {
  const props = [{ title: 'Character 1', imageUrl: '/test.png' }];
  return (
    <div className="card">
      <h1>Characters</h1>
      <Lists props={props} route="characters" />
    </div>
  );
}

// export async function getServerSideProps() {}
