import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const router = express.Router();

const JWT_SECRET = 'supersecretkey';
const users = [];

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role: role === 'admin' ? 'admin' : 'user' });
  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, role: user.role });
});

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default router;
