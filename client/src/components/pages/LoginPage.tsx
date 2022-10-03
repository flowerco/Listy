import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../buttons/LoginButton';
import SignUpButton from '../buttons/SignUpButton';
import { ReactElement } from 'react';
import React from 'react';
const blackListyLogo = require('../../assets/listyLogoBlack.svg');

export const LoginPage = (): ReactElement => {
	const { isLoading, isAuthenticated } = useAuth0();

	if (isLoading) {
		return <div>Login Loading...</div>;
	}

	return !isAuthenticated ? (
		<>
			<div className='login-page'>
				<img className='black-listy-logo' src={blackListyLogo} />

				<LoginButton />
				<SignUpButton />
			</div>
		</>
	) : (
		<></>
	);
};
