import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IScore } from '../Interfaces/IScore';
import { IMatch, INewMatch } from '../Interfaces/IMatch';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAll(boolInProgress: boolean | null): Promise<IMatch[]> {
    const inProgressFilter = boolInProgress === null ? {} : { inProgress: boolInProgress };
    const dbData = await this.model.findAll(
      { include: [{ model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: inProgressFilter },
    );
    const allMatches = dbData.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: match.homeTeam?.dataValues.teamName },
      awayTeam: { teamName: match.awayTeam?.dataValues.teamName },
    }));
    return allMatches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateScore(id: number, score: IScore): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = score;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(newMatch: INewMatch): Promise<IMatch> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;
    const dbData = await this.model
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
    // console.log(dbData.dataValues);
    return dbData.dataValues;
  }
}
// const x = new MatchesModel();
// x.createMatch({
//   homeTeamId: 14,
//   awayTeamId: 16,
//   homeTeamGoals: 3,
//   awayTeamGoals: 3,
// });
