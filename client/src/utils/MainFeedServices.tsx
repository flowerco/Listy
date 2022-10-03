import axios from 'axios';
import { PostObj } from '../../customTypes';
const postsBaseUrl = 'http://localhost:3030';

export const fetchPosts: (userid: string) => Promise<PostObj[]> = async (
	userid: string
) => {
	try {
		//HAVE TO MAKE THIS DYNAMIC
		const res = await axios.get(postsBaseUrl + `/mainfeed/${userid}`);
		return res.data;
	} catch (error) {
		console.log('ERROR IN MAINFEED - FETCHPOST', error);
	}
};
