import { ReactElement } from 'react';
import LogoutButton from '../buttons/LogoutButton';
import listyLogoBlack from '../../assets/listyLogoBlack.svg';
import { useAppSelector } from '../../redux/hooks';

export const LogoNavbar = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	return (
		<>
			{ authState.isAuthenticated && (
				<div className='flex h-[10vh]  sticky items-center w-full justify-between border-2'>
					<div>
						<img className='black-listy-nav-logo h-[10vh] ' src={listyLogoBlack} />
					</div>
					<div>
						<LogoutButton />
					</div>
				</div>
			)}
		</>
	);
};
