import Link from 'next/link';

import { slugToTitle } from '@/lib/createSlug';
type Title = {
  title: string;
};

export default async function ListHeader({
  title,
}: Title): Promise<JSX.Element> {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold mr-4">{slugToTitle(title)}</h2>
        <Link className="btn glow-on-hover" href={`/${title}s/add-${title}`}>
          Create A {slugToTitle(title)}
        </Link>
      </div>
    </div>
  );
}
