import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
	<Auth0Provider
		domain='listy.us.auth0.com'
		clientId='6aFL4m1lJjcg6n26300PoGgjf8fExYZ1'
		redirectUri={window.location.origin}
		audience='http://localhost:3030'
		scope='openid profile email'
	>
		<App />
	</Auth0Provider>
	// </React.StrictMode>
);
