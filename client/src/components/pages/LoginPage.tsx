import LoginButton from '../buttons/LoginButton';
import SignUpButton from '../buttons/SignUpButton';
import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';
const blackListyLogo = require('../../assets/listyLogoBlack.svg');

export const LoginPage = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	// if (isLoading) {
	// 	return <div>Login Loading...</div>;
	// }

	return !authState.isAuthenticated ? (
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
