import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeJwtCookie } from '../../utils/LoginServices';

const LogoutButton = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		removeJwtCookie();
		dispatch({ type: 'LOGOUT' });
	};

	return authState.isAuthenticated ? (
		<button className='logout-button' onClick={() => logoutHandler()}>
			Logout
		</button>
	) : (
		<></>
	);
};

export default LogoutButton;
