import { useAuth0 } from '@auth0/auth0-react';
import { Add } from './Add';
import { ReactElement } from 'react';

const Profile = (): ReactElement => {
	const { user, isAuthenticated } = useAuth0();

	return isAuthenticated ? (
		<main className='profile-page-div'>
			<article>
				<section className='profile-nav-bar'>
					{user?.picture && <img className='profile-pic' src={user.picture} />}
					<h2 className='profile-name'>{user?.nickname}</h2>
					<button className='friends-button'>
						<img
							className='friends-icon'
							src='https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/537/original/friends.png'
						/>
					</button>
				</section>
				<div className='posts-container'>
					<Add />
				</div>
			</article>
		</main>
	) : (
		<></>
	);
};

export default Profile;
