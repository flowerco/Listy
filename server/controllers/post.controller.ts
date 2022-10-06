import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import jwt_decode from 'jwt-decode';
import { CookieType } from '../models/customTypes';


export const createPost = async (req: Request, res: Response) => {
	try {
		const post = new Post({
			userId: req.body.userId,
			title: req.body.title,
			rating: req.body.rating,
			genre: req.body.genre,
			image: req.body.image,
			smallImage: req.body.smallImage,
			likes: [],
		});
		await post.save();
		console.log(req.body);
		res.status(201).json(post);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
};


export const deletePost = async (req: Request, res: Response) => {
	try {
		const result = await Post.findByIdAndDelete(req.params.id);
		res.json(result);
	} catch (error) {
		console.log(error);
	}
};


export const toggleLike = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			if (!post.likes.includes(req.body.userId)) {
				await post.updateOne({ $push: { likes: req.body.userId } });
				res.status(200).json('The post has been liked');
			} else {
				await post.updateOne({ $pull: { likes: req.body.userId } });
				res.status(200).json('The post has been disliked');
			}
		}
	} catch (error) {
		res.status(500).json(error);
	}
};


export const getPost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllPosts = async (req: Request, res: Response) => {
	try {
		const cookie: CookieType = jwt_decode(req.cookies.sessionJwt);
		const currUser = await User.findById(cookie.userId);
		const userPosts = await Post.find({ userId: cookie.userId });
		const friendPosts = await Promise.all(
			currUser!.following.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		res.json(userPosts.concat(...friendPosts));
	} catch (error) {
		res.status(500).json(error);
	}
};


export const deleteAllPosts = async (req: Request, res: Response) => {
  try {
    const cookie: CookieType = jwt_decode(req.cookies.sessionJwt);
    await Post.deleteMany({ userId: cookie.userId });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json(error);
  }
};
