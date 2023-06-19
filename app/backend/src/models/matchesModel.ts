import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAll(numberInProgress: boolean | null) {
    const inProgressFilter = numberInProgress === null ? {} : { inProgress: numberInProgress };
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
}
// const x = new MatchesModel();
// x.findAll();
