import { FormEvent, ReactElement, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import React from 'react';

export const SearchPage = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	const initialState = { title: '' };
	const [formState, setFormState] = useState(initialState);
	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = event.target.value;
		setFormState({ title: newVal });
	};

	// if (isLoading) {
	// 	return <div>SearchPage Loading...</div>;
	// }

	return authState.isAuthenticated ? (
		<main className='login-page'>
			<section className='search-container'>
				<h1 className='hello'>Hello!</h1>
				<label className='mt-4'>Search for Movies/TV:</label>
				<input
					className='search-bar'
					type='text'
					onChange={handleFormChange}
					value={formState.title}
				/>
			</section>
		</main>
	) : (
		<></>
	);
};
