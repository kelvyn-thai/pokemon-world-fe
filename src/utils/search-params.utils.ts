export const convertToURLSearchParams = (
  query: Record<
    string,
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | undefined
    | null
  >,
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null || value === undefined) return; // skip undefined/null

    if (Array.isArray(value) && value.length > 0) {
      const joined = value.join(",");
      searchParams.set(key, joined);
    } else {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};
