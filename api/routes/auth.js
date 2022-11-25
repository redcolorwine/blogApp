import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const router = express.Router();

router.get("/test", (req, res) => {
    return res.json("test auth");
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;