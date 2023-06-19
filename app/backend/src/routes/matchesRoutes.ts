import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const router = Router();

// Endpoint - Requisito 15
router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatchesController(req, res),
);

export default router;
