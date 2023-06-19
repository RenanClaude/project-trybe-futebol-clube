import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import loginRouter from './loginRoutes';
// import matchesByRouter from './matchesByRoutes';
import matchesRouter from './matchesRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
// router.use('/matches', matchesByRouter);
router.use('/matches', matchesRouter);

export default router;
