
const baseURL = 'http://movied.herokuapp.com';

export const searchMovies = async (title: string) => {
  return await fetchMovies(`/search?q=${title}`);
}

export const fetchMovies = async (url:string) => {
  const movieList = await fetch(`${baseURL}${url}`);
  await movieList.json();
  return movieList;
}