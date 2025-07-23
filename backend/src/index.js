import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import crudRoutes from './routes/crud.js';
import protectedCrudRoutes from './routes/protected-crud.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', crudRoutes);
app.use('/api/protected-items', protectedCrudRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
