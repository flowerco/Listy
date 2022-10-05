import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { fetchPosts } from '../../utils/MainFeedServices';
import { PostObj } from '../../../customTypes';
import { useAppSelector } from '../../redux/hooks';

export const MainFeed = (): ReactElement => {
	const userState = useAppSelector((state) => state.authReducer);
	const [posts, setPosts] = useState([] as PostObj[]);

	useEffect(() => {
		fetchPosts().then((res) => setPosts(res));
	}, []);

	return (
		<main className='flex w-full items-center flex-col'>
			<h1 className='mainfeed-title text-[5vh]'>MainFeed</h1>
			<section>
				{posts ? (
					posts.map((post) => (
						<div className='image-and-post' key={post.id}>
							<img
								className='post-image'
								src={`https://image.tmdb.org/t/p/w300${post.image}`}
							/>
							<section className='post-container'>
								<h1 className='post-name'>{post.title}</h1>
								<p className='post-rating'>{post.rating}</p>
								<p className='post-genre'>{post.genre}</p>
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
