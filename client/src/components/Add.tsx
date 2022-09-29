import { useState, useEffect } from 'react';
import './Add.css';
const FileBase64 = require('react-file-base64');
import { useAuth0 } from '@auth0/auth0-react';

export const Add = () => {
	const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
	const [posts, setPosts] = useState([]);
	const [name, setName] = useState('');
	const [rating, setRating] = useState('');
	const [genre, setGenre] = useState('');
	const [image, setImage] = useState('');
	const [popupActive, setPopupActive] = useState(false);

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const token = await getAccessTokenSilently();

				const response = await fetch('http://localhost:3030/api/users/posts', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const responseData = await response.json();
				setPosts(responseData);
			} catch (error) {
				console.error('Error: ', error);
			}
		};
		fetchUserPosts();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();

		const onPostAdded = async (obj) => {
			let accessToken = '';
			const opts = {
				audience: 'http://localhost:3030',
				scope: 'write:posts openid',
			};
			try {
				accessToken = await getAccessTokenSilently(opts);
			} catch (e) {
				console.warn(
					'consent required as we are running in localhost. Using workaround https://github.com/auth0/auth0-react/issues/65'
				);
				accessToken = await getAccessTokenWithPopup(opts);
			}

			const newPost = await fetch('http://localhost:3030/api/posts', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					name: name,
					rating: rating,
					genre: genre,
					image: image,
				}),
			});
			// TODO: add error handling
			const res = await newPost.json();
			setPosts([...posts, res]);
		};

		onPostAdded();

		//clears out the fields after post
		setName('');
		setRating('');
		setGenre('');
		setImage('');
	};

	const deletePost = async (id) => {
		const data = await fetch(
			'http://localhost:3030/api/posts/post/delete/' + id,
			{
				method: 'DELETE',
			}
		).then((res) => res.json());

		setPosts((posts) => posts.filter((post) => post._id !== data._id));
	};

	return (
		<div>
			<link
				href='https://fonts.googleapis.com/icon?family=Material+Icons'
				rel='stylesheet'
			></link>

			<div className='addPopup' onClick={() => setPopupActive(true)}>
				<img
					className='add-logo'
					src='https://icons.veryicon.com/png/o/object/material-design-icons/add-49.png'
				/>
			</div>

			{popupActive ? (
				<div className='popup'>
					<div className='modal-content'>
						<button
							className='close-modal'
							onClick={() => setPopupActive(false)}
						>
							CLOSE
						</button>

						<form onSubmit={onSubmit} encType='multipart/form-data'>
							<div className='all-inputs'>
								<div className='upload'>
									<i className='material-icons'>add_photo_alternate</i>
									<FileBase64
										type='file'
										multiple={false}
										onDone={({ base64 }) => setImage({ base64 })}
										value={image}
									/>
								</div>

								<div className='name-input-div'>
									<label>Name</label>
									<input
										required
										className='add-post-input'
										name='name'
										type='text'
										placeholder='movie/tv-show name'
										onChange={(e) => setName(e.target.value)}
										value={name}
									/>
								</div>

								<div className='rating-input-div'>
									<label>Rating</label>
									<input
										required
										className='add-post-input'
										name='rating'
										type='text'
										placeholder='rating'
										onChange={(e) => setRating(e.target.value)}
										value={rating}
									/>
								</div>

								<div className='genre-input-div'>
									<label>Genre</label>
									<input
										required
										className='add-post-input'
										name='genre'
										type='text'
										placeholder='genre'
										onChange={(e) => setGenre(e.target.value)}
										value={genre}
									/>
								</div>
							</div>
							<button className='post-modal'>POST</button>
						</form>
					</div>
				</div>
			) : (
				''
			)}

			<section className='posts-container'>
				{posts.map((post) => (
					<div className='image-and-post' key={post._id}>
						<img className='post-image' src={post.image} />
						<section className='post-container'>
							<h1 className='post-name'>{post.name}</h1>
							<p className='post-rating'>{post.rating}</p>
							<p className='post-genre'>{post.genre}</p>
							<button
								className='delete-button'
								onClick={() => deletePost(post._id)}
							>
								X
							</button>
						</section>
					</div>
				))}
			</section>
		</div>
	);
};
