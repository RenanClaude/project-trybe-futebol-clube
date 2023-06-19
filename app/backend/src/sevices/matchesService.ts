import { IMatches } from '../Interfaces/IMatches';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAllMatchesService(numberInProgress: boolean | null): Promise<IMatches[]> {
    const allMatches = await this.matchesModel.findAll(numberInProgress);
    return allMatches;
  }
}
