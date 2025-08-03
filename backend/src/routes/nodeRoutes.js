import express from 'express';
import { getAllNodes, createNode, updateNode } from '../controllers/nodeController.js';

const router = express.Router();

router.get('/', getAllNodes);
router.post('/', createNode);
router.put('/:id', updateNode);

export default router;
