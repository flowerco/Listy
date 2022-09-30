import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { PostObj } from '../../../customTypes';
export const MainFeed = (): ReactElement => {
	const { getAccessTokenSilently } = useAuth0();
	const [posts, setPosts] = useState([] as PostObj[]);
	const postsBaseUrl = 'http://localhost:3030/api/posts';

	useEffect(() => {
		//HAVE TO MAKE THIS DYNAMIC
		const fetchPosts = async () => {
			const res = await axios.get(postsBaseUrl + '/mainfeed/5544378348931826');

			setPosts(res.data);

			console.log(res);
		};

		fetchPosts();
	}, []);

	return (
		<main>
			<h1 className='mainfeed-title'>MainFeed</h1>

			<section className='posts-container'>
				{posts.map((post) => (
					<div className='image-and-post' key={post._id.toString()}>
						<img className='post-image' src={post.image} />
						<section className='post-container'>
							<h1 className='post-name'>{post.name}</h1>
							<p className='post-rating'>{post.rating}</p>
							<p className='post-genre'>{post.genre}</p>
						</section>
					</div>
				))}
			</section>
		</main>
	);
};

// useEffect(() => {

//     const fetchMainfeedPosts = async () => {
//         try {
//             const token = await getAccessTokenSilently();

//             const response = await fetch(
//                 'http://localhost:3030/api/posts/mainfeed',
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                 }
//             );

//             const responseData = await response.json();
//             setPosts(responseData);
//         } catch (error) {
//             console.error('Error: ', error)
//         }
//     };
//     fetchMainfeedPosts();
//     }, [])
