import { ReactElement } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const SearchPage = (): ReactElement => {
	const { isLoading, isAuthenticated } = useAuth0();

	if (isLoading) {
		return <div>SearchPage Loading...</div>;
	}
	return isAuthenticated ? (
		<main className='login-page'>
			<section className='search-container'>
				<h1 className='hello'>Hello!</h1>
				<input className='search-bar' type='text' placeholder='Search' />
			</section>
		</main>
	) : (
		<></>
	);
};
