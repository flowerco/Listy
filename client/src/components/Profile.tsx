import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement, useState } from 'react';
import { useAppSelector } from '../redux/hooks';

const Profile = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	// Temporary hardcoded user data
	const user = {
		nickname: 'Barry Smithberginssøn',
		id: '6339ea6ea686a0ddcd561ffd',
		picture: 'https://avatars.githubusercontent.com/u/66141971?v=4',
	};

	return authState.isAuthenticated ? (
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
			</article>
		</main>
	) : (
		<></>
	);
};

export default Profile;
