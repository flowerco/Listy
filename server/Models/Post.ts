// import mongoose from "mongoose";
// const Schema = new mongoose.Schema;
import { Schema, model } from "mongoose";

interface Post {
  userId: string;
  name: string;
  rating: string;
  genre: string;
  image: string;
  likes: [];
}

const PostSchema = new Schema<Post>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true
  },
  likes: {
    type: [],
  },
});

export const Post = model<Post>("Post", PostSchema);
