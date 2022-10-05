import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { fetchPosts } from '../../utils/MainFeedServices';
import { PostObj } from '../../../customTypes';
import { useAppSelector } from '../../redux/hooks';

export const MainFeed = (): ReactElement => {
	const authState = useAppSelector((state) => state.authReducer);
	const [posts, setPosts] = useState([] as PostObj[]);

	useEffect(() => {
		fetchPosts().then((res) => setPosts(res));
	}, []);

	// TODO: The 'id' property is currently '' for all posts, so we
	// use the index as the unique key. This needs to be fixed on the server side.
	return (
		<main className='flex h-[80vh] w-full items-center flex-col'>
			<h1 className='mainfeed-title text-[5vh]'>MainFeed</h1>
			<section className='overflow-auto'>
				{posts ? (
					posts.map((post, index) => (
						<div className='image-and-post' key={index}>
							<img
								className='post-image object-cover'
								src={`https://image.tmdb.org/t/p/w300${post.image}`}
							/>
							<section className='post-container shadow-2xl'>
								<p>{post.title}</p>
								<p className='post-genre'>Genre: {post.genre}</p>
								<p className='post-rating'>My Rating: {post.rating}</p>
							</section>
						</div>
					))
				) : (
					<h1>Go make a post!</h1>
				)}
			</section>
		</main>
	);
};
