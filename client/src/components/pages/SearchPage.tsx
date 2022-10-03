import { FormEvent, ReactElement, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const SearchPage = (): ReactElement => {

	const initialState = { title: '' };
	
	const [isAuthenticated, setAuthenticated] = useState(true);
	const [formState, setFormState] = useState(initialState);

	const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVal = event.target.value;
		setFormState({ title: newVal });
	}

	// if (isLoading) {
	// 	return <div>SearchPage Loading...</div>;
	// }

	return isAuthenticated ? (
		<main className='login-page'>
			<section className='search-container'>
				<h1 className='hello'>Hello!</h1>
				<label className='mt-4'>Search for Movies/TV:</label>
					<input className='search-bar' type='text' onChange={handleFormChange} value={formState.title} />
			</section>
		</main>
	) : (
		<></>
	);
};
