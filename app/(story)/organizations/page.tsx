import List from '@/components/main/List';
import ListHeader from '@/components/main/ListHeader/ListHeader';
import fetchList from '@/lib/fetchList';

export default async function OrganizationsPage(): Promise<JSX.Element> {
  const organizations = await fetchList('organizations');
  return (
    <div className="card mx-auto mt-8">
      <ListHeader title="organization" />
      <div>
        <List props={organizations} route="organizations" />
      </div>
    </div>
  );
}
