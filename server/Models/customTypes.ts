import mongoose from 'mongoose';

export interface PostType {
	userId: string;
	title: string;
	rating: string;
	genre: string;
	image: string;
	smallImage: string;
	likes: [string];
}

export interface UserType {
	_id: string;
	username: string;
	email: string;
	password: string;
	followers: string[];
	following: string[];
	picture: string;
}

export interface SafeUserType {
	_id: string;
	username: string;
	followers: string[];
	following: string[];
	picture: string;
}

export interface UserDoc extends UserType {
	_doc?: any;
}

export interface CookieType {
	expiresAt: number;
	userId: string;
	iat: number;
}
