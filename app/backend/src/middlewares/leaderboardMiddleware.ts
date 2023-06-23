import { Request, Response } from 'express';
import { ITeamStats } from '../Interfaces/ITeamStats';

export default class LeaderboardMiddleware {
  public static async sortedClassification(_req: Request, res: Response, teamsStats: ITeamStats[]) {
    const sortedByGoalsFavor = teamsStats
      .sort((a: ITeamStats, b: ITeamStats) => b.goalsFavor - a.goalsFavor);

    const sortedByGoalsBalance = sortedByGoalsFavor
      .sort((a, b) => b.goalsBalance - a.goalsBalance);

    const sortedByVictories = sortedByGoalsBalance
      .sort((a, b) => b.totalVictories - a.totalVictories);

    const sortedByPoints = sortedByVictories.sort((a, b) => b.totalPoints - a.totalPoints);

    return res.status(200).json(sortedByPoints);
  }
}
