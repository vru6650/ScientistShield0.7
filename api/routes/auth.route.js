import express from 'express';
import { google, signin, signup, github, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/github', github);
router.post('/signout', signout);

export default router;