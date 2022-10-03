import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';

const LoginButton = (): ReactElement => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const authState = useAppSelector((state) => state.authReducer);
	return !authState.isAuthenticated ? (
		<button className='login-button' onClick={() => loginWithRedirect()}>
			Log In
		</button>
	) : (
		<></>
	);
};

export default LoginButton;
