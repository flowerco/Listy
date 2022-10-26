import { ReactElement, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import React from 'react';
import { fetchCategories, searchMovies } from '../../utils/MoviedApiServices';
import { Movie } from '../../../customTypes';
import SearchList from './SearchList';
import '../Components.css';
import { TextField } from '@mui/material';
import { MovieCard } from '../cards/MovieCard';
import { postPost } from '../../utils/MainFeedServices';

export const SearchPage = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	const initialState = {
		title: '',
		genre: '',
		image: '',
		smallImage: '',
		rating: '',
	};

	const [formState, setFormState] = useState(initialState);
	const [searching, setSearching] = useState(false);
	const [searchList, setSearchList] = useState([] as Movie[]);
	const [popupActive, setPopupActive] = useState(false);
	const [movie, setMovie] = useState(initialState);

	// Function to search for movies as the title is typed
	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newVal = event.target.value;
		setFormState({ ...formState, title: newVal });
		if (newVal === '') {
			setSearching(false);
			setSearchList([]);
		} else {
			setSearching(true);
			setSearchList(await searchMovies(newVal));
		}
	};

	// Function to select a movie and open a modal popup when clicked
	const handleMovieClick = async (movie: Movie) => {
		setSearching(false);
		setPopupActive(true);
		const categoryList = await fetchCategories();
		const genreObj = categoryList.filter((cat: {id: number, name: string}) => cat.id.toString() === movie.genre)
		setMovie({
			title: movie.title,
			genre: genreObj[0].name,
			image: movie.poster_path,
			smallImage: movie.backdrop_path,
			rating: '',
		});
	};

	const closePopup = () => {
		setPopupActive(false);
		setFormState(initialState);
		setSearchList([]);
	};

	const onSubmit = async (
		rating: string,
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const intRating = parseInt(rating);

		if (intRating && intRating >= 0 && intRating <= 10) {
			await postPost({
				title: movie.title,
				genre: movie.genre,
				image: movie.image,
				smallImage: movie.smallImage,
				rating,
				id: '',
				userId: authState.userId,
			});
			closePopup();
		} else {
			return alert('Enter a rating from 0 to 10');
		}
	};

	return authState.isAuthenticated ? (
		<div className='flex w-full h-full items-center justify-center'>
			<main className='flex fixed justify-center shadow-2xl items-center rounded-xl h-[60vh] w-[80vw] mb-[20vh]'>
				{popupActive ? (
					<MovieCard
						movie={movie}
						popupCallback={setPopupActive}
						submitCallback={onSubmit}
					/>
				) : (
					<></>
				)}
				<section className='search-container'>
					<label className=''>Search for Movies/TV:</label>
					<TextField
						variant='outlined'
						label='Start your adventure...'
						className='search-bar'
						type='text'
						onChange={handleFormChange}
						value={formState.title}
					/>

					<SearchList media={searchList} searching={searching} callback={handleMovieClick} />
				</section>
			</main>
		</div>
	) : (
		<></>
	);
};
