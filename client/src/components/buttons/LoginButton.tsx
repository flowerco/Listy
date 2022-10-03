import { ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const LoginButton = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();

	const loginHandler = () => {
		dispatch({ type: 'LOGIN' });
	};

	return !authState.isAuthenticated ? (
		<button className='login-button' onClick={() => loginHandler()}>
			Log In
		</button>
	) : (
		<></>
	);
};

export default LoginButton;
