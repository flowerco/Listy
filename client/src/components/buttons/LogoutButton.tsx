import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';

const LogoutButton = (): ReactElement => {
	const { logout, isAuthenticated } = useAuth0();

	const authState = useAppSelector((state) => state.authReducer);

	return authState.isAuthenticated ? (
		<button className='logout-button' onClick={() => logout()}>
			Logout
		</button>
	) : (
		<></>
	);
};

export default LogoutButton;
