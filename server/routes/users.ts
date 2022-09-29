import { Router } from "express";
import * as User from "../Models/User";
import { checkJwt, checkJwt2 } from "./middleware";
import * as Post from "../Models/Post";
import express from "express";

const router = Router();
//get the users posts with Authentication -- TODO: should probably go to posts route!
router.get(
  "/posts",
  [checkJwt, checkJwt2],
  async (req: express.Request, res: express.Response) => {
    const posts = await Post.find({ userId: req.auth.userId });
    res.status(200).json(posts);
  }
);

//TODO: GET A USER -> will be used in the search
//get a user
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         //take away what we dont want to see
//         const {password, email, isAdmin, ...other } = user._doc
//         res.status(200).json(other)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

router.get("/", async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    //take away what we dont want to see
    const { password, email, isAdmin, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user (with JWT) TODO: implement in frontend
router.put(
  "/:id/follow",
  [checkJwt, checkJwt2],
  async (req: express.Request, res: express.Response) => {
    //if it is not the same user
    if (req.auth.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.currUser;

        if (!user.followers.includes(req.auth.userId)) {
          await user.updateOne({ $push: { followers: req.auth.userId } });
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
  }
);

//unfollow a user (with JWT) TODO: implement in frontend
router.put(
  "/:id/unfollow",
  [checkJwt, checkJwt2],
  async (req: express.Request, res: express.Response) => {
    //if it is not the same user
    if (req.auth.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currUser = req.currUser;

        if (user.followers.includes(req.auth.userId)) {
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
  }
);

module.exports = router;
