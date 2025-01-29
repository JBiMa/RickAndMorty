interface Filters {
  [key: string]: string;
}

interface CharacterFilters extends Filters {
  species: string;
  status: string;
  gender: string;
}

interface EpisodeFilters extends Filters {
  name: string;
  episode: string;
}

interface LocationFilters extends Filters {
  name: string;
  type: string;
  dimension: string;
}

export { Filters, CharacterFilters, EpisodeFilters, LocationFilters };
