const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s+]/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters except for hyphens
};

export default createSlug;

export function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
