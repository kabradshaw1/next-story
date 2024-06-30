import Link from 'next/link';

import List from '@/components/main/List';

import fetchOrganizations from './fetchOrganizations';

export default async function OrganizationsPage(): Promise<JSX.Element> {
  const organizations = await fetchOrganizations();
  return (
    <div className="card mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Organizations</h2>
      <div className="mb-4">
        <Link
          className="btn glow-on-hover"
          href="/organizations/add-organization"
        >
          Create An Organization
        </Link>
      </div>
      <div>
        <List props={organizations} route="organizations" />
      </div>
    </div>
  );
}
