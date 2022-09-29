import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';

const SignUpButton = (): ReactElement => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	return !isAuthenticated ? (
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
