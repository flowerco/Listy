import { login, register } from './controllers/auth.controller';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPost,
	toggleLike,
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
router.post('/register', register);
router.post('/login', login);

// User routes
router.post('/api/users/', getByNameOrId);
router.get('/api/users/all', getAllUsers);
router.put('/api/users/follow', toggleFollowUser);
router.delete('/api/users/delete', deleteUser);

// Post routes
// NOTE: This version includes jwt checks, we should probably implement this using the code in the 'server/session' folder.
// router.post("/", [checkJwt, checkJwt2], createPost);
router.post('/api/posts/', createPost);
// router.get("/api/posts/:id", getPost);
// TOFIX: Doesn't look like the below route is used, seems like '/posts' in the user controller is the one used up to now.
router.get('/mainfeed/:userId', getAllPosts);
// router.get("/api/posts/posts", getAllPosts);
// router.delete("/api/posts/post/delete/:id", deletePost);
// router.put("/api/posts/:id/like", toggleLike);

export default router;
