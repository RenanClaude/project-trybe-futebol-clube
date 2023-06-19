import { Request, Response } from 'express';
import MatchesService from '../sevices/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatchesController(_req: Request, res: Response) {
    const allMatches = await this.matchesService.getAllMatchesService();
    return res.status(200).json(allMatches);
  }
}
