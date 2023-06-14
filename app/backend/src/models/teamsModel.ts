import SequelizeTeams from '../database/models/SequelizeTeams';
// import { ITeam } from '../Interfaces/ITeam';

export default class TeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<void> {
    const dbData = await this.model.findAll();
    console.log(dbData);
    // return dbData.map(({ id,  }) => (
    //   { id, title, price, author, isbn }
    // ));
  }
  findAll();

  // async findById(id: IBook['id']): Promise<IBook | null> {
  //   const dbData = await this.model.findByPk(id);
  //   if (dbData == null) return null;

  //   const { title, price, author, isbn }: IBook = dbData;
  //   return { id, title, price, author, isbn };
  // }
}
