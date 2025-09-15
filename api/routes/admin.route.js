import express from 'express';
import {
  getAllPosts,
  getAllTutorials,
  getAllQuizzes,
  getAllComments,
  getAllUsers,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/tutorials', getAllTutorials);
router.get('/quizzes', getAllQuizzes);
router.get('/comments', getAllComments);
router.get('/users', getAllUsers);

export default router;
