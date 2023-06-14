import { ITeamsModel } from '../Interfaces/Imodel/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    const AllTeams = dbData.map((team) => team.dataValues);
    // console.log(AllTeams);
    return AllTeams;
  }
}
// const x = new TeamsModel();
// x.findAll();
