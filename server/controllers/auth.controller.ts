import express, { Router } from "express";
import { User } from '../models/User';
import { UserType } from "../models/customTypes";
import bcrypt from 'bcrypt';

// //REGISTER
export const register =  async (req: express.Request, res: express.Response) =>{
    
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

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
        const user = await User.findOne({email: req.body.email}) as UserType;
        !user && res.status(404).send('user not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('wrong password');

        res.status(200).json(user);
        
    } catch (error) {
        // console.log(error)
        res.status(500).json(error);
    }

};