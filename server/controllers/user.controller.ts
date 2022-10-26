import { User } from '../Models/User';
import { Request, Response } from 'express';
import { UserDoc } from '../Models/customTypes';

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await User.find();
	res.status(200).json(users);
};

export const getByNameOrId = async (req: Request, res: Response) => {
	const userId = req.body.userId;
	const username = req.body.username;
	try {
		const user: UserDoc | null = userId
			? await User.findById(userId)
			: await User.findOne({ username: username });
		// remove properties we don't need
		if (user) {
			const { password, email, ...other } = user._doc;
			res.send(other);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const userId = req.body.userId;
	try {
		await User.deleteOne({ _id: userId });
		res.sendStatus(204);
	} catch (err) {
		console.log('Error in deleteUser controller: ', err);
		res.sendStatus(500);
	}
};

export const toggleFollowUser = async (req: Request, res: Response) => {
	const targetUserId = req.body.userId;
	const currUserId = req.body.currUser;
	try {
		const currUser = await User.findById(currUserId);
		const targetUser = await User.findById(targetUserId);
		// If we currently follow the target user, then remove them from the followed list
		if (currUser !== targetUser) {
			if (currUser?.followers.includes(targetUserId)) {
				await currUser.updateOne({ $pull: { followers: targetUserId } });
				await targetUser?.updateOne({ $pull: { following: currUserId } });
				res.sendStatus(200);
			}
			// If we don't follow them yet, then add them to the followed list.
			else {
				await currUser?.updateOne({ $push: { followers: targetUserId } });
				await targetUser?.updateOne({ $push: { following: currUserId } });
				res.sendStatus(200);
			}
		}
	} catch (err) {
		console.log('Error toggling follow status: ', err);
	}
};
