import { IMatches } from '../Interfaces/IMatches';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAllMatchesService(): Promise<IMatches[]> {
    const allMatches = await this.matchesModel.findAll();
    return allMatches;
  }
}
