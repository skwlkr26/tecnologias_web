import express from 'express';
const router = express.Router();

let items = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' }
];
let nextId = 3;

// Get all items (público)
router.get('/', (req, res) => {
  res.json(items);
});

export default router;
