export const createSlug = (title: string | undefined): string | undefined => {
  if (title === undefined) return undefined;
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s+]/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters except for hyphens
};

export function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
