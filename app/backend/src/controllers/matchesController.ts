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

  // public async getMatchesByProgressController(req: Request, res: Response) {
  //   const { inProgress } = req.query;
  //   const allMatches = await this.matchesService.getAllMatchesService();
  //   console.log(allMatches);
  //   return res.status(201).json(inProgress);
  // }
}
