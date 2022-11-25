import express from 'express';
import { addPost, deletePost, getAuthorPosts, getPost, getPosts, updatePost, updatePostView } from '../controllers/postsController.js';

const router = express.Router();
router.post('/uposts', getAuthorPosts);
router.post('/updateViewPost', updatePostView);
router.get("/", getPosts);
router.get("/:id", getPost); //Один пост по id
router.post("/", addPost); //Создание поста
router.delete("/:id", deletePost); //Удаление поста по id
router.put("/:id", updatePost); //Редактирование поста по id

export default router;