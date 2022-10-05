import './App.css';
import { ReactElement, useEffect, useState } from 'react';
import Profile from './components/Profile';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbars/Navbar';
import { LogoNavbar } from './components/Navbars/LogoNavbar';
import { MainFeed } from './components/pages/MainFeed';
import { SearchPage } from './components/pages/SearchPage';
import SignUpPage from './components/pages/SignUpPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { validateJwtCookie } from './utils/LoginServices';

function App(): ReactElement {
	const authState = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Send an initial login request using the checkToken middleware.
		// If it returns a success status code then we will have validated
		// the existing login and can set the state accordingly.
		validateJwtCookie().then((res) => {
			if (res !== 'LOGOUT') {
				dispatch({ type: 'LOGIN', payload: res });
			}
		});
	}, []);

	return (
		<BrowserRouter>
			<LogoNavbar />

			<section className='flex fixed h-[80vh] w-full bg-teal-600'>
				{authState.isAuthenticated ? (
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<SignUpPage />} />
						<Route path='/mainfeed' element={<MainFeed />} />
						<Route path='/search' element={<SearchPage />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/' element={<Navigate replace to='/mainfeed' />} />
					</Routes>
				) : (
					<Routes>
						<Route path='*' element={<LoginPage />} />
					</Routes>
				)}
			</section>

			<Navbar />
		</BrowserRouter>
	);
}

export default App;
