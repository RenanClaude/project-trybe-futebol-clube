import { Router } from 'express';
import LeaderboardHomeController from '../controllers/leaderboardHomeController';
import LeaderboardAwayController from '../controllers/leaderboardAwayController';

const leaderboardHomeController = new LeaderboardHomeController();
const leaderboardAwayController = new LeaderboardAwayController();

const router = Router();

// Endpoint - Requisitos 23 e 24
router.get(
  '/home',
  (req, res) => leaderboardHomeController.getHomeTeamsStats(req, res),
);

// Endpoint - Requisito 26 e 27
router.get(
  '/away',
  (req, res) => leaderboardAwayController.getAwayTeamsStats(req, res),
);

export default router;
