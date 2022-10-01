import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
		<App />
);
