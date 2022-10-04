import { ReactElement } from 'react';
import LogoutButton from '../buttons/LogoutButton';
import listyLogoBlack from '../../assets/listyLogoBlack.svg';
import { useAppSelector } from '../../redux/hooks';

export const LogoNavbar = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	return authState.isAuthenticated ? (
		<div className='flex h-[10vh] bg-slate-500 sticky items-center w-full justify-between'>
			<div>
				<img className='black-listy-nav-logo' src={listyLogoBlack} />
			</div>
			<div>
				<LogoutButton />
			</div>
		</div>
	) : (
		<></>
	);
};
