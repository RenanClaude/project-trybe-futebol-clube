import { Router } from 'express';
import LeaderboardHomeController from '../controllers/leaderboardHomeController';
import LeaderboardAwayController from '../controllers/leaderboardAwayController';

const leaderboardHomeController = new LeaderboardHomeController();
const leaderboardAwayController = new LeaderboardAwayController();

const router = Router();

// Endpoint - Requisito 23
router.get(
  '/home',
  (req, res) => leaderboardHomeController.getHomeTeamsStats(req, res),
);

// Endpoint - Requisito 26
router.get(
  '/away',
  (req, res) => leaderboardAwayController.getAwayTeamsStats(req, res),
);

export default router;
