import { stringify } from 'querystring';

const baseURL = 'http://movied.herokuapp.com';

export const searchMovies = async (title: string) => {
	return await fetchMovies(`/search?q=${title}`);
};

export const fetchCategories = async () => {
	const response = await fetch(`${baseURL}/categories`);
	return response.json();
}

export const fetchMovies = async (url: string) => {
	console.log('Definitely running this function...')
	const response = await fetch(`${baseURL}${url}`);
	// await movieList.json();
	const movieList = await response.json();
	// const categoryList = await fetchCategories();
	// console.log('Category list: ', categoryList.slice(0,5));
	return movieList.map(
		(movie: {
			title: string;
			genre_ids: number[];
			poster_path: string;
			backdrop_path: string;
		}) => {

			// const genreObj = categoryList.filter((cat: {id: number, name: string}) => cat.id === movie.genre_ids[0])
			// console.log('Genre obj found: ', genreObj);
			return {
				title: movie.title,
				genre: movie.genre_ids[0]?.toString() || '',
				poster_path: movie.poster_path,
				backdrop_path: movie.backdrop_path,
			};
		}
	);
};
