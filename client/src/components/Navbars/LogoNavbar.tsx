import { ReactElement } from 'react';
import LogoutButton from '../buttons/LogoutButton';
import listyLogoBlack from '../../assets/listyLogoBlack.svg';
import { useAppSelector } from '../../redux/hooks';

export const LogoNavbar = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	return authState.isAuthenticated ? (
		<>
			<img className='black-listy-nav-logo' src={listyLogoBlack} />
			<LogoutButton />
		</>
	) : (
		<></>
	);
};
