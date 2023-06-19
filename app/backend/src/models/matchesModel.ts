import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel {
  private model = SequelizeMatches;

  async findAll(boolInProgress: boolean | null) {
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
}
// const x = new MatchesModel();
// x.finishMatch(45);
