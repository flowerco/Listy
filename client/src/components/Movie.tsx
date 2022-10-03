export class Movie {
  // 'id': number;
  'title': string;
  // 'overview': string;
  'poster_path': string;
  // 'tagline': string;
  // 'vote_average': number;
  // 'production_company': string;
  'genre': string;

  private imageBaseURL? = 'https://image.tmdb.org/t/p/w300';

  // TODO: Need to specify the data type coming out of the API...
  static parse(data: any) {
    const movie = Object.assign(new Movie(), data);

    if (data.production_companies) {
      movie.production_company = data.production_companies[0].name;
    }
    if (data.genres) {
      movie.genre = data.genres[0].name;
    }

    return movie;
  }

  posterURL = () => {
    return this.poster_path ? `${this.imageBaseURL}${this.poster_path}` : '';
  }
}
