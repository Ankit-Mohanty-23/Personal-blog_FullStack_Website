import express from 'express';
import * as postController from "../controllers/postController.js";
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all posts
router.get('/', postController.getAllPosts);
// GET a single post by its Slug
router.get('/:slug', postController.getPostBySlug);
// POST a new post
router.post('/', protect, postController.createPost);
//PATCH (update) a post
router.put('/:slug', protect, postController.updatePost);
//DELETE a post by its ID
router.delete('/:id', protect, postController.deletePost);

export default router;