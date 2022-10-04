import './App.css';
import { ReactElement, useState } from 'react';
import Profile from './components/Profile';
import LoginPage from './components/pages/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbars/Navbar';
import { LogoNavbar } from './components/Navbars/LogoNavbar';
import { MainFeed } from './components/pages/MainFeed';
import { SearchPage } from './components/pages/SearchPage';
import SignUpPage from './components/pages/SignUpPage';

function App(): ReactElement {
	return (
		<BrowserRouter>
			<LogoNavbar />

			<section className='flex fixed h-[80vh] w-full bg-teal-600'>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<SignUpPage />} />
					<Route path='/mainfeed' element={<MainFeed />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/' element={<Navigate replace to='/login' />} />
				</Routes>
			</section>

			<footer className='flex bg-blue-400 h-[10vh] w-full fixed bottom-0'>
				<Navbar />
			</footer>
		</BrowserRouter>
	);
}

export default App;
