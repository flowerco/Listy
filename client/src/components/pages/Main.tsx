import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../Profile';
import { LoginPage } from './LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { LogoNavbar } from '../LogoNavbar';
import { MainFeed } from './MainFeed';
import { SearchPage } from './SearchPage';
import { ReactElement } from 'react';

export const Main = (): ReactElement => {
	return (
		<BrowserRouter>
			<nav className='nav-top'>
				<LogoNavbar />
			</nav>

			<section className='main-content'>
				<Routes>
					<Route path='/' element={<LoginPage />} />
					<Route path='/register' element='' />
					<Route path='/profile/:username' element='' />
					<Route path='/mainfeed' element={<MainFeed />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</section>

			<footer className='nav-bottom'>
				<Navbar />
			</footer>
		</BrowserRouter>
	);
};
