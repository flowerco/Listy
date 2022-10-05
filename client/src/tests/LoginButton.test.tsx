import React from 'react';
import ReactDOM from 'react-dom';
import LoginButton from '../components/buttons/LoginButton';
import { render, screen, fireEvent } from '@testing-library/react';

describe('<LoginButton />', () => {
	it('should display a button', () => {
		render(<LoginButton></LoginButton>);
	});
});
