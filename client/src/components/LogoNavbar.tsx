const blackListyLogo = require('./pictures/listyLogoBlack.svg');
const LogoutButton = require('./buttons/LogoutButton');
import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';

export const LogoNavbar = (): ReactElement => {
	const { isAuthenticated } = useAuth0();

	return isAuthenticated ? (
		<>
			<img className='black-listy-nav-logo' src={blackListyLogo} />
			<LogoutButton />
		</>
	) : (
		<></>
	);
};
