import { stringify } from 'querystring';

const baseURL = 'http://movied.herokuapp.com';

export const searchMovies = async (title: string) => {
	return await fetchMovies(`/search?q=${title}`);
};

export const fetchMovies = async (url: string) => {
	const response = await fetch(`${baseURL}${url}`);
	// await movieList.json();
	const movieList = await response.json();
	return movieList.map(
		(movie: {
			title: string;
			genre_ids: string[];
			poster_path: string;
			backdrop_path: string;
		}) => {
			return {
				title: movie.title,
				genre: movie.genre_ids[0],
				poster_path: movie.poster_path,
				backdrop_path: movie.backdrop_path,
			};
		}
	);
};
