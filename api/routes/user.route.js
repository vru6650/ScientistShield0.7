import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  checkApiHealth,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

// Endpoint for verifying the API is responsive
router.get('/health', checkApiHealth);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, verifyAdmin, getUsers);
router.get('/:userId', getUser);

export default router;