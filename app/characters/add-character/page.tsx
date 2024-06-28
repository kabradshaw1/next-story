import QueryProvider from '@/lib/QueryProvider';

import CharacterForm from './CharacterForm';

export default function AddCharacterPage(): JSX.Element {
  return (
    <div className="card">
      <h2>Create A Character</h2>
      <QueryProvider>
        <CharacterForm />
      </QueryProvider>
    </div>
  );
}
