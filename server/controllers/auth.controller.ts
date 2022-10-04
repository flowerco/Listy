import express, { Router } from 'express';
import { User } from '../models/User';
import { UserType, SafeUserType } from '../models/customTypes';
import bcrypt from 'bcrypt';
import { createSession } from '../session/stateless';

// //REGISTER
export const register = async (req: express.Request, res: express.Response) => {
	console.log('Calling the register controller');
	try {
		//generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		//create new user
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			followers: [],
			following: [],
		});

		console.log('New User created: ', newUser);

		//save user and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		// console.log(error)
		res.status(500).json(error);
	}
};

// //LOGIN
export const login = async (req: express.Request, res: express.Response) => {
	try {
		const user = (await User.findOne({
			email: req.body.email,
		})) as UserType;
		!user && res.status(404).send('user not found');

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json('wrong password');

        const sessionJwt = createSession(user._id);
        
		const safeUser: SafeUserType = {
			_id: user._id,
			picture: user.picture,
			username: user.username,
			followers: user.followers,
			following: user.following,
		};

		res.status(200).json(safeUser);
	} catch (error) {
		// console.log(error)
		res.status(500).json(error);
	}
};
