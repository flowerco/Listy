import './App.css';
import { ReactElement, useState } from 'react';
import Profile from './components/Profile';
import { LoginPage } from './components/pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbars/Navbar';
import { LogoNavbar } from './components/Navbars/LogoNavbar';
import { MainFeed } from './components/pages/MainFeed';
import { SearchPage } from './components/pages/SearchPage';
import React from 'react';

function App(): ReactElement {
	const [isAuthenticated, setAuthenticated] = useState(true);

	return (
		<BrowserRouter>
			<nav className='nav-top'>
				<LogoNavbar isAuthenticated={isAuthenticated} />
			</nav>

			<section className='main-content'>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element='' />
					<Route path='/profile/:username' element='' />
					<Route path='/' element={<MainFeed />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</section>

			<footer className='nav-bottom'>
				<Navbar isAuthenticated={isAuthenticated} />
			</footer>
		</BrowserRouter>
	);
}

export default App;
