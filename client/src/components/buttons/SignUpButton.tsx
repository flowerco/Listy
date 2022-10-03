import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';

const SignUpButton = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const signupHandler = () => {};

	return !authState.isAuthenticated ? (
		<button className='signup-button' onClick={() => signupHandler()}>
			Sign Up
		</button>
	) : (
		<></>
	);
};

export default SignUpButton;

// Make a handler that changes state and then communicates with backend
