export const createSlug = (title: string | undefined): string | undefined => {
  if (title === undefined) return undefined;
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s+]/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters except for hyphens
};

export function slugToTitle(slug: string): string {
  const lowercaseWords = [
    'the',
    'and',
    'of',
    'or',
    'a',
    'an',
    'in',
    'on',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
  ];

  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !lowercaseWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(' ');
}
