const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s+]/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove all non-word characters except for hyphens
};

export default createSlug;