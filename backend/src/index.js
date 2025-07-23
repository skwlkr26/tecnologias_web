import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import crudRoutes from './routes/crud.js';
import protectedCrudRoutes from './routes/protected-crud.js';


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de Angular
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/items', crudRoutes);
app.use('/api/protected-items', protectedCrudRoutes);

// Fallback para SPA (Angular)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
