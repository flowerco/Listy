import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeJwtCookie } from '../../utils/LoginServices';
import { useNavigate } from 'react-router-dom';
const LogoutButton = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const logoutHandler = () => {
		removeJwtCookie();
		dispatch({ type: 'LOGOUT' });
		navigate('/login');
	};

	return authState.isAuthenticated ? (
		<button
			className=' bg-milita-green h-[6vh] w-24 rounded-xl text-white font-extrabold mr-5 shadow-xl'
			onClick={() => logoutHandler()}
		>
			Logout
		</button>
	) : (
		<></>
	);
};

export default LogoutButton;
