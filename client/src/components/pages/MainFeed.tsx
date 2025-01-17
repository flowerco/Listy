import { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { fetchPosts } from '../../utils/MainFeedServices';
import { PostObj } from '../../../customTypes';

export const MainFeed = (): ReactElement => {
	const [posts, setPosts] = useState([] as PostObj[]);

	useEffect(() => {
		fetchPosts().then((res) => {
			return setPosts(res);
		});
	}, []);

	return (
		<main className='flex h-[80vh] w-full items-center flex-col'>
			<h1 className='mainfeed-title text-[5vh] mt-4'>MainFeed</h1>
			<section className='overflow-auto mt-4'>
				{posts[0] ? (
					posts.map((post, index) => (
						<div className='image-and-post' key={index}>
							<img
								className='post-image object-cover'
								src={`https://image.tmdb.org/t/p/w300${post.smallImage}`}
							/>
							<section className='post-container shadow-md'>
								<div className='h-full px-2 flex flex-col justify-evenly'>
									<p className='font-bold'>{post.title}</p>
									<p>Genre: {post.genre}</p>
									<p>My Rating: <span className='font-semibold'>{post.rating} / 10</span></p>
								</div>
							</section>
						</div>
					))
				) : (
					<h1>No posts yet, head to the search page!</h1>
				)}
			</section>
		</main>
	);
};
