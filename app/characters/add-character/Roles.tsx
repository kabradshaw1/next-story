import { useRolesQuery } from '@/generated/graphql';

export default function Roles(): JSX.Element {
  const { data, loading, error } = useRolesQuery();
  if (loading) return <p>Loading...</p>;
  if (error !== null) return <p>Error: {error?.message}</p>;
  const roles = data?.roles;

  return (
    <>
      {roles !== null &&
        roles?.map((role) => {
          return (
            <div key={role?.id}>
              <p>{role?.title}</p>
              <p>{role?.organization?.title}</p>
            </div>
          );
        })}
    </>
  );
}
