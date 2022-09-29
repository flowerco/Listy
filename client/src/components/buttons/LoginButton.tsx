import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';

const LoginButton = (): ReactElement => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	return !isAuthenticated ? (
		<button className='login-button' onClick={() => loginWithRedirect()}>
			Log In
		</button>
	) : (
		<></>
	);
};

export default LoginButton;
