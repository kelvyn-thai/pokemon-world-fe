export const extractQueryParams = (url: string | null): string | null => {
  if (!url) return null;
  const queryIndex = url.indexOf("?");
  return queryIndex !== -1 ? url.slice(queryIndex) : null;
};
