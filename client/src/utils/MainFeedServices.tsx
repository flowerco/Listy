import axios from 'axios';
import { PostObj } from '../../customTypes';
const postsBaseUrl = 'http://localhost:3030/api/posts';

export const fetchPosts: () => Promise<PostObj[]> = async () => {
	try {
		//HAVE TO MAKE THIS DYNAMIC
		const res = await axios.get(postsBaseUrl + '/mainfeed/5544378348931826');
		return res.data;
	} catch (error) {
		console.log('ERROR IN MAINFEED - FETCHPOST', error);
	}
};
