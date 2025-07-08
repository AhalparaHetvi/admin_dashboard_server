const express = require('express');
const { login, register } = require('../controllers/authController.ts');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
