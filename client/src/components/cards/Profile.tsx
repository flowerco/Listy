import { ReactElement, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { getUser } from '../../utils/SignUpServices';

const Profile = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);

	// Temporary hardcoded user data
	const	userImg = '/profile-img.png'

	const initialState = { _id: '', username: '', followers: [], following: []}

	const [user, setUser] = useState(initialState)

	useEffect(() => {
		getUser(authState.userId).then(res => {
			setUser(res);
		})
	}, [])

	return authState.isAuthenticated ? (
		<main className='profile-page-div'>
			<article>
				<section className='profile-nav-bar items-center justify-between'>
					<div className='flex items-center justify-start'>
						{userImg && (
							<img
								className='profile-pic mx-7 rounded-full h-[10vh]'
								src={userImg}
							/>
						)}
						<h2 className='profile-name'>{user?.username}</h2>
					</div>
					<div className='flex flex-col justify-center items-center h-[10vh] px-6'>
						<button className='friends-button h-full'>
							<img
								className='object-center h-[5vh]'
								src='https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/537/original/friends.png'
							/>
						</button>
						<h3>Following: {user.following.length} </h3>
					</div>
				</section>
			</article>
		</main>
	) : (
		<></>
	);
};

export default Profile;
