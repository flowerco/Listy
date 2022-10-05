import { Request, Response, NextFunction, Router } from 'express';
import { User } from '../models/User';
import { UserType, SafeUserType, CookieType } from '../models/customTypes';
import bcrypt from 'bcrypt';
import { createSession, expireSession } from '../session/stateless';
import jwt_decode from "jwt-decode";
import { nextTick } from 'process';

// //REGISTER
export const register = async (req: Request, res: Response) => {
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

        const sessionJwt = createSession(user._id);
        console.log('New session JWT created: ', sessionJwt);
        res.cookie('sessionJwt', sessionJwt);
        
		const safeUser: SafeUserType = {
			_id: user._id,
			picture: user.picture,
			username: user.username,
			followers: user.followers,
			following: user.following,
		};

		res.status(200).json(sessionJwt);
	} catch (error) {
		// console.log(error)
		res.status(500).json(error);
	}
};

// VERIFY 
const validateJwt = (cookie: CookieType) => {
    const currentTimeStamp = new Date().getTime() / 1000;
    const jwtExpired = cookie.expiresAt <= currentTimeStamp;
    // TODO: Check the JWT hash?
    if (jwtExpired) {
        throw new Error('Invalid cookie');
    }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.cookies.sessionJwt;
        console.log('JWT found: ', jwt);
        const cookie: CookieType = jwt_decode(jwt);
        console.log('Validating cookie: ', cookie);
        if (cookie) {
            validateJwt(cookie);
            res.locals.userId = cookie.userId;
            next();
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
        console.log('Cookie validated, sending user ID: ', res.locals.userId);
        res.send(JSON.stringify({ userId: res.locals.userId }));
    } catch (err) {
        console.log('Error in server validated cookie response: ', err);
    }
} 

export const removeToken = (req: Request, res: Response) => {
    try {
        const sessionJwt = expireSession();
        console.log('Expired JWT created: ', sessionJwt);
        res.cookie('sessionJwt', sessionJwt);
        res.status(204).json(sessionJwt);
    } catch (err) {
        console.log('Error removing cookie in backend: ', err);
    }
}