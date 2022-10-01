import { ObjectId } from 'bson';

export type PostObj = {
	id: ObjectId;
	_id: ObjectId;
	image: string;
	name: string;
	rating: string;
	genre: string;
};

export type PostData = {
	name: string;
	rating: string;
	genre: string;
	image: { base64: string };
};
