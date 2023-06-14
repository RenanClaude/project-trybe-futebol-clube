import SequelizeTeams from '../database/models/SequelizeTeams';
// import { ITeam } from '../Interfaces/ITeam';

export default class TeamsModel {
  private static model = SequelizeTeams;

  static async findAll(): Promise<void> {
    const dbData = await this.model.findAll();
    console.log(dbData);
  }
}
TeamsModel.findAll();
