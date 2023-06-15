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

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    // console.log(dbData?.dataValues);
    return dbData ? dbData.dataValues : null;
  }
}
// const x = new TeamsModel();
// x.findById(8);
