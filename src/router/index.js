import express from 'express';
import { forgotPassword, login, registerUser, resetPassword, retrieveAllUsers } from '../controller';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware';
import validateInput from '../middleware/validation';
import { createUserSchema, forgotPasswordSchema, loginUserSchema, resetPasswordSchema } from '../validation';

const router = express.Router();

router.post('/api/v1/register', validateInput(createUserSchema, 'body'), checkIfEmailExists, registerUser);
router.post('/api/v1/login', validateInput(loginUserSchema, 'body'), login);
router.post('/api/v1/forgot-password', validateInput(forgotPasswordSchema, 'body'), forgotPassword);
router.put('/api/v1/reset-password',validateInput(resetPasswordSchema, 'body'), resetPassword);
router.get('/api/v1/users', verifyToken('admin'), checkIfUserIsAdmin, retrieveAllUsers);

export default router;
