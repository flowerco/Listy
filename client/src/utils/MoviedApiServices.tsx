const baseURL = 'http://movied.herokuapp.com';

export const searchMovies = async (title: string) => {
	return await fetchMovies(`/search?q=${title}`);
};

export const fetchCategories = async () => {
	const response = await fetch(`${baseURL}/categories`);
	return response.json();
}

export const fetchMovies = async (url: string) => {
	const response = await fetch(`${baseURL}${url}`);
	const movieList = await response.json();
	return movieList.map(
		(movie: {
			title: string;
			genre_ids: number[];
			poster_path: string;
			backdrop_path: string;
		}) => {

			return {
				title: movie.title,
				genre: movie.genre_ids[0]?.toString() || '',
				poster_path: movie.poster_path,
				backdrop_path: movie.backdrop_path,
			};
		}
	);
};
