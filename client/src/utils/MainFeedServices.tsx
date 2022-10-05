import axios from 'axios';
import { PostObj } from '../../customTypes';
const postsBaseUrl = 'http://localhost:3030';

export const fetchPosts: () => Promise<PostObj[]> = async () => {
	try {
		// TODO: MAKE THIS DYNAMIC USING REDUX/COOKIES
		// const res = await axios.get(postsBaseUrl + `/mainfeed/${userid}`);
		const res = await axios.get(postsBaseUrl + `/mainfeed`,
			// { headers: { Authorization: "Bearer " + cookie } }
			{ withCredentials: true }
		);
		return res.data;
	} catch (error) {
		console.log('MAINFEED FETCHPOST: ', error);
	}
};
