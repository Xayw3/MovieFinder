type Movies = {
  adult: boolean,
  'backdrop_path': string,
  'genre_ids': number[],
  id: number,
  'media_type': string,
  'original_language': string,
  'original_title': string,
  overview: string,
  popularity: number,
  'poster_path': string,
  'release_date': string,
  title: string,
  video: boolean,
  'vote_average': number,
  'vote_count': number
};

export type Movie = {
  adult: boolean,
  'backdrop_path': string | null,
  'belongs_to_collection': null,
  budget: number,
  genres: Genres[],
  homepage: string,
  id: number,
  'imdb_id': string,
  'original_language': string,
  'original_title': string,
  overview: string,
  popularity: number,
  'poster_path': string,
  'production_companies': ProductionCompanies[],
  'production_countries': ProductionCountries[],
  'release_date': string,
  revenue: number,
  runtime: number,
  'spoken_languages': SpokenLanguages[],
  status: string,
  tagline: string,
  title: string,
  video: string,
  'vote_average': number,
  'vote_count': number
}

export type Genres = {
  id: number,
  name: string
}

export type ProductionCompanies = {
  id: number,
  'logo_path': string,
  name: string,
  'origin_country': string
}

export type ProductionCountries = {
  'iso_3166_1': string,
  name: string
}

export type SpokenLanguages = {
  'english_name': string,
  'iso_639_1': string,
  name: string
}

export type Actors = {
  adult: boolean,
  'cast_id': number,
  character: string,
  'credit_id': string,
  gender: number,
  id: number,
  'known_for_department': string,
  name: string,
  order: number,
  'original_name': string,
  popularity: number,
  'profile_path': string,
}

export type Videos = {
  id: string,
  'iso_639_1': string,
  'iso_3166_1': string,
  key: string,
  name: string,
  official: string,
  'published_at': string
  site: string,
  size: number,
  type: string
}

export default Movies;
