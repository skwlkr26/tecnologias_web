import express from 'express';
import { authMiddleware } from './auth.js';
const router = express.Router();

let items = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' }
];
let nextId = 3;

router.use(authMiddleware);

// Get all items (todos pueden ver)
router.get('/', (req, res) => {
  res.json(items);
});

// Create item (solo admin)
router.post('/', (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Solo el administrador puede crear ítems' });
  const { name, description } = req.body;
  const newItem = { id: nextId++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item (solo admin)
router.put('/:id', (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Solo el administrador puede editar ítems' });
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  item.name = name;
  item.description = description;
  res.json(item);
});

// Delete item (solo admin)
router.delete('/:id', (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Solo el administrador puede eliminar ítems' });
  const id = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  items.splice(idx, 1);
  res.status(204).end();
});

export default router;
