import { ReactElement } from 'react';
import LogoutButton from '../buttons/LogoutButton';
const blackListyLogo = require('../../assets/listyLogoBlack.svg');

export const LogoNavbar = ({ isAuthenticated } : { isAuthenticated: boolean }): ReactElement => {

	console.log('The photo for the navbar is: ', blackListyLogo)

	return isAuthenticated ? (
		<>
			<img className='black-listy-nav-logo' src={blackListyLogo} />
			<LogoutButton />
		</>
	) : (
		<></>
	);
};
