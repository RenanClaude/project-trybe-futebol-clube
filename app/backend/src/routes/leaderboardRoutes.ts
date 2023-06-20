import { Router } from 'express';
import LeaderboardHomeController from '../controllers/leaderboardController';

const leaderboardHomeController = new LeaderboardHomeController();

const router = Router();

// Endpoint - Requisito 23
router.get(
  '/home',
  (req, res) => leaderboardHomeController.getHomeTeamsStats(req, res),
);

export default router;
