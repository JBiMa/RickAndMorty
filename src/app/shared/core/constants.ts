const itemsPerPage: number = 20;

const statusSuggestions: string[] = ['alive', 'dead', 'unknown'];
const genderSuggestions: string[] = ['female', 'male', 'genderless', 'unknown'];

const suggestions = {
  status: statusSuggestions,
  gender: genderSuggestions,
};

const getValidFilters = function <T>(
  params: any,
  filters: T,
  excludedKeys: string[] = []
): T {
  return Object.keys(filters).reduce(
    (acc, key) => {
      if (!excludedKeys.includes(key) && params.hasOwnProperty(key)) {
        acc[key] = params[key];
      }
      return acc;
    },
    { ...filters } as T
  );
};

export {
  itemsPerPage,
  statusSuggestions,
  genderSuggestions,
  suggestions,
  getValidFilters,
};
