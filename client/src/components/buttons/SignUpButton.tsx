import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';

const SignUpButton = (): ReactElement => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	const authState = useAppSelector((state) => state.authReducer);
	return !authState.isAuthenticated ? (
		<button
			className='signup-button'
			onClick={() =>
				loginWithRedirect({
					screen_hint: 'signup',
				})
			}
		>
			Sign Up
		</button>
	) : (
		<></>
	);
};

export default SignUpButton;

// Make a handler that changes state and then communicates with backend
