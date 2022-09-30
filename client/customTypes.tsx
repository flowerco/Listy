import { ObjectId } from 'bson';

export type PostObj = {
	_id: ObjectId;
	image: string;
	name: string;
	rating: string;
	genre: string;
};
