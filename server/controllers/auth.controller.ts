import { Request, Response, NextFunction } from 'express';
import { User } from '../Models/User';
import { UserType, SafeUserType, CookieType } from '../Models/customTypes';
import bcrypt from 'bcrypt';
import { createSession, expireSession, getSession } from '../session/stateless';
import jwt_decode from "jwt-decode";

// //REGISTER
export const register = async (req: Request, res: Response) => {
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

		// Save user and respond, including cookie for future request verification
		const user = await newUser.save();

		const listyJwt = createSession(user._id);
		res.cookie('listyJwt', listyJwt);

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};

// //LOGIN
export const login = async (req: Request, res: Response) => {
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

        const listyJwt = createSession(user._id);
        res.cookie('listyJwt', listyJwt);
        
		res.status(200).json(listyJwt);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.cookies.listyJwt;
        const cookie: CookieType = jwt_decode(jwt);
        if (cookie) {
						if (getSession(jwt)) {
							res.locals.userId = cookie.userId;
							next();
						} else {
							res.sendStatus(400);
						}
        } else {
            throw new Error('No cookie present');
        }
    } catch (err) {
        console.log('Error in token check: ', err);
    }
}

// ONCE THE CHECKTOKEN ABOVE HAS VALIDATED WE CAN PROVIDE THE USERID
export const validated = (req: Request, res: Response) => {
    try {
        res.send(JSON.stringify({ userId: res.locals.userId }));
    } catch (err) {
        console.log('Error in server validated cookie response: ', err);
    }
} 

export const removeToken = (req: Request, res: Response) => {
    try {
        const listyJwt = expireSession();
        res.cookie('listyJwt', listyJwt);
        res.status(204).json(listyJwt);
    } catch (err) {
        console.log('Error removing cookie in backend: ', err);
    }
}