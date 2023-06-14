import { ITeamsModel } from '../Interfaces/Imodel/ITeamsModel';
import TeamsModel from '../models/teamsModel';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async getAllTeamsService(): Promise<ITeam[]> {
    const AllTeams = await this.teamsModel.findAll();
    return AllTeams;
  }
}
