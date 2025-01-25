import express from 'express';
import { createUser, getAllUsers ,getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/users', createUser);

router.get('/users', getAllUsers); 

router.get('/users/:id', getUserById);

router.put('/users/:id', authenticateToken, updateUser); 

router.delete('/users/:id', authenticateToken, deleteUser);  

export default router;
