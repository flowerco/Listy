import React from 'react';
import ReactDOM from 'react-dom';
import LoginButton from '../components/buttons/LoginButton';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('LoginButton Tests', () => {
	it('should display a button', () => {
		render(
			<Provider store={store}>
				<LoginButton />
			</Provider>
		);
	});
});

// test('Click', () => {
// 	const { container } = render(<LoginButton/>);
// 	const button =
// });
