import { ReactElement } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar = (): ReactElement => {
	const { isAuthenticated } = useAuth0();

	return isAuthenticated ? (
		<nav className='nav'>
			<CustomLink to='/mainfeed'>
				<img
					className='feed-logo'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png'
				/>
			</CustomLink>
			<CustomLink to='/profile'>
				<img
					className='profile-logo'
					src='http://cdn.onlinewebfonts.com/svg/img_24787.png'
				/>
			</CustomLink>
			<CustomLink to='/search'>
				<img
					className='search-logo'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'
				/>
			</CustomLink>
		</nav>
	) : (
		<></>
	);
};

type LinkArgs = {
	to: string;
	children: ReactElement;
};

function CustomLink({ to, children, ...props }: LinkArgs) {
	const resolvedPath = useResolvedPath(to);
	// end: true says that the entire path must match
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<div className={isActive ? 'active' : ''}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</div>
	);
}
