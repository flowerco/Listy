import mongoose from "mongoose";

export interface PostType {
  userId: string;
  name: string;
  rating: string;
  genre: string;
  image: string;
  likes: [string];
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  followers: [];
  following: [];
}

export interface UserDoc extends UserType {
  _doc?: any
}
