import Link from 'next/link';

import { slugToTitle } from '@/lib/createSlug';

type Title = {
  title: string;
  children?: JSX.Element;
};

export default async function ListHeader({
  title,
  children,
}: Title): Promise<JSX.Element> {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold mr-4">{slugToTitle(title)}s</h2>
        <Link className="btn glow-on-hover mr-3" href={`/${title}s/create`}>
          Create {slugToTitle(title)}
        </Link>
        {children}
      </div>
    </div>
  );
}
