import { checkToken, login, register, validated, removeToken } from './controllers/auth.controller';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	toggleLike,
  deleteAllPosts
} from './controllers/post.controller';
import {
	deleteUser,
	getAllUsers,
	getByNameOrId,
	toggleFollowUser,
} from './controllers/user.controller';
import { Router } from 'express';

const router = Router();

// TODO: there are a lot of duplicated '/api/posts' and '/api/users' paths
// that we can probably remove from the front end and back end code.

// Authentication routes
router.get('/validate', checkToken, validated);
router.get('/remove', checkToken, removeToken);
router.post('/register', register);
router.post('/login', login);

// User routes
router.post('/api/users/', getByNameOrId);
router.get('/api/users/all', getAllUsers);
router.put('/api/users/follow', toggleFollowUser);
router.delete('/api/users/delete', deleteUser);

// Post routes
router.post('/api/posts/', checkToken, createPost);
// router.get("/api/posts/:id", getPost);
router.get('/mainfeed', checkToken, getAllPosts);
router.delete('/api/posts/delete', deleteAllPosts);
// router.get("/api/posts/posts", getAllPosts);
// router.delete("/api/posts/post/delete/:id", deletePost);
// router.put("/api/posts/:id/like", toggleLike);

export default router;
