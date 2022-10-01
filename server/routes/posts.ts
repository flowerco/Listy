/*
import { Router } from "express";
import * as Post from "../models/Post";
import * as User from "../models/User";
import axios from "axios";
import { checkJwt, checkJwt2 } from "./middleware";

const router = Router();

//ADD A POST (with jwt, recognizes which user created the post)

router.post("/", [checkJwt, checkJwt2], async (req, res) => {
  // const userId = req.auth.payload.sub.split("|")[1]
  try {
    const post = new Post({
      name: req.body.name,
      rating: req.body.rating,
      genre: req.body.genre,
      userId: req.auth.userId,
      image: req.body.image.base64,
    });
    //TODO: add error handling
    await post.save();
    console.log(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//TODO: fix update a post

// router.put('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if(post.userId === req.body.userId){
//       await post.updateOne({$set: req.body});
//       res.status(200).json('The post has been updated')
//     } else {
//       res.status(403).json('You can only update your posts')
//     }
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

// router.put('/post/update/:id', async (req, res) =>{
//   try {
//     const result = await Post.findByIdAndUpdate(req.params.id)
//     await result.updateOne({$set: req.body});
//           res.status(200).json('The post has been updated')
//         } catch (error) {
//         res.status(500).json(error)
//       }
// })

//delete a post
router.delete("/post/delete/:id", async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//like and dislake  a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//TODO: FIX USER MAIN FEED WITH AUTH

//get main feed posts - call all foloowing  of the user and all their posts
// router.get('/mainfeed', [checkJwt, checkJwt2], async (req, res) =>{
//   try {
//     const currUser = req.currUser;
//     const userPosts = await Post.find({ userId: req.auth.userId});
//     const friendPosts = await Promise.all(
//       currUser.following.map((friendId) =>{
//         //this will return each post
//         return Post.find({ userId: friendId});
//       })
//     )
//     res.json(userPosts.concat(...friendPosts))

//   } catch (error) {
//     res.status(500).json(error)
//   }

// })

router.get("/mainfeed/:userId", async (req, res) => {
  try {
    const currUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: req.params.userId });
    const friendPosts = await Promise.all(
      currUser.following.map((friendId) => {
        //this will return each post
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get('/mainfeed', [checkJwt, checkJwt2], async (req, res) =>{
//   const userId = req.currUser;
//   try {
//     const userPosts = await Post.find({ userId: req.auth.userId});
//     const friendPosts = await User.aggregate([
//       {
//         $match: {
//           _id: userId
//         },
//         $lookup: {
//           from: 'posts',
//           localField: 'following',
//           foreignField: 'userId',
//           as: 'friendPosts'
//         },
//         $project: {
//           friendPosts: 1,
//           _id: 0
//         }
//       }
//     ])

//     res.status(200).json(userPosts.concat(...friendPosts[0].friendPosts))

//   } catch (error) {
//     res.status(500).json(error)
//   }

// })

// router.get('/posts', [checkJwt, checkJwt2], async (req, res) => {
//   const posts = await Post.find({ userId: req.auth.userId})
//   res.status(200).json(posts)
// })

//get users all post
// router.get('/profile', [checkJwt, checkJwt2], async (req, res) =>{
//   try {
//     const user = await User.findOne({ userId: req.auth.userId });
//     const posts = await Post.find({ userId: user._id });
//     res.status(200).json(posts)
//   } catch (error) {
//     res.status(500).json(error)
//   }

// })

// router.get('/profile', async (req, res) => {
//     try {
//         const posts = await Post.find();

//         res.json(posts)

//     } catch (error) {
//         console.log(error)
//         res.sendStatus(400)
//     }
// })

// router.post('/profile', (req, res) =>{
//     try {
//       const post = new Post({
//         name: req.body.name,
//         rating: req.body.rating,
//         genre: req.body.genre
//       });
//       post.save();
//       console.log(req.body)
//       res.status(201).json(post);
//     } catch (error) {
//       console.log(error)
//       res.sendStatus(400);
//     }
//   })

module.exports = router;
*/