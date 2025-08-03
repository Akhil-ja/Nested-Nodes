import express from 'express';
import nodeRoutes from './nodeRoutes.js';

const router = express.Router();

router.use('/nodes', nodeRoutes);

export default router;
