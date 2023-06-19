import { Request, Router, Response, NextFunction } from 'express';
import MatchesController from '../controllers/matchesController';
import Token from '../middlewares/token';

const matchesController = new MatchesController();

const router = Router();

// Endpoint - Requisitos 15 e 16
router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatchesController(req, res),
);

// Endpoint - Requisito 17
router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => Token.tokenValidation(req, res, next),
  (req: Request, res: Response) => matchesController.finishMatchController(req, res),
);

export default router;
