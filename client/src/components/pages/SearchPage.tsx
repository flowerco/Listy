import { FormEvent, ReactElement, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import React from 'react';
import { searchMovies } from '../../utils/MoviedApiServices';
import { Movie } from '../../../customTypes';
import SearchList from './SearchList';
import '../PostForm.css';
import { onPostAdded } from '../../utils/PostFormServices';
import { TextField } from '@mui/material';
import { MovieCard } from '../MovieCard';

export const SearchPage = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const initialState = { title: '', genre: '', image: '', rating: '' };

	const [formState, setFormState] = useState(initialState);
	const [searchList, setSearchList] = useState([] as Movie[]);
	const [popupActive, setPopupActive] = useState(false);
	const [movie, setMovie] = useState(initialState);

	// Function to search for movies as the title is typed
	const handleFormChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newVal = event.target.value;
		setFormState({ ...formState, title: newVal });
		newVal === ''
			? setSearchList([])
			: setSearchList(await searchMovies(newVal));
	};

	// Function to select a movie and open a modal popup when clicked
	const handleMovieClick = (movie: Movie) => {
		setPopupActive(true);
		setMovie({
			title: movie.title,
			genre: movie.genre,
			image: movie.poster_path,
			rating: '4/10',
		});
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		const newPost = await onPostAdded({
			userId: '6339ea6ea686a0ddcd561ffd',
			id: '',
			...formState,
		});
		// TODO: Update state in redux
		// dispatch({ type:'ADD_POST', payload: newPost });
		setPopupActive(false);
		setFormState(initialState);
	};

	return authState.isAuthenticated ? (
		<div className='flex w-full h-full items-center justify-center'>
			<main className='flex fixed bg-yellow-600 justify-center shadow-2xl items-center rounded-xl h-[60vh] w-[80vw]'>
				{popupActive ? (
					<MovieCard
						movie={movie}
						popupCallback={setPopupActive}
						submitCallback={onSubmit}
					/>
				) : (
					<></>
				)}
				<section className='search-container justify-center'>
					<label className='my-4'>Search for Movies/TV:</label>
					<TextField
						variant='outlined'
						label='Start your adventure...'
						className='search-bar'
						type='text'
						onChange={handleFormChange}
						value={formState.title}
					/>

					<SearchList media={searchList} callback={handleMovieClick} />
				</section>
			</main>
		</div>
	) : (
		<></>
	);
};
