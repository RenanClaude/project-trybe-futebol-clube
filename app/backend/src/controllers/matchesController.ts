import { Request, Response } from 'express';
import MatchesService from '../sevices/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatchesController(req: Request, res: Response) {
    const { inProgress } = req.query;
    const noFilter = null;

    if (inProgress) {
      const allMatches = await this.matchesService.getAllMatchesService(inProgress === 'true');
      return res.status(200).json(allMatches);
    }
    const allMatches = await this.matchesService.getAllMatchesService(noFilter);
    return res.status(200).json(allMatches);
  }

  public async finishMatchController(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.finishMatchService(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateScoreController(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.updateScoreService(Number(Number(id)), req.body);
    return res.status(200).json({ message: 'Score updated successfully!' });
  }
}
