import { ObjectId } from 'bson';

export type PostObj = {
	id: string;
	userId: string;
	image: string;
	title: string;
	rating: string;
	genre: string;
	smallImage: string;
};

export type PostData = {
	title: string;
	rating: string;
	genre: string;
	image: string;
};

export type Movie = {
	title: string;
	poster_path: string;
	genre: string;
	backdrop_path: string;
};

export type MovieCardData = {
  title: string,
  genre: string,
  image: string
}

export type UserType = {
	_id: string;
	username: string;
	email: string;
	password: string;
	followers: string[];
	following: string[];
};


