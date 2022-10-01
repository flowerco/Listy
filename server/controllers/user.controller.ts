import { User } from "../models/User";
import { Post } from "../models/Post";
import express from "express";
import { UserDoc } from "../models/customTypes";

//get the users posts with Authentication -- TODO: should probably go to posts route!
export const getPosts = async (req: express.Request, res: express.Response) => {
    const posts = await Post.find({ userId: req.body.userId });
    res.status(200).json(posts);
  };


export const getAllUsers = async (req: express.Request, res: express.Response) => {
  const users = await User.find();
  res.status(200).json(users);
}

export const getByNameOrId = async (req: express.Request, res: express.Response) => {
  const userId = req.body.userId;
  const username = req.body.username;
  console.log(`Getting user with name: ${userId} and id: ${username}`);
  try {
    const user: UserDoc | null = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    //take away what we dont want to see
    if (user) {
      const { password, email, ...other } = user._doc;
      res.send(other);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  const userId = req.body.userId;
  console.log(`Deleting user with id: ${userId}`);
  try {
    await User.deleteOne({ _id: userId });
    res.sendStatus(204);
  } catch (err) {
    console.log('Error in deleteUser controller: ', err);
    res.sendStatus(500);
  }
};

export const toggleFollowUser = async (req: express.Request, res: express.Response) => {
  const targetUserId = req.body.userId;
  const currUserId = req.body.currUser;
  console.log(`User ${currUserId} wants to follow/unfollow ${targetUserId}`);
  try {
    const user = await User.findById(targetUserId);
    
  } catch (err) {
    console.log('Error toggling follow status: ', err);
  }
}


/*
//follow a user (with JWT) TODO: implement in frontend
export const followUser = async (req: express.Request, res: express.Response) => {
    //if it is not the same user
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.body.currUser;

        if (!user!.followers.includes(req.body.userId)) {
          await user!.updateOne({ $push: { followers: req.body.userId } });
          await currUser.updateOne({ $push: { following: req.params.id } });
          res.status(200).json("user followed");
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      //if it is the same user
      res.status(403).json("you can not follow yourself");
    }
  };

//unfollow a user (with JWT) TODO: implement in frontend
export const unfollowUser = async (req: express.Request, res: express.Response) => {
    //if it is not the same user
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.body.currUser;

        if (user!.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.auth.userId } });
          await currUser.updateOne({ $pull: { following: req.params.id } });
          res.status(200).json("user unfollowed");
        } else {
          res.status(403).json("you do not follow this user");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      //if it is the same user
      res.status(403).json("you can not unfollow yourself");
    }
  };

  */