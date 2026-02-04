import express from 'express';

import { getDashboardData } from '../controllers/dashboardData.controllers.js';
import protectRoutes from '../middleware/protectRoutes.js';
import allowedRoles from '../middleware/allowedRoles.js';

const router = express.Router();

router.get('/dashboard-data', protectRoutes, allowedRoles(['Admin', 'Store-manager']), getDashboardData);

export default router;