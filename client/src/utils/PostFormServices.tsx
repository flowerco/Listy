import { useAuth0 } from '@auth0/auth0-react';
import { PostData, PostObj } from '../../customTypes';
import { ObjectId } from 'bson';
const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

export const fetchUserPosts: () => Promise<PostObj[]> = async () => {
	try {
		const token = await getAccessTokenSilently();
		const response = await fetch('http://localhost:3030/api/users/posts', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error('POSTFORMSERVICE FETCHUSERPOSTS ', error);
	}
};

export const onPostAdded = async (postData: PostData) => {
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
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(postData),
	});
	// TODO: add error handling
	const res = await newPost.json();
	return res;
};

export const deletePost = async (id: ObjectId) => {
	const data = await fetch(
		'http://localhost:3030/api/posts/post/delete/' + id,
		{
			method: 'DELETE',
		}
	).then((res) => res.json());
};

//setPosts((posts) => posts.filter((post) => post._id !== data._id));
