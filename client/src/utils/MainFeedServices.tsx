import axios from 'axios';
import { PostObj } from '../../customTypes';
const postsBaseUrl = 'http://localhost:3030';

export const fetchPosts: (userid: string) => Promise<PostObj[]> = async (
	userid: string
) => {
	try {
 		// TODO: MAKE THIS DYNAMIC USING REDUX/COOKIES
		// const res = await axios.get(postsBaseUrl + `/mainfeed/${userid}`);
		const res = await axios.get(postsBaseUrl + `/mainfeed/6339ea6ea686a0ddcd561ffd`);
		
		return res.data;
	} catch (error) {
		console.log('ERROR IN MAINFEED - FETCHPOST', error);
	}
};