import axios from 'axios';
import { PostObj } from '../../customTypes';
const postsBaseUrl = 'http://localhost:3030';

export const fetchPosts: () => Promise<PostObj[]> = async () => {
	try {
		//HAVE TO MAKE THIS DYNAMIC
		const res = await axios.get(
			postsBaseUrl + '/mainfeed/633ac19b5a962a9832a3b7d2'
		);
		return res.data;
	} catch (error) {
		console.log('ERROR IN MAINFEED - FETCHPOST', error);
	}
};
